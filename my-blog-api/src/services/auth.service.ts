import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Auth } from "../types/auth";
import { sendWelcomeEmail } from "./email.service";
import axios from "axios";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function registerUser(data: Auth) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
  });

  // kirim email setelah user berhasil dibuat di DB
  try {
    await sendWelcomeEmail(user.email);
  } catch (error) {
    console.error("Gagal kirim email : ", error);
  }
}

export async function loginUser(data: Auth) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error("User not registered");
  }

  const isValid = await bcrypt.compare(data.password, user.password);

  if (!isValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  const role = user.role;

  return { token, role };
}

export async function getExternalUser(id: number) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      throw new Error("User eksternal tidak ditemukan");
    }
  }
}

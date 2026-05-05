import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Auth } from "../types/auth";
import { Role } from "@prisma/client";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function registerUser(data: Auth) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
  });
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

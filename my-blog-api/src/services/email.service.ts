import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { welcomeEmailTemplate } from "../templates/welcome-email";

dotenv.config();

// SMTP -> Provider email pengirim
// Setup SMTP logic
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendWelcomeEmail(to: string) {
  await transporter.sendMail({
    from: "My Blog - JCWDJKT01",
    to,
    subject: "Welcome to My Blog - JCWDJKT01! 🚀",
    html: welcomeEmailTemplate(to),
  });
}

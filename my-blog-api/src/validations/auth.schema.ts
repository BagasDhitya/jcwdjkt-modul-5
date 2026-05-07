import { z } from "zod";
import { Role } from "@prisma/client";

export const registerSchema = z.object({
  email: z.email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: z.enum([Role.GUEST, Role.VIP]).optional(),
});

export const loginSchema = z.object({
  email: z.email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

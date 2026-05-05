import { Role } from "@prisma/client";

export type Auth = {
  email: string;
  password: string;
  role: Role;
};

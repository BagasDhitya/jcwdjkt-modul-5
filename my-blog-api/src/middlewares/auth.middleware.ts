import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({
      message: "Unauthorized",
    });
  }
}

export function authorize(roles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;

      if (!user) {
        return res.status(401).send({
          message: "Unauthorized",
        });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).send({
          message: "Forbidden",
        });
      }

      next();
    } catch (error) {
      return res.status(500).send({
        message: "Authorization error",
      });
    }
  };
}

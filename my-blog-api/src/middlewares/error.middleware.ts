import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).send({
    success: false,
    message: "Internal server error",
  });
}

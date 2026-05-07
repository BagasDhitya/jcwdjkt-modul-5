import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validate =
  (schema: ZodType, type: "body" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = schema.parse(req[type]);
      req[type] = data;
      next();
    } catch (error: any) {
      return res.status(400).send({
        message: "Validation error",
        errors: error.issues,
      });
    }
  };

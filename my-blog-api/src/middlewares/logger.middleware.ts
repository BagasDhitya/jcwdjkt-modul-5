import { Request, Response, NextFunction } from "express";

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const start = Date.now();

  const localTime = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
  });

  res.on("finish", () => {
    const latency = Date.now() - start;
    const isSuccess = res.statusCode < 400;
    const statusMessage = isSuccess ? "SUCCESS" : "FAILED";

    const log = `[${localTime}] [${statusMessage}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${latency}ms)`;
    console.log(log);
  });

  next();
}

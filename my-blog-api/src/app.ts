import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import articleRouter from "./routers/article.router";
import authRouter from "./routers/auth.router";
import testRouter from "./routers/test.router";

import { errorMiddleware } from "./middlewares/error.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { startArticleScheduler } from "./utils/scheduler/article.scheduler";

dotenv.config();

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(loggerMiddleware);
  app.use(errorMiddleware);

  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use("/api/articles", articleRouter);
  app.use("/api/experimental", testRouter);
  app.use("/api/auth", authRouter);

  return app;
}

function startServer() {
  const app = createApp();
  const PORT = process.env.PORT || 5000;

  startArticleScheduler()

  app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
  });
}

startServer();

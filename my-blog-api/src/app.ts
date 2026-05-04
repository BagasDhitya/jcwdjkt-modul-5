import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import articleRouter from "./routers/article.router";

dotenv.config();

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api/articles", articleRouter);

  return app;
}

function startServer() {
  const app = createApp();
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
  });
}

startServer();

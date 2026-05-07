import express from "express";
import { createArticleController } from "../controllers/article.controller";

const router = express.Router();

router.post("/create-without-validation", createArticleController);

export default router;

import express from "express";
import {
  createArticleController,
  getArticlesController,
  getArticleByIdController,
  updateArticleController,
  deleteArticleController,
} from "../controllers/article.controller";

const router = express.Router();

router.post("/", createArticleController);
router.get("/", getArticlesController);
router.get("/:id", getArticleByIdController);
router.put("/:id", updateArticleController);
router.delete("/:id", deleteArticleController);

export default router;

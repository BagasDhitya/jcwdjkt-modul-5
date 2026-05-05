import express from "express";
import {
  createArticleController,
  getArticlesController,
  getArticleByIdController,
  updateArticleController,
  deleteArticleController,
} from "../controllers/article.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = express.Router();

// PUBLIC
router.get("/", getArticlesController);
router.get("/:id", getArticleByIdController);

// PROTECTED
router.post("/", authenticate, authorize(["VIP"]), createArticleController);
router.put("/:id", authenticate, authorize(["VIP"]), updateArticleController);
router.delete(
  "/:id",
  authenticate,
  authorize(["VIP"]),
  deleteArticleController,
);

export default router;

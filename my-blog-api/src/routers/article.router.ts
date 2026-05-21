import express from "express";
import {
  createArticleController,
  getArticlesController,
  getArticleByIdController,
  updateArticleController,
  deleteArticleController,
} from "../controllers/article.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { upload } from "../middlewares/upload.middleware";
import {
  createArticleSchema,
  updateArticleSchema,
  articleIdParamSchema,
} from "../validations/article.schema";

const router = express.Router();

// PUBLIC
router.get("/", getArticlesController);
router.get(
  "/:id",
  validate(articleIdParamSchema, "params"),
  getArticleByIdController,
);

// PROTECTED
router.post(
  "/",
  // authenticate,
  // authorize(["VIP"]),
  upload.single("poster"),
  validate(createArticleSchema),
  createArticleController,
);
router.put(
  "/:id",
  authenticate,
  authorize(["VIP"]),
  validate(articleIdParamSchema, "params"),
  validate(updateArticleSchema),
  updateArticleController,
);
router.delete(
  "/:id",
  authenticate,
  authorize(["VIP"]),
  deleteArticleController,
);

export default router;

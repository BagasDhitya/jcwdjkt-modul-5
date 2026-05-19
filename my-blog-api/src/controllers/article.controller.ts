import { Request, Response, NextFunction } from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../services/article.service";

export async function createArticleController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await createArticle(req.body, req.file!);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getArticlesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await getArticles();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function getArticleByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await getArticleById(String(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateArticleController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await updateArticle(String(req.params.id), req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteArticleController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await deleteArticle(String(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
}

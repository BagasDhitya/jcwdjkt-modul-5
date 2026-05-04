import { Request, Response } from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../services/article.service";

export async function createArticleController(req: Request, res: Response) {
  try {
    const result = await createArticle(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error create article", error });
  }
}

export async function getArticlesController(req: Request, res: Response) {
  try {
    const result = await getArticles();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error get articles", error });
  }
}

export async function getArticleByIdController(req: Request, res: Response) {
  try {
    const result = await getArticleById(String(req.params.id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error get article", error });
  }
}

export async function updateArticleController(req: Request, res: Response) {
  try {
    const result = await updateArticle(String(req.params.id), req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error update article", error });
  }
}

export async function deleteArticleController(req: Request, res: Response) {
  try {
    const result = await deleteArticle(String(req.params.id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error delete article", error });
  }
}

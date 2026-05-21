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
    // 1. Ambil data mentah dari body
    const { title, description, publishedAt } = req.body;

    // 2. Bersihkan nilai publishedAt dari form-data Postman
    // Jika tidak diisi, berupa string kosong "", atau string "undefined"/"null", kita set jadi undefined
    const cleanPublishedAt = 
      publishedAt && 
      publishedAt.trim() !== "" && 
      publishedAt !== "undefined" && 
      publishedAt !== "null" 
        ? publishedAt 
        : undefined;

        console.log(title, description, publishedAt)

    // 3. Lempar data yang sudah bersih ke fungsi createArticle
    const result = await createArticle(
      {
        title,
        description,
        publishedAt: cleanPublishedAt,
      },
      req.file!
    );

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

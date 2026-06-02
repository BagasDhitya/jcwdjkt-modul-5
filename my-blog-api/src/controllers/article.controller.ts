import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../services/article.service";
import { sanitizeString, sanitizeId } from "../helpers/sanitize";

export async function articlePublishWebhook(req: Request, res: Response, next: NextFunction) {
  try {
    const articleId = sanitizeId(req.body.articleId)

    if (!articleId) {
      return res.status(400).json({ error: "Missing articleId" });
    }

    // Update status artikel di database menjadi TRUE
    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: { isPublished: true },
    });

    console.log(`[Webhook] Artikel "${updatedArticle.title}" Berhasil Dipublish otomatis oleh QStash!`);

    // Beri respon sukses 200 ke QStash agar QStash tahu tugasnya selesai
    return res.status(200).json({ success: true, message: "Article published successfully" });
  } catch (error) {
    console.error("[Webhook Error]:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function createArticleController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // 1. Ambil data mentah dari body
    const { title, description, publishedAt } = req.body;

    // Sanitize : pastikan title dan description sudah bersih
    const cleanTitle = sanitizeString(title)
    const cleanDescription = sanitizeString(description)
    let cleanPublishedAt = sanitizeString(publishedAt)

    // 2. Bersihkan nilai publishedAt dari form-data Postman
    // Jika tidak diisi, berupa string kosong "", atau string "undefined"/"null", kita set jadi undefined
     cleanPublishedAt = 
      publishedAt && 
      publishedAt.trim() !== "" && 
      publishedAt !== "undefined" && 
      publishedAt !== "null" 
        ? publishedAt 
        : undefined;

        console.log(cleanTitle, cleanDescription, cleanPublishedAt)

    // 3. Lempar data yang sudah bersih ke fungsi createArticle
    const result = await createArticle(
      {
        title: cleanTitle,
        description: cleanDescription,
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

    // sanitize id
    const articleId = sanitizeId(String(req.params.id))
    const result = await getArticleById(articleId);
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
    const {title, description} = req.body
    // sanitize id
    const articleId = sanitizeId(String(req.params.id))
    const cleanTitle = sanitizeString(title)
    const cleanDescription = sanitizeString(description)

    const result = await updateArticle(articleId, {title: cleanTitle, description: cleanDescription});
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

        // sanitize id
    const articleId = sanitizeId(String(req.params.id))

    const result = await deleteArticle(articleId);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

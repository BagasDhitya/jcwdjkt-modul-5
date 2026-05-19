import prisma from "../lib/prisma";
import { uploadToCloudinary } from "./upload.service";
import redis from "../lib/redis";

import { AppError } from "../utils/error";
import { handlePrismaError } from "../utils/handlePrisma";

export async function createArticle(
  data: {
    title: string;
    description: string;
  },
  file: Express.Multer.File,
) {
  try {
    let posterUrl: any;

    if (file) {
      posterUrl = await uploadToCloudinary(file);
    }

    return prisma.article.create({
      data: {
        ...data,
        poster: posterUrl,
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

export async function getArticles() {
  try {
    const cachedArticles = await redis.get("articles");

    if (cachedArticles) {
      return cachedArticles;
    }

    const articles = await prisma.article.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await redis.set("articles", JSON.stringify(articles), {
      ex: 60,
    });

    return articles;
  } catch (error) {
    handlePrismaError(error);
  }
}

export async function getArticleById(id: string) {
  try {
    const cacheKey = `article:${id}`;
    const cachedArticles = await redis.get(cacheKey);

    if (cachedArticles) {
      return cachedArticles;
    }

    const article = await prisma.article.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!article) {
      throw new AppError("Article not found", 404);
    }

    await redis.set(cacheKey, JSON.stringify(article), {
      ex: 60,
    });

    return article;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    handlePrismaError(error);
  }
}

export async function updateArticle(
  id: string,
  data: { title?: string; description?: string },
) {
  try {
    return prisma.article.update({
      where: { id: id },
      data: data,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    handlePrismaError(error);
  }
}

export async function deleteArticle(id: string) {
  try {
    return prisma.article.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    handlePrismaError(error);
  }
}

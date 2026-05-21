import prisma from "../lib/prisma";
import { uploadToCloudinary } from "./upload.service";
import redis from "../lib/redis";
import dotenv from "dotenv"
import { qstash } from "../lib/queue";

import { AppError } from "../utils/error";
import { handlePrismaError } from "../utils/handlePrisma";

dotenv.config()

export async function createArticle(
  data: {
    title: string;
    description: string;
    publishedAt?: string | Date;
  },
  file: Express.Multer.File,
) {
  try {
    let posterUrl: any;
    if (file) {
      posterUrl = await uploadToCloudinary(file);
    }

    let publishDate: Date | null = null;

    if (data.publishedAt) {
      const dateStr = data.publishedAt.toString();
      
      // Jika frontend mengirim tanpa info timezone (misal: "2026-05-21 19:46:00")
      // Kita paksa tempelkan '+07:00' agar JavaScript tahu ini adalah Waktu Indonesia Barat
      if (!dateStr.includes('+') && !dateStr.endsWith('Z')) {
        publishDate = new Date(`${dateStr.replace('T', ' ')} +07:00`);
      } else {
        publishDate = new Date(dateStr);
      }
    }

    // Bandingkan waktu rilis dengan waktu lokal sekarang
    const isPublished = !publishDate || publishDate <= new Date();

    const newArticle =  await prisma.article.create({
      data: {
        title: data.title,
        description: data.description,
        poster: posterUrl,
        publishedAt: publishDate,
        isPublished: isPublished
      },
    });

    if(!isPublished && publishDate ){
      const now = Date.now()
      const targetDate =  publishDate.getTime()

      const delayInSeconds = Math.max(0, Math.floor((targetDate - now) / 1000))

      await qstash.publishJSON({
        url: `${process.env.BACKEND_URL}/api/articles/webhook-publish`, // URL backend kamu yang akan ditembak QStash
        body: { articleId: newArticle.id }, // Kirim ID artikel saja sebagai payload
        delay: delayInSeconds, // QStash akan menahan pesan ini selama sekian detik
      });
      
      console.log(`[QStash] Artikel dijadwalkan sukses. Delay: ${delayInSeconds} detik.`);
    }
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

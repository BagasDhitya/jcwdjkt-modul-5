import prisma from "../lib/prisma";
import { uploadToCloudinary } from "./upload.service";

export async function createArticle(
  data: {
    title: string;
    description: string;
  },
  file: Express.Multer.File,
) {
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
}

export async function getArticles() {
  return prisma.article.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getArticleById(id: string) {
  return prisma.article.findFirst({
    where: {
      id: id,
      deletedAt: null,
    },
  });
}

export async function updateArticle(
  id: string,
  data: { title?: string; description?: string },
) {
  return prisma.article.update({
    where: { id: id },
    data: data,
  });
}

export async function deleteArticle(id: string) {
  return prisma.article.update({
    where: { id: id },
    data: {
      deletedAt: new Date(),
    },
  });
}

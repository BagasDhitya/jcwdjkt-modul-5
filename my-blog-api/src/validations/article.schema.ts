import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(3, "Title minimal 3 karakter").max(200),
  description: z.string().min(10, "Description minimal 10 karakter"),
});

export const updateArticleSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  description: z.string().min(10).optional(),
});

export const articleIdParamSchema = z.object({
  id: z.string().uuid("ID harus UUID"),
});

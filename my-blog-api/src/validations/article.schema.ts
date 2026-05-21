import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(3, "Title minimal 3 karakter").max(200),
  description: z.string().min(10, "Description minimal 10 karakter"),
  
  // Tambahkan ini agar Zod mengizinkan publishedAt lolos sebagai string ke controller
  publishedAt: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      // Memastikan string format tanggalnya valid jika diisi
      return !isNaN(Date.parse(val));
    }, "Format tanggal publishedAt tidak valid"),
});

export const updateArticleSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  description: z.string().min(10).optional(),
  // Tambahkan juga di update schema jika nanti ada fitur edit jadwal
  publishedAt: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      return !isNaN(Date.parse(val));
    }, "Format tanggal publishedAt tidak valid"),
});

export const articleIdParamSchema = z.object({
  id: z.string().uuid("ID harus UUID"),
});
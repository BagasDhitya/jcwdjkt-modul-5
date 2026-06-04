import { getArticles, createArticle } from "./article.service";
import prisma from "../lib/prisma";
import redis from "../lib/redis";
import { uploadToCloudinary } from "./upload.service";
import { qstash } from "../lib/queue";

// mocking dependency prisma
jest.mock("../lib/prisma", () => ({
  __esModule: true,
  default: {
    article: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

jest.mock("../lib/redis", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    set: jest.fn(),
  },
}));

jest.mock("./upload.service", () => ({
  uploadToCloudinary: jest.fn(),
}));

jest.mock("../lib/queue", () => ({
  qstash: {
    publishJSON: jest.fn(),
  },
}));

describe("Article Service Unit", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createArticles", () => {
    const mockFile = { filename: "poster.png" } as Express.Multer.File;
    const mockData = {
      title: "Belajar TDD",
      description: "Guideline lengkap TDD",
    };

    test("harus sukses membuat artikel yang langsung rilis (tanpa qstash)", async () => {
      (uploadToCloudinary as jest.Mock).mockResolvedValue(
        "https://cloudinary.com/poster.png",
      );
      (prisma.article.create as jest.Mock).mockResolvedValue({
        id: "article-123",
        ...mockData,
        poster: "https://cloudinary.com/poster.png",
        isPublished: true,
      });

      await createArticle(mockData, mockFile);

      expect(uploadToCloudinary).toHaveBeenCalledWith(mockFile);
      expect(prisma.article.create).toHaveBeenCalledWith({
        data: {
          title: mockData.title,
          description: mockData.description,
          poster: "https://cloudinary.com/poster.png",
          publishedAt: null,
          isPublished: true,
        },
      });

      // pastikan qstash tidak dipanggil
      expect(qstash.publishJSON).not.toHaveBeenCalled();
    });

    test("harus menjadwalkan artikel lewat Qstash jika waktu rilis di masa depan", async () => {
      // set tanggal rilis besok
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const inputData = { ...mockData, publishedAt: tomorrow.toISOString() };

      (uploadToCloudinary as jest.Mock).mockResolvedValue(
        "https://cloudinary.com/poster.png",
      );
      (prisma.article.create as jest.Mock).mockResolvedValue({
        id: "article-scheduled",
        ...mockData,
        isPublished: false,
        publishedAt: tomorrow,
      });

      await createArticle(inputData, mockFile);

      // pastikan data yang disimpan di DB status isPublished = false
      expect(prisma.article.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ isPublished: false }),
        }),
      );

      // pastikan QStash dipanggil
      expect(qstash.publishJSON).toHaveBeenCalled;
    });
  });

  describe("getArticles", () => {
    test("harus mengambil data dari redis cache jika datanya ada", async () => {
      const mockCachedData = [
        { id: "1", title: "Artikel cache", description: "Description cache" },
      ]; // bisa ditambahkan sesuai yang ada di tabel Article

      // set agar redis langsung membaca data
      (redis.get as jest.Mock).mockResolvedValue(mockCachedData);

      const result = await getArticles();
      expect(redis.get).toHaveBeenCalledWith("articles");

      // pastikan prisma tidak nembak ke database
      expect(prisma.article.findMany).not.toHaveBeenCalled();
      expect(result).toEqual(mockCachedData);
    });

    test("harus ambil dari db dan set ke redis jika cache masih kosong", async () => {
      const mockDbData = [
        { id: "1", title: "Artikel cache", description: "Description cache" },
      ];

      // set redis kosong, tapi DB ada isinya
      (redis.get as jest.Mock).mockResolvedValue(null);
      (prisma.article.findMany as jest.Mock).mockResolvedValue(mockDbData);

      const result = await getArticles();
      expect(prisma.article.findMany).toHaveBeenCalled();

      // pastikan hasil dari DB disimpan kembali ke cache Redis untuk 60 detik ke depan
      expect(redis.set).toHaveBeenCalledWith(
        "articles",
        JSON.stringify(mockDbData),
        { ex: 60 },
      );
      expect(result).toEqual(mockDbData);
    });
  });
});

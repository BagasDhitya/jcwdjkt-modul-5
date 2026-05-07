import { Readable } from "stream";
import cloudinary from "../lib/cloudinary";

export function uploadToCloudinary(file: Express.Multer.File) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "articles",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || "");
      },
    );

    Readable.from(file.buffer).pipe(stream);
  });
}

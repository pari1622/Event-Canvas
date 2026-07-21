import { Request, Response } from "express";
import { Readable } from "stream";
import { cloudinary } from "../config/cloudinary.js";
import type { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    console.log("========== UPLOAD ==========");

    console.log("File:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "eventcanvas/products",
      },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined,
      ) => {
        console.log("Cloudinary Error:", error);
        console.log("Cloudinary Result:", result);

        if (error) {
          return res.status(500).json({
            success: false,
            message: error.message,
          });
        }

        if (!result) {
          return res.status(500).json({
            success: false,
            message: "No upload result",
          });
        }

        return res.json({
          success: true,
          image: result.secure_url,
        });
      },
    );

    Readable.from(req.file.buffer).pipe(stream);
  } catch (err) {
    console.error("UPLOAD CONTROLLER ERROR:");
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

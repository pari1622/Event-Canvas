import { Request, Response } from "express";
import { generateQuotePDF } from "../services/pdfService.js";

export const downloadQuotePDF = async (req: Request, res: Response) => {
  try {
    const filePath = await generateQuotePDF(String(req.params.id));

    res.download(filePath);
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

import { Request, Response } from "express";
import fs from "fs";

import {
  createQuote,
  getQuotes,
  getQuoteById,
  approveQuote,
  rejectQuote,
  convertQuoteToOrder,
} from "../services/quoteService.js";

import { generateQuotePDF } from "../services/pdfService.js";

export const generateQuote = async (req: Request, res: Response) => {
  try {
    const {
      orderId,
      items,
      discount = 0,
      gst = 18,
      validity,
      terms,
    } = req.body;

    const quote = await createQuote(
      orderId,
      items,
      discount,
      gst,
      new Date(validity),
      terms,
    );

    const pdfPath = await generateQuotePDF(String(quote._id));

    res.status(201).json({
      success: true,
      quote,
      pdf: pdfPath,
    });
  } catch (error: any) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const downloadQuotePDF = async (req: Request, res: Response) => {
  try {
    const pdfPath = await generateQuotePDF(String(req.params.id));

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    return res.download(pdfPath);
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchQuotes = async (req: Request, res: Response) => {
  try {
    const user: any = (req as any).user;

    const quotes = await getQuotes(user.id, user.role);

    res.json({
      success: true,
      quotes,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const fetchQuote = async (req: Request, res: Response) => {
  try {
    const quote = await getQuoteById(String(req.params.id));

    res.json({
      success: true,
      quote,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const approveQuoteController = async (req: Request, res: Response) => {
  try {
    const quote = await approveQuote(String(req.params.id));

    res.json({
      success: true,
      quote,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const rejectQuoteController = async (req: Request, res: Response) => {
  try {
    const quote = await rejectQuote(String(req.params.id), req.body.reason);

    res.json({
      success: true,
      quote,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const convertQuoteController = async (req: Request, res: Response) => {
  try {
    const order = await convertQuoteToOrder(String(req.params.id));

    res.json({
      success: true,
      order,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

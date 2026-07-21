import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware.js";
import {
  getQuoteBag,
  addToQuoteBag,
  removeFromQuoteBag,
} from "../services/quoteBagService.js";

export const getBag = async (req: AuthRequest, res: Response) => {
  try {
    const bag = await getQuoteBag(req.user.id);

    res.json({
      success: true,
      bag,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const addItem = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity = 1, notes = "" } = req.body;

    const item = await addToQuoteBag(req.user.id, productId, quantity, notes);

    res.status(201).json({
      success: true,
      message: "Added to Quote Bag",
      item,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const removeItem = async (req: AuthRequest, res: Response) => {
  try {
    await removeFromQuoteBag(String(req.params.id));

    res.json({
      success: true,
      message: "Removed from Quote Bag",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getOrders,
  getSingleOrder,
  cancelOrder,
} from "../services/orderService.js";

export const placeOrder = async (req: AuthRequest, res: Response) => {
  try {
    console.log("========== PLACE ORDER ==========");
    console.log("USER:", req.user.id);

    const order = await createOrder(req.user.id);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error: any) {
    console.error("========== ORDER ERROR ==========");
    console.error(error);
    console.error(error.stack);

    res.status(400).json({
      success: false,
      message: error?.message || "Unknown Error",
      error: error?.stack,
    });
  }
};

export const fetchOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await getOrders(req.user.id);

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const fetchSingleOrder = async (req: Request, res: Response) => {
  try {
    const order = await getSingleOrder(String(req.params.id));

    res.json({
      success: true,
      order,
    });
  } catch (error: any) {
    console.error(error);

    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const userCancelOrder = async (req: Request, res: Response) => {
  try {
    const order = await cancelOrder(String(req.params.id));

    res.json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error: any) {
    console.error(error);

    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

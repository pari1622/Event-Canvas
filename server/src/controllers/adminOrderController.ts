import { Request, Response } from "express";
import {
  getOrdersForAdmin,
  getOrderById,
  changeOrderStatus,
  deleteOrder,
  getOrderStats,
} from "../services/adminOrderService.js";

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await getOrdersForAdmin();

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

export const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const order = await getOrderById(String(req.params.id));

    res.json({
      success: true,
      order,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const order = await changeOrderStatus(
      String(req.params.id),
      req.body.status,
    );

    res.json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeOrder = async (req: Request, res: Response) => {
  try {
    await deleteOrder(String(req.params.id));

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const orderStats = async (_req: Request, res: Response) => {
  try {
    const stats = await getOrderStats();

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

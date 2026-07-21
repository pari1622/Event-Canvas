import { Request, Response } from "express";
import { getDashboardStats } from "../services/adminService.js";

export const getDashboard = async (_req: Request, res: Response) => {
  try {
    const stats = await getDashboardStats();

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

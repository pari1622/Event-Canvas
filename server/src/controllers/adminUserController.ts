import { Request, Response } from "express";
import {
  getUsersForAdmin,
  getUserById,
  deleteUser,
  toggleUserStatus,
  getUserStats,
} from "../services/adminUserService.js";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getUsersForAdmin();

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(String(req.params.id));

    res.json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    await deleteUser(String(req.params.id));

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const suspendUser = async (req: Request, res: Response) => {
  try {
    const user = await toggleUserStatus(String(req.params.id));

    res.json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const userStats = async (_req: Request, res: Response) => {
  try {
    const stats = await getUserStats();

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

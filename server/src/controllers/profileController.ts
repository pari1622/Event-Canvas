import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware.js";
import {
  getUserProfile,
  updateUserProfile,
} from "../services/profileService.js";

export const getProfile = async (req: AuthRequest, res: Response) => {
  const user = await getUserProfile(req.user.id);

  res.json({
    success: true,
    user,
  });
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  const { name, phone, profileImage = "" } = req.body;

  const user = await updateUserProfile(req.user.id, name, phone, profileImage);

  res.json({
    success: true,
    message: "Profile Updated",
    user,
  });
};

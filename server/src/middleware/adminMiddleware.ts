import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware.js";

export const adminOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin Access Only",
    });
  }

  next();
};

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  console.log("========== REQUEST ==========");
  console.log("Headers:", req.headers);

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log("NO AUTH HEADER");
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.log("TOKEN:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    console.log("DECODED:", decoded);

    req.user = decoded;

    next();
  } catch (err) {
    console.error("VERIFY ERROR:", err);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

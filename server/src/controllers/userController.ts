import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

import User from "../models/User.js";
import { sendAdminNewUserEmail } from "../services/emailService.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone: phone || "",
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );

    const { password: _, ...userData } = user.toObject();

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: userData,
    });
  } catch (error: any) {
    console.error("REGISTER ERROR");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );

    const { password: _, ...userData } = user.toObject();

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  try {
    console.log("========== GOOGLE LOGIN ==========");
    console.log("GOOGLE_CLIENT_ID =", process.env.GOOGLE_CLIENT_ID);

    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Google token is required",
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    console.log("Google Payload =", payload);

    if (!payload || !payload.email) {
      return res.status(401).json({
        success: false,
        message: "Invalid Google token",
      });
    }

    const email = payload.email;
    const name = payload.name || "Google User";
    const picture = payload.picture || "";
    const googleId = payload.sub;

    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      const randomPassword = await bcrypt.hash(Math.random().toString(36), 10);

      user = await User.create({
        name,
        email,
        password: randomPassword,
        phone: "",
        googleId,
        profileImage: picture,
      });

      //await sendAdminNewUserEmail(user.name, user.email);
    } else {
      let updated = false;

      if (!user.googleId) {
        user.googleId = googleId;
        updated = true;
      }

      if (!user.profileImage && picture) {
        user.profileImage = picture;
        updated = true;
      }

      if (updated) {
        await user.save();
      }
    }

    const jwtToken = jwt.sign(
      {
        id: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );

    const { password: _, ...userData } = user.toObject();

    res.status(200).json({
      success: true,
      message: "Google login successful",
      token: jwtToken,
      user: userData,
    });
  } catch (error: any) {
    console.error("========== GOOGLE LOGIN ERROR ==========");
    console.error(error);

    if (error.stack) {
      console.error(error.stack);
    }

    res.status(500).json({
      success: false,
      message: "Google authentication failed",
      error: error.message,
    });
  }
};

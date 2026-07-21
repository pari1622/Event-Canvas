import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
import User from "../models/User.js";
import { sendOTPEmail } from "../services/emailService.js";

export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user: any = await User.findOne({ email }).select(
      "+otp +otpExpiry +password",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email.",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    user.otp = await bcrypt.hash(otp, 10);
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();
    await sendOTPEmail(email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const user: any = await User.findOne({ email }).select("+otp +otpExpiry");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "Please request a new OTP.",
      });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    const matched = await bcrypt.compare(otp, user.otp);

    if (!matched) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP Verified.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, password } = req.body;

    const user: any = await User.findOne({ email }).select(
      "+password +otp +otpExpiry",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "Please request a new OTP.",
      });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    const matched = await bcrypt.compare(otp, user.otp);

    if (!matched) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

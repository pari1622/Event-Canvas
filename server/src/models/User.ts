import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    googleId: {
      type: String,
      default: "",
    },

    otp: {
      type: String,
      default: "",
      select: false,
    },

    otpExpiry: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);

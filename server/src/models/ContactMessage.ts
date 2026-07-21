import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
    },

    subject: {
      type: String,
      default: "",
    },

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Unread", "Read", "Replied"],
      default: "Unread",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("ContactMessage", contactMessageSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          default: 1,
        },

        notes: {
          type: String,
          default: "",
        },
      },
    ],

    status: {
      type: String,
      enum: [
        "Pending",
        "Quoted",
        "Approved",
        "Payment Received",
        "In Production",
        "Ready for Dispatch",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Partial", "Paid", "Refunded"],
      default: "Pending",
    },

    totalAmount: {
      type: Number,
      default: 0,
    },

    advanceAmount: {
      type: Number,
      default: 0,
    },

    balanceAmount: {
      type: Number,
      default: 0,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },

    estimatedDelivery: {
      type: Date,
    },

    trackingNumber: {
      type: String,
      default: "",
    },

    invoiceNumber: {
      type: String,
      default: "",
    },

    adminNotes: {
      type: String,
      default: "",
    },

    timeline: [
      {
        status: String,
        date: {
          type: Date,
          default: Date.now,
        },
        note: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Order", orderSchema);

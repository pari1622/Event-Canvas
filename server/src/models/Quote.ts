import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    quoteNumber: {
      type: String,
      unique: true,
      required: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        description: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        unitPrice: {
          type: Number,
          required: true,
        },

        total: {
          type: Number,
          required: true,
        },
      },
    ],

    subtotal: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    gst: {
      type: Number,
      default: 18,
    },

    gstAmount: {
      type: Number,
      default: 0,
    },

    grandTotal: {
      type: Number,
      default: 0,
    },

    advancePercentage: {
      type: Number,
      default: 50,
    },

    advanceAmount: {
      type: Number,
      default: 0,
    },

    balanceAmount: {
      type: Number,
      default: 0,
    },

    validity: Date,

    terms: {
      type: String,
      default: "50% advance payment. Delivery begins after quote approval.",
    },

    pdfPath: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Draft", "Sent", "Approved", "Rejected", "Expired"],
      default: "Sent",
    },

    approvedAt: Date,

    rejectedAt: Date,

    rejectionReason: {
      type: String,
      default: "",
    },

    history: [
      {
        status: String,

        note: String,

        changedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Quote", quoteSchema);

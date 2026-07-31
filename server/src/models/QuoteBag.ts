import mongoose from "mongoose";

const quoteBagSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

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

    referenceImage: {
      type: String,
      default: "",
    },

    needDesign: {
      type: Boolean,
      default: false,
    },

    deliveryDate: {
      type: Date,
      default: null,
    },

    customization: {
      width: {
        type: String,
        default: "",
      },

      height: {
        type: String,
        default: "",
      },

      material: {
        type: String,
        default: "",
      },

      finish: {
        type: String,
        default: "",
      },

      color: {
        type: String,
        default: "",
      },

      gsm: {
        type: String,
        default: "",
      },

      printing: {
        type: String,
        default: "",
      },

      lamination: {
        type: String,
        default: "",
      },

      eyelets: {
        type: String,
        default: "",
      },

      remarks: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("QuoteBag", quoteBagSchema);

import { Request, Response } from "express";
import Product from "../models/Product.js";

export const bulkDeleteProducts = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;

    await Product.deleteMany({
      _id: {
        $in: ids,
      },
    });

    res.json({
      success: true,
      message: "Products deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const bulkArchiveProducts = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;

    await Product.updateMany(
      {
        _id: {
          $in: ids,
        },
      },
      {
        isActive: false,
      },
    );

    res.json({
      success: true,
      message: "Products archived successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

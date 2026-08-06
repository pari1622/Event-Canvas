import Order from "../models/Order.js";
import QuoteBag from "../models/QuoteBag.js";
import User from "../models/User.js";
import {
  sendOrderPlacedEmail,
  sendAdminNewOrderEmail,
} from "./emailService.js";

export const createOrder = async (userId: string) => {
  console.log("🚀 NEW ORDER SERVICE BUILD");
  console.log("1️⃣ Fetching Quote Bag...");

  const bag = await QuoteBag.find({
    user: userId,
  }).populate("product");

  console.log("Quote Bag Items:", bag.length);

  if (!bag.length) {
    throw new Error("Quote Bag is empty");
  }

  console.log("2️⃣ Fetching User...");

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  console.log("3️⃣ Creating Order...");

  const order = await Order.create({
    user: userId,

    items: bag.map((item: any) => ({
      product: item.product._id,
      quantity: item.quantity,
      notes: item.notes,
    })),

    timeline: [
      {
        status: "Pending",
        note: "Quote Request Submitted",
        date: new Date(),
      },
    ],
  });

  console.log("✅ Order Created");

  await order.populate("items.product");

  console.log("4️⃣ Clearing Quote Bag...");

  await QuoteBag.deleteMany({
    user: userId,
  });

  console.log("✅ Quote Bag Cleared");

  console.log("5️⃣ Sending Emails...");

  try {
    //await sendOrderPlacedEmail({
    // to: user.email,
    //customerName: user.name,
    //orderId: String(order._id),
    //items: order.items as any,
    //});

    //await sendAdminNewOrderEmail(user.name, user.email, String(order._id));

    console.log("✅ Emails Sent");
  } catch (error) {
    console.error("EMAIL ERROR");
    console.error(error);
  }

  console.log("6️⃣ Returning Order");

  return order;
};

export const getOrders = async (userId: string) => {
  return await Order.find({
    user: userId,
  })
    .populate("items.product")
    .sort({
      createdAt: -1,
    });
};

export const getSingleOrder = async (id: string) => {
  const order = await Order.findById(id).populate("items.product");

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};

export const cancelOrder = async (id: string) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new Error("Order not found");
  }

  order.status = "Cancelled";

  order.timeline.push({
    status: "Cancelled",
    note: "Cancelled by customer",
    date: new Date(),
  });

  await order.save();

  return order;
};

import Order from "../models/Order.js";
import QuoteBag from "../models/QuoteBag.js";
import User from "../models/User.js";
import {
  sendOrderPlacedEmail,
  sendAdminNewOrderEmail,
} from "./emailService.js";

export const createOrder = async (userId: string) => {
  const bag = await QuoteBag.find({
    user: userId,
  }).populate("product");

  if (!bag.length) {
    throw new Error("Quote Bag is empty");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const order = await Order.create({
    user: userId,

    items: bag.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      notes: item.notes,
    })),

    timeline: [
      {
        status: "Pending",
        note: "Order Placed",
      },
    ],
  });

  await order.populate("items.product");

  await sendOrderPlacedEmail({
    to: user.email,
    customerName: user.name,
    orderId: String(order._id),
    items: order.items as any,
  });
  await sendAdminNewOrderEmail(user.name, user.email, String(order._id));

  await QuoteBag.deleteMany({
    user: userId,
  });

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

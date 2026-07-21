import Order from "../models/Order.js";
import {
  sendQuoteReadyEmail,
  sendApprovedEmail,
  sendPaymentReceivedEmail,
  sendProductionEmail,
  sendDispatchEmail,
  sendCompletedEmail,
  sendCancelledEmail,
} from "./emailService.js";

export const getOrdersForAdmin = async () => {
  return await Order.find()
    .populate("user")
    .populate("items.product")
    .sort({ createdAt: -1 });
};

export const getOrderById = async (id: string) => {
  const order = await Order.findById(id)
    .populate("user")
    .populate("items.product");

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};

export const changeOrderStatus = async (id: string, status: string) => {
  const order = await Order.findById(id)
    .populate("user")
    .populate("items.product");

  if (!order) {
    throw new Error("Order not found");
  }

  order.status = status as any;

  await order.save();

  const emailData = {
    to: (order.user as any).email,
    customerName: (order.user as any).name,
    orderId: String(order._id),
    items: order.items as any,
  };

  try {
    switch (status) {
      case "Quoted":
        await sendQuoteReadyEmail(emailData);
        break;

      case "Approved":
        await sendApprovedEmail(emailData);
        break;

      case "Payment Received":
        await sendPaymentReceivedEmail(emailData);
        break;

      case "In Production":
        await sendProductionEmail(emailData);
        break;

      case "Ready for Dispatch":
        await sendDispatchEmail(emailData);
        break;

      case "Completed":
        await sendCompletedEmail(emailData);
        break;

      case "Cancelled":
        await sendCancelledEmail(emailData);
        break;
    }
  } catch (error) {
    console.error("EMAIL ERROR:", error);
  }

  return order;
};

export const deleteOrder = async (id: string) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new Error("Order not found");
  }

  await order.deleteOne();

  return true;
};

export const getOrderStats = async () => {
  const total = await Order.countDocuments();

  const pending = await Order.countDocuments({
    status: "Pending",
  });

  const completed = await Order.countDocuments({
    status: "Completed",
  });

  const cancelled = await Order.countDocuments({
    status: "Cancelled",
  });

  return {
    total,
    pending,
    completed,
    cancelled,
  };
};

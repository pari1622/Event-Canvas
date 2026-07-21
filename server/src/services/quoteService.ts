import Quote from "../models/Quote.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

import { sendQuoteEmail } from "./emailService.js";
import { generateQuotePDF } from "./pdfService.js";

type QuoteItem = {
  description: string;
  quantity: number;
  unitPrice: number;
};

export const createQuote = async (
  orderId: string,
  items: QuoteItem[],
  discount: number,
  gst: number,
  validity: Date,
  terms: string,
) => {
  console.log("========== CREATE QUOTE ==========");

  console.log("STEP 1 - Finding Order");

  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  console.log("STEP 2 - Order Found");

  let subtotal = 0;

  const quoteItems = items.map((item) => {
    const total = item.quantity * item.unitPrice;

    subtotal += total;

    return {
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total,
    };
  });

  const discountedSubtotal = subtotal - discount;

  const gstAmount = (discountedSubtotal * gst) / 100;

  const grandTotal = discountedSubtotal + gstAmount;

  const advancePercentage = 50;

  const advanceAmount = (grandTotal * advancePercentage) / 100;

  const balanceAmount = grandTotal - advanceAmount;

  const quoteNumber = "QT-" + new Date().getFullYear() + "-" + Date.now();

  console.log("STEP 3 - Creating Quote");

  const quote: any = await Quote.create({
    quoteNumber,

    order: order._id,

    customer: order.user,

    items: quoteItems,

    subtotal,

    discount,

    gst,

    gstAmount,

    grandTotal,

    advancePercentage,

    advanceAmount,

    balanceAmount,

    validity,

    terms,

    pdfPath: "",

    status: "Sent",

    history: [
      {
        status: "Draft",
        note: "Quote Generated",
        changedAt: new Date(),
      },
    ],
  });

  console.log("STEP 4 - Quote Created");
  console.log(quote._id);

  console.log("STEP 5 - Generating PDF");

  const pdfPath = await generateQuotePDF(String(quote._id));

  console.log("STEP 6 - PDF Generated");
  console.log(pdfPath);

  quote.pdfPath = pdfPath;

  await quote.save();

  console.log("STEP 7 - Finding Customer");

  const customer: any = await User.findById(order.user);

  console.log("STEP 8 - Customer");
  console.log(customer);

  if (!customer) {
    console.log("Customer Not Found");

    return quote;
  }

  console.log("STEP 9 - Sending Email");

  try {
    const info = await sendQuoteEmail({
      to: customer.email,

      customerName: customer.name,

      quoteNumber: quote.quoteNumber,

      grandTotal: quote.grandTotal,

      pdfPath,
    });

    console.log("STEP 10 - Email Sent");

    console.log(info);
  } catch (error) {
    console.error("EMAIL ERROR");

    console.error(error);
  }

  console.log("========== END ==========");

  await Order.findByIdAndUpdate(order._id, {
    status: "Quoted",
  });

  return quote;
};

export const getQuotes = async (userId?: string, role?: string) => {
  const filter =
    role === "admin"
      ? {}
      : {
          customer: userId,
        };

  return await Quote.find(filter).populate("customer").populate("order").sort({
    createdAt: -1,
  });
};

export const getQuoteById = async (id: string) => {
  const quote = await Quote.findById(id).populate("customer").populate("order");

  if (!quote) {
    throw new Error("Quote not found");
  }

  return quote;
};

export const approveQuote = async (id: string) => {
  const quote: any = await Quote.findById(id);

  if (!quote) {
    throw new Error("Quote not found");
  }

  quote.status = "Approved";

  quote.approvedAt = new Date();

  quote.history.push({
    status: "Approved",
    note: "Customer Approved Quote",
    changedAt: new Date(),
  });

  await quote.save();

  await Order.findByIdAndUpdate(quote.order, {
    status: "Approved",
  });

  return quote;
};

export const rejectQuote = async (id: string, reason: string) => {
  const quote: any = await Quote.findById(id);

  if (!quote) {
    throw new Error("Quote not found");
  }

  quote.status = "Rejected";

  quote.rejectedAt = new Date();

  quote.rejectionReason = reason;

  quote.history.push({
    status: "Rejected",
    note: reason,
    changedAt: new Date(),
  });

  await quote.save();

  return quote;
};

export const convertQuoteToOrder = async (id: string) => {
  const quote: any = await Quote.findById(id);

  if (!quote) {
    throw new Error("Quote not found");
  }

  const order: any = await Order.findById(quote.order);

  if (!order) {
    throw new Error("Order not found");
  }

  order.status = "In Production";

  order.timeline.push({
    status: "In Production",
    note: "Production Started",
    date: new Date(),
  });

  await order.save();

  return order;
};

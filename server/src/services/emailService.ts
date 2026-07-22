import transporter from "../config/email.js";

type OrderItem = {
  product?: {
    name?: string;
  };
  quantity: number;
};

type OrderEmailData = {
  to: string;
  customerName: string;
  orderId: string;
  items?: OrderItem[];
};

const getEmailTemplate = (
  customerName: string,
  title: string,
  message: string,
  orderId: string,
  items: OrderItem[] = [],
) => {
  const itemsHtml = items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee;">
            ${item.product?.name || "Product"}
          </td>
          <td style="padding:8px;border-bottom:1px solid #eee;">
            ${item.quantity}
          </td>
        </tr>
      `,
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;padding:30px">

      <h1 style="color:#B89D82">${title}</h1>

      <p>
        Hi <b>${customerName}</b>,
      </p>

      <p>${message}</p>

      <p>
        <b>Order ID :</b> ${orderId}
      </p>

      ${
        items.length
          ? `
      <table
        style="width:100%;border-collapse:collapse;margin-top:20px"
      >
        <thead>
          <tr>
            <th align="left">Product</th>
            <th align="left">Qty</th>
          </tr>
        </thead>

        <tbody>
          ${itemsHtml}
        </tbody>

      </table>
      `
          : ""
      }

      <hr style="margin-top:35px"/>

      <p style="color:#777">
        EventCanvas<br/>
        Printing • Branding • Merchandise • Event Management
      </p>

    </div>
  `;
};

const sendStatusEmail = async (
  subject: string,
  title: string,
  message: string,
  data: OrderEmailData,
) => {
  const info = await transporter.sendMail({
    from: `"EventCanvas" <${process.env.BREVO_USER}>`,
    to: data.to,
    subject,

    html: getEmailTemplate(
      data.customerName,
      title,
      message,
      data.orderId,
      data.items,
    ),
  });

  console.log("✅ Email Sent:", info.messageId);
};

export const sendOrderPlacedEmail = async (data: OrderEmailData) =>
  sendStatusEmail(
    "Your EventCanvas Order Has Been Received 🎉",
    "Thank you for your order!",
    "We've successfully received your order. We'll contact you shortly with your quotation.",
    data,
  );

export const sendQuoteReadyEmail = async (data: OrderEmailData) =>
  sendStatusEmail(
    "Your Quote is Ready",
    "Your quotation is ready!",
    "Your quotation has been prepared. Please log in to review and approve it.",
    data,
  );

export const sendApprovedEmail = async (data: OrderEmailData) =>
  sendStatusEmail(
    "Order Approved",
    "Order Approved",
    "Your order has been approved and is moving to production.",
    data,
  );

export const sendPaymentReceivedEmail = async (data: OrderEmailData) =>
  sendStatusEmail(
    "Payment Received",
    "Payment Received",
    "We've successfully received your payment. Production has started.",
    data,
  );

export const sendProductionEmail = async (data: OrderEmailData) =>
  sendStatusEmail(
    "Production Started",
    "Production Started",
    "Your order is now in production.",
    data,
  );

export const sendDispatchEmail = async (data: OrderEmailData) =>
  sendStatusEmail(
    "Ready For Dispatch",
    "Ready For Dispatch",
    "Your order has been packed and is ready for dispatch.",
    data,
  );

export const sendCompletedEmail = async (data: OrderEmailData) =>
  sendStatusEmail(
    "Order Completed",
    "Order Completed",
    "Your order has been completed successfully.",
    data,
  );

export const sendCancelledEmail = async (data: OrderEmailData) =>
  sendStatusEmail(
    "Order Cancelled",
    "Order Cancelled",
    "Your order has been cancelled.",
    data,
  );
export const sendAdminNewOrderEmail = async (
  customerName: string,
  customerEmail: string,
  orderId: string,
) => {
  const info = await transporter.sendMail({
    from: `"EventCanvas" <${process.env.BREVO_USER}>`,
    to: process.env.BREVO_USER,

    subject: "🚨 New Order Received",

    html: `
      <div style="font-family:Arial;padding:30px">

        <h1 style="color:#B89D82">
          New Order Received
        </h1>

        <p><b>Customer :</b> ${customerName}</p>

        <p><b>Email :</b> ${customerEmail}</p>

        <p><b>Order ID :</b> ${orderId}</p>

      </div>
    `,
  });

  console.log("✅ Admin Order Email:", info.messageId);
};

export const sendAdminNewUserEmail = async (name: string, email: string) => {
  const info = await transporter.sendMail({
    from: `"EventCanvas" <${process.env.BREVO_USER}>`,
    to: process.env.BREVO_USER,

    subject: "🎉 New User Registered",

    html: `
      <div style="font-family:Arial;padding:30px">

        <h1 style="color:#B89D82">
          New User Registration
        </h1>

        <p><b>Name :</b> ${name}</p>

        <p><b>Email :</b> ${email}</p>

      </div>
    `,
  });

  console.log("✅ Admin User Email:", info.messageId);
};

export const sendQuoteRequestEmail = async (
  customerName: string,
  customerEmail: string,
  productName: string,
  quantity: number,
) => {
  try {
    const info = await transporter.sendMail({
      from: `"EventCanvas" <${process.env.BREVO_USER}>`,
      to: process.env.BREVO_USER,

      subject: "📩 New Quote Request",

      html: `
      <div style="font-family:Arial;padding:30px">

        <h1 style="color:#B89D82">
          New Quote Request
        </h1>

        <table style="border-collapse:collapse;width:100%">

          <tr>
            <td style="padding:10px"><b>Customer</b></td>
            <td>${customerName}</td>
          </tr>

          <tr>
            <td style="padding:10px"><b>Email</b></td>
            <td>${customerEmail}</td>
          </tr>

          <tr>
            <td style="padding:10px"><b>Product</b></td>
            <td>${productName}</td>
          </tr>

          <tr>
            <td style="padding:10px"><b>Quantity</b></td>
            <td>${quantity}</td>
          </tr>

        </table>

      </div>
      `,
    });

    console.log("✅ Quote Request Email Sent");
    console.log(info.messageId);
  } catch (error) {
    console.error("❌ Quote Request Email Failed");
    console.error(error);
    throw error;
  }
};

type QuoteEmailData = {
  to: string;
  customerName: string;
  quoteNumber: string;
  grandTotal: number;
  pdfPath: string;
};

export const sendQuoteEmail = async ({
  to,
  customerName,
  quoteNumber,
  grandTotal,
  pdfPath,
}: QuoteEmailData) => {
  try {
    const info = await transporter.sendMail({
      from: `"EventCanvas" <${process.env.BREVO_USER}>`,
      to,

      subject: `Quotation ${quoteNumber} is Ready`,

      attachments: [
        {
          filename: `${quoteNumber}.pdf`,
          path: pdfPath,
        },
      ],

      html: `
      <div style="font-family:Arial;padding:40px;max-width:700px;margin:auto">

        <h1 style="color:#B89D82;margin-bottom:30px">
          Your EventCanvas Quotation is Ready
        </h1>

        <p>Hello <b>${customerName}</b>,</p>

        <p>We've successfully prepared your quotation.</p>

        <table
          style="
            width:100%;
            margin-top:25px;
            border-collapse:collapse;
          "
        >

          <tr>
            <td style="padding:12px;border:1px solid #ddd">
              Quote Number
            </td>

            <td style="padding:12px;border:1px solid #ddd">
              ${quoteNumber}
            </td>
          </tr>

          <tr>
            <td style="padding:12px;border:1px solid #ddd">
              Grand Total
            </td>

            <td
              style="
                padding:12px;
                border:1px solid #ddd;
                font-weight:bold;
                color:#B89D82;
              "
            >
              ₹ ${grandTotal.toLocaleString()}
            </td>
          </tr>

        </table>

        <p style="margin-top:30px">
          📎 Your quotation PDF has been attached with this email.
        </p>

        <p>
          Please review the quotation and approve it from your EventCanvas dashboard.
        </p>

        <hr style="margin:40px 0"/>

        <p style="color:#777">
          EventCanvas<br/>
          Printing • Branding • Merchandise • Event Management
        </p>

      </div>
      `,
    });

    console.log("✅ Quote Email Sent Successfully");
    console.log(info);

    return info;
  } catch (error) {
    console.error("❌ Quote Email Failed");
    console.error(error);
    throw error;
  }
};
export const sendOTPEmail = async (email: string, otp: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"EventCanvas" <${process.env.BREVO_USER}>`,
      to: email,
      subject: "EventCanvas Password Reset OTP",

      html: `
      <div
        style="
          max-width:600px;
          margin:auto;
          padding:40px;
          font-family:Arial,sans-serif;
          background:#fafafa;
        "
      >

        <h1
          style="
            color:#B89D82;
            margin-bottom:25px;
          "
        >
          Password Reset
        </h1>

        <p>Hello,</p>

        <p>
          We received a request to reset your EventCanvas password.
        </p>

        <p>
          Use the OTP below to continue.
        </p>

        <div
          style="
            margin:35px 0;
            text-align:center;
          "
        >
          <span
            style="
              display:inline-block;
              padding:18px 35px;
              font-size:34px;
              letter-spacing:10px;
              font-weight:bold;
              color:#42362F;
              background:#F5F0EB;
              border-radius:12px;
            "
          >
            ${otp}
          </span>
        </div>

        <p>
          This OTP is valid for <b>5 minutes</b>.
        </p>

        <p>
          If you did not request a password reset,
          simply ignore this email.
        </p>

        <hr style="margin:40px 0"/>

        <p style="color:#777">
          EventCanvas<br/>
          Printing • Branding • Merchandise • Event Management
        </p>

      </div>
      `,
    });

    console.log("✅ OTP Email Sent");
    console.log(info.messageId);

    return info;
  } catch (error) {
    console.error("❌ OTP Email Failed");
    console.error(error);
    throw error;
  }
};

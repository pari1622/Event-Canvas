import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import Quote from "../models/Quote.js";

export const generateQuotePDF = async (quoteId: string) => {
  const quote: any = await Quote.findById(quoteId).populate("customer");

  if (!quote) {
    throw new Error("Quote not found");
  }

  const pdfDir = path.join(process.cwd(), "uploads", "quotes");

  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, {
      recursive: true,
    });
  }

  const filePath = path.join(pdfDir, `${quote.quoteNumber}.pdf`);

  const doc = new PDFDocument({
    size: "A4",
    margin: 45,
  });

  doc.pipe(fs.createWriteStream(filePath));

  /* ---------------- HEADER ---------------- */

  doc.fillColor("#B89D82").fontSize(30).text("EVENTCANVAS", {
    align: "center",
  });

  doc
    .fillColor("black")
    .fontSize(12)
    .text("Printing • Branding • Merchandise • Event Management", {
      align: "center",
    });

  doc.moveDown();

  doc.fontSize(22).text("QUOTATION", {
    align: "center",
  });

  doc.moveDown(2);

  /* ---------------- CUSTOMER ---------------- */

  doc.fontSize(12);

  doc.text(`Quote No : ${quote.quoteNumber}`);

  doc.text(`Customer : ${quote.customer.name}`);

  doc.text(`Date : ${new Date().toLocaleDateString()}`);

  doc.text(
    `Validity : ${
      quote.validity ? new Date(quote.validity).toLocaleDateString() : "-"
    }`,
  );

  doc.moveDown(2);

  /* ---------------- TABLE ---------------- */

  const startX = 50;

  let y = doc.y;

  doc.fontSize(11).font("Helvetica-Bold");

  doc.text("Description", startX, y);

  doc.text("Qty", 300, y);

  doc.text("Rate", 360, y);

  doc.text("Total", 470, y);

  y += 20;

  doc.moveTo(50, y).lineTo(550, y).stroke();

  y += 12;

  doc.font("Helvetica");

  quote.items.forEach((item: any) => {
    doc.text(item.description, startX, y);

    doc.text(String(item.quantity), 305, y);

    doc.text(`₹${item.unitPrice}`, 355, y);

    doc.text(`₹${item.total}`, 470, y);

    y += 25;
  });

  doc.moveDown(3);

  /* ---------------- TOTALS ---------------- */

  doc.moveTo(330, y).lineTo(550, y).stroke();

  y += 15;

  doc.text(`Subtotal`, 330, y);

  doc.text(`₹${quote.subtotal.toLocaleString()}`, 470, y);

  y += 22;

  doc.text(`Discount`, 330, y);

  doc.text(`₹${quote.discount.toLocaleString()}`, 470, y);

  y += 22;

  doc.text(`GST (${quote.gst}%)`, 330, y);

  doc.text(`₹${quote.gstAmount.toLocaleString()}`, 470, y);

  y += 28;

  doc.font("Helvetica-Bold").fontSize(15);

  doc.text("Grand Total", 330, y);

  doc.text(`₹${quote.grandTotal.toLocaleString()}`, 470, y);

  doc.moveDown(4);

  /* ---------------- TERMS ---------------- */

  doc.font("Helvetica-Bold").fontSize(13).text("Terms & Conditions");

  doc.moveDown(0.5);

  doc.font("Helvetica").fontSize(11).text(quote.terms);

  doc.moveDown(2);

  /* ---------------- FOOTER ---------------- */

  doc
    .fontSize(10)
    .fillColor("gray")
    .text("Thank you for choosing EventCanvas.", {
      align: "center",
    });

  doc.text(
    "This quotation is computer generated and does not require signature.",
    {
      align: "center",
    },
  );

  doc.text("www.eventcanvas.in", {
    align: "center",
  });

  doc.end();

  return filePath;
};

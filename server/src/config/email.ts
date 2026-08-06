import * as dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",

  port: 587,

  secure: false,

  requireTLS: true,

  auth: {
    user: process.env.BREVO_USER!,
    pass: process.env.BREVO_SMTP_KEY!,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP VERIFY FAILED");
    console.error(error);
  } else {
    console.log("✅ SMTP CONNECTED");
    console.log(success);
  }
});

export default transporter;

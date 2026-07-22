import * as dotenv from "dotenv";
dotenv.config();

import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_SMTP_KEY,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ BREVO SMTP VERIFY FAILED");
    console.error(error);
  } else {
    console.log("✅ BREVO SMTP READY");
  }
});

export default transporter;

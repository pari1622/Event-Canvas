import * as dotenv from "dotenv";
dotenv.config();

import * as nodemailer from "nodemailer";

console.log("==================================");
console.log("==================================");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

transporter.verify((error: Error | null, success: boolean) => {
  if (error) {
    console.error("❌ EMAIL VERIFY FAILED");
    console.error(error);
  } else {
    console.log("✅ EMAIL SERVER READY");
  }
});

export default transporter;

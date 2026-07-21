import * as dotenv from "dotenv";
dotenv.config();

import * as nodemailer from "nodemailer";

console.log("==================================");
console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS =", process.env.EMAIL_PASS);
console.log("==================================");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ EMAIL VERIFY FAILED");
    console.error(error);
  } else {
    console.log("✅ EMAIL SERVER READY");
  }
});

export default transporter;

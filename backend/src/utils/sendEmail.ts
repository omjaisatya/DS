import * as nodemailer from "nodemailer";
import { EMAIL_PASS, EMAIL_USER } from "../config/envConfig";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Email sending error:", error);
  }
};

export default sendEmail;

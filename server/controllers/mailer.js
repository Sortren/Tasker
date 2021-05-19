import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

export function sendMail(mail) {
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log("Error!");
    } else {
      console.log("Email has been sent!");
    }
  });
}

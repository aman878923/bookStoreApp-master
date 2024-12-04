import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false
  }
});

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, orderNumber, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "aman.agarwal7385@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Order Number:</strong> ${orderNumber || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ success: false, message: "Failed to send email", error: error.message });
  }
};
// https://12dwqxjg-5173.inc1.devtunnels.ms/
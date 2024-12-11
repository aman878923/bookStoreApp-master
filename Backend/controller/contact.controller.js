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

export const sendWelcomeEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const signupLink = `${process.env.FRONTEND_URL}/signup`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to BookStore - Complete Your Registration",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to BookStore!</h2>
          <p>Thank you for your interest in joining our community of book lovers!</p>
          <p>To complete your registration, please click the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${signupLink}" style="background-color: #ec4899; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Complete Registration
            </a>
          </div>
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p>${signupLink}</p>
          <p>We're excited to have you join our community!</p>
          <p>Best regards,<br>The BookStore Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ 
      success: true, 
      message: "Welcome email sent successfully" 
    });
  } catch (error) {
    console.error("Welcome email error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to send welcome email", 
      error: error.message 
    });
  }
};
// https://12dwqxjg-5173.inc1.devtunnels.ms/
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
    rejectUnauthorized: false,
  },
});

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, orderNumber, message } = req.body;

    // Enhanced validation
    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields properly",
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || "aman.agarwal7385@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Order Number:</strong> ${orderNumber || "N/A"}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px;">
            ${message}
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send your message. Please try again.",
      error: error.message,
    });
  }
};

export const sendWelcomeEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Valid email is required" });
    }

    const signupLink = `${process.env.FRONTEND_URL}/signup`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to BookStore - Start Your Reading Journey!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #ec4899;">Welcome to BookStore!</h2>
          <p>We're excited to have you join our community of book lovers!</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${signupLink}" 
               style="background-color: #ec4899; 
                      color: white; 
                      padding: 12px 24px; 
                      text-decoration: none; 
                      border-radius: 5px; 
                      display: inline-block;">
              Complete Your Registration
            </a>
          </div>
          <p>If the button doesn't work, copy this link:</p>
          <p style="color: #666;">${signupLink}</p>
          <p>Happy Reading!<br>The BookStore Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      success: true,
      message: "Welcome email sent successfully",
    });
  } catch (error) {
    console.error("Welcome email error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send welcome email",
      error: error.message,
    });
  }
};

// https://12dwqxjg-5173.inc1.devtunnels.ms/

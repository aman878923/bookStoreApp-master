import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import PasswordValidator from "password-validator";
import { generateToken } from "../utils/jwt.js";
import { getWelcomeEmailTemplate } from "../utils/emailTemplates.js";
import { transporter } from "../config/nodemailer.js";

// Create password validation schema
const schema = new PasswordValidator();
schema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .symbols(1)
  .has()
  .not()
  .spaces();

const getPasswordErrorMessage = (validationResult) => {
  const errorMessages = {
    min: "Password must be at least 8 characters long",
    max: "Password is too long (maximum 100 characters)",
    uppercase: "Password must contain at least one uppercase letter",
    lowercase: "Password must contain at least one lowercase letter",
    digits: "Password must contain at least 2 numbers",
    symbols: "Password must contain at least 1 special character",
    spaces: "Password cannot contain spaces",
  };
  return validationResult.map(
    (error) => errorMessages[error.validation] || error.message
  );
};

export const signup = async (req, res) => {
  console.log("Signup request received:", req.body);
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      console.log("Missing required fields:", { fullname, email, password });
      return res.status(400).json({ message: "All fields are required" });
    }

    const validationResult = schema.validate(password, { details: true });
    if (validationResult.length > 0) {
      return res.status(400).json({
        message: "Please check password requirements:",
        errors: getPasswordErrorMessage(validationResult),
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      password: hashPassword,
    });

    await newUser.save();

    // Generate JWT token
    const token = generateToken({
      id: newUser._id,
      email: newUser.email,
      fullname: newUser.fullname,
    });

    // After successful user creation, send welcome email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to BookStore - Your Reading Journey Begins!",
      html: getWelcomeEmailTemplate(fullname),
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "Signup successful! Welcome email sent.",
      token,
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error during signup process" });
  }
};

// New method to get user count
export const getUserCount = async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user count' });
    }
}
// user.controller.js



export const getRecentUsers = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recent users" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    console.log("Generated token:", token); // Track token generation

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

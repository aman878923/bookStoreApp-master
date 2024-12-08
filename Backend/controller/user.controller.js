import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import PasswordValidator from "password-validator";

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
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
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
    res.status(201).json({
      message: "Registration successful! Please login.",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("Error in signup:", error.message);
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
};

import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your-jwt-secret",
      { expiresIn: "24h" }
    );

    // Set session data
    req.session.userId = user._id;

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add logout functionality
export const logout = async (req, res) => {
  try {
    // Clear session
    req.session.destroy();

    // Clear cookie
    res.clearCookie("token");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }
};

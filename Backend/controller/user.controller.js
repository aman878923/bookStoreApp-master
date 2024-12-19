import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import PasswordValidator from 'password-validator';
import { generateToken } from '../utils/jwt.js';

// Create password validation schema
const schema = new PasswordValidator();
schema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits(2)
  .has().symbols(1)
  .has().not().spaces();

const getPasswordErrorMessage = (validationResult) => {
  const errorMessages = {
    min: "Password must be at least 8 characters long",
    max: "Password is too long (maximum 100 characters)",
    uppercase: "Password must contain at least one uppercase letter",
    lowercase: "Password must contain at least one lowercase letter",
    digits: "Password must contain at least 2 numbers",
    symbols: "Password must contain at least 1 special character",
    spaces: "Password cannot contain spaces"
  };
  return validationResult.map(error => errorMessages[error.validation] || error.message);
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
        errors: getPasswordErrorMessage(validationResult)
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
    const token = generateToken({ id: newUser._id, email: newUser.email });

    res.status(201).json({
      message: "Registration successful! Please login.",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
      token
    });
  } catch (error) {
    console.log("Error in signup:", error.message);
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateToken({ id: user._id, email: user.email });

    res.status(200).json({
      message: "Login successful!",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
      token
    });
  } catch (error) {
    console.log("Error in login:", error.message);
    res.status(500).json({ message: "Login failed. Please try again." });
  }
};
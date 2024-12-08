import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import contactRoute from "./route/contact.route.js";
import userRoute from "./route/user.route.js";
import seedFreeBooks from "./inti/FreeBooks.js";
import seedPaidBooks from "./inti/modeData.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import csurf from "csurf";

const app = express();
dotenv.config();
// Session Configuration
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// CORS configuration with credentials
app.use(
  cors({
    origin: "https://bookstoreapp-master-1.onrender.com",
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());
app.use(csurf({ cookie: true }));
app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
app.use(express.json());

const PORT = process.env.PORT || 4001;
const URI = process.env.MongoDBURI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
    retryWrites: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
    seedFreeBooks();
    seedPaidBooks();
  })
  .catch((error) => {
    console.log("❌ MongoDB connection error:", error);
    process.exit(1);
  });
  app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
      return res.status(403).json({
        message: 'Invalid CSRF token',
        error: err.message
      });
    }
    next(err);
  });
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/contact", contactRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

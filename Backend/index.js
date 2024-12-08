import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import csurf from "csurf";

import bookRoute from "./route/book.route.js";
import contactRoute from "./route/contact.route.js";
import userRoute from "./route/user.route.js";
import seedFreeBooks from "./inti/FreeBooks.js";
import seedPaidBooks from "./inti/modeData.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const URI = process.env.MongoDBURI;

if (!process.env.SESSION_SECRET || !process.env.MongoDBURI) {
  console.error("❌ Missing required environment variables!");
  process.exit(1);
}

// Middleware
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "https://bookstoreapp-master-1.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// CSRF Protection
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  },
});

app.use((req, res, next) => {
  if (req.path === "/api/csrf-token") next();
  else csrfProtection(req, res, next);
});

app.get("/api/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/contact", contactRoute);

// MongoDB Connection
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
    if (process.env.NODE_ENV === "development") {
      seedFreeBooks();
      seedPaidBooks();
    }
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// Error Handling
app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ message: "Invalid CSRF token" });
  }
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

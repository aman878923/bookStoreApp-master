import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import contactRoute from "./route/contact.route.js";
import userRoute from "./route/user.route.js";
import seedFreeBooks from "./inti/FreeBooks.js";
import seedPaidBooks from "./inti/modeData.js";
import morgan from "morgan";
import { setupSocket } from "./config/socket.js";
import chatRoutes from "./route/chat.route.js";
import http from "http";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
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
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);
app.use((req, res, next) => {
  console.log("Request received:", {
    method: req.method,
    path: req.path,
    body: req.body,
  });
  next();
});

app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/contact", contactRoute);

app.use("/api/chat", chatRoutes);

// Setup Socket.io
const server = http.createServer(app);
const io = setupSocket(server);

// Socket event handlers
io.on("connection", (socket) => {
  console.log("User connected:", socket.userId);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.userId);
  });
});
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

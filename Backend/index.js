import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import contactRoute from "./route/contact.route.js";
import userRoute from "./route/user.route.js";
import seedFreeBooks from "./inti/FreeBooks.js";
import seedPaidBooks from "./inti/modeData.js";


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
    retryWrites: true,
    serverSelectionTimeoutMS: 5000
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

app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/contact", contactRoute);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
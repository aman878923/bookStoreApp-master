import mongoose from "mongoose";

const userActivitySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    activityType: {
        type: String,
        enum: ["view", "purchase", "review", "wishlist", "cart"],
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const UserActivity = mongoose.model("UserActivity", userActivitySchema);
export default UserActivity;

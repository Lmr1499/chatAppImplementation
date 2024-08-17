const mongoose = require("mongoose");

// Define the user activity schema
const userActivitySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat", // Reference to the Chat model (assuming you have a Chat model)
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create an index on userId and chatId for efficient querying
userActivitySchema.index({ userId: 1, chatId: 1 });

// Define the model
const UserActivity = mongoose.model("UserActivity", userActivitySchema);

module.exports = UserActivity;

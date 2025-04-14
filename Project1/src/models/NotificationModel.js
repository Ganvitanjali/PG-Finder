const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "UserId", 
        required: true 
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // isse createdAt aur updatedAt aa jayega automatic
);

module.exports = mongoose.model("Notification", notificationSchema);

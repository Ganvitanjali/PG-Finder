const Notification = require("../models/NotificationModel");

// ✅ Add Notification
const addNotification = async (req, res) => {
  try {
    const newNotification = await Notification.create(req.body);
    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: newNotification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating notification",
      error: error.message,
    });
  }
};

// ✅ Get All Notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json({
      success: true,
      message: "Notifications fetched successfully",
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching notifications",
      error: error.message,
    });
  }
};

// ✅ Get Notifications by User ID
const getNotificationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId });
    res.status(200).json({
      success: true,
      message: "User notifications fetched successfully",
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user notifications",
      error: error.message,
    });
  }
};

// ✅ Delete Notification by ID
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotification = await Notification.findByIdAndDelete(id);

    if (!deletedNotification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
      data: deletedNotification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting notification",
      error: error.message,
    });
  }
};

// ✅ Mark Notification as Read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: updatedNotification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error marking notification as read",
      error: error.message,
    });
  }
};

module.exports = {
  addNotification,
  getAllNotifications,
  getNotificationsByUser,
  deleteNotification,
  markAsRead,
};

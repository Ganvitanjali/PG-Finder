const UserModel = require("../models/UserModel");
const PropertyModel = require("../models/PropertyModel");
const BookingModel = require("../models/BookingModels");

const getDashboardData = async (req, res) => {
  try {
    const totalUsers = await UserModel.countDocuments();
    const totalPropertys = await PropertyModel.countDocuments();
    const totalBookings = await BookingModel.countDocuments();
    const pendingInquiries = await BookingModel.countDocuments({ status: "Pending" });

    res.status(200).json({
      success: true,
      totalUsers,
      totalPropertys,
      totalBookings,
      pendingInquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
};

// Agar tumhe individual APIs bhi rakhni hai toh:
const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await UserModel.countDocuments();
    res.status(200).json({ success: true, totalUsers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getTotalPropertys = async (req, res) => {
  try {
    const totalPropertys = await PropertyModel.countDocuments();
    res.status(200).json({ success: true, totalPGs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getTotalBookings = async (req, res) => {
  try {
    const totalBookings = await BookingModel.countDocuments();
    res.status(200).json({ success: true, totalBookings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getPendingInquiries = async (req, res) => {
  try {
    const pendingInquiries = await BookingModel.countDocuments({ status: "Pending" });
    res.status(200).json({ success: true, pendingInquiries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getDashboardData,
  getTotalUsers,
  getTotalPropertys,
  getTotalBookings,
  getPendingInquiries
};

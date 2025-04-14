const Booking = require("../models/BookingModels");

// ✅ Add New Booking
const addBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json({
      message: "Booking added successfully",
      data: savedBooking,
    });
  } catch (error) {
    console.error("Add Booking Error:", error);
    res.status(500).json({
      message: "Error adding booking",
      error: error.message,
    });
  }
};

// ✅ Get All Bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    console.error("Get Bookings Error:", error);
    res.status(500).json({
      message: "Error fetching bookings",
      error: error.message,
    });
  }
};

// ✅ Get Booking By ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({
      message: "Booking fetched successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Get Booking by ID Error:", error);
    res.status(500).json({
      message: "Error fetching booking",
      error: error.message,
    });
  }
};

// ✅ Update Booking
const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.error("Update Booking Error:", error);
    res.status(500).json({
      message: "Error updating booking",
      error: error.message,
    });
  }
};

// ✅ Delete Booking
const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({
      message: "Booking deleted successfully",
      data: deletedBooking,
    });
  } catch (error) {
    console.error("Delete Booking Error:", error);
    res.status(500).json({
      message: "Error deleting booking",
      error: error.message,
    });
  }
};

// ✅ Update Booking Status (New Function)
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking status updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.error("Update Booking Status Error:", error);
    res.status(500).json({
      message: "Error updating booking status",
      error: error.message,
    });
  }
};

module.exports = {
  addBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  updateBookingStatus, // ✅ Don't forget to export
};

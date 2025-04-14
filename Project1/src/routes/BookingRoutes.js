const routes = require("express").Router();
const bookingController = require("../controllers/BookingController");

// 🔹 New Booking Create (POST)
routes.post("/bookings",bookingController.addBooking);

// 🔹 Get All Bookings (GET)
routes.get("/bookings",bookingController.getAllBookings);

// 🔹 Get a Single Booking by ID (GET)
routes.get("/bookings/:id",bookingController.getBookingById);

// 🔹 Delete Booking by ID (DELETE)
routes.delete("/bookings/:id",bookingController.deleteBooking);

routes.put("/bookings/:id/status", bookingController.updateBookingStatus);

module.exports = routes;

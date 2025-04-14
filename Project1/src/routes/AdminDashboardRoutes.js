const routes = require('express').Router();
const adminDashboardController = require("../controllers/AdminDashboardController");

// Get Dashboard Data (Total Users, Total PGs, Total Bookings, Pending Inquiries)
routes.get("/dashboarddata", adminDashboardController.getDashboardData);

// Get Total Users (Optional, agar individual chahiye toh)
routes.get("/totalusers", adminDashboardController.getTotalUsers);

// Get Total PGs (Optional)
routes.get("/totalpropertys", adminDashboardController.getTotalPropertys);

// Get Total Bookings (Optional)
routes.get("/totalbookings", adminDashboardController.getTotalBookings);

// Get Pending Inquiries (Optional)
routes.get("/pendinginquiries", adminDashboardController.getPendingInquiries);

module.exports = routes;

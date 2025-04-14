const routes = require('express').Router();
const notificationController = require('../controllers/NotificationController');

// ✅ Notification add karne ka route
routes.post("/addnotification", notificationController.addNotification);

// ✅ Saare notifications fetch karne ka route
routes.get("/getallnotifications", notificationController.getAllNotifications);

// ✅ Specific user ke notifications fetch karne ka route
routes.get("/getnotificationsbyuser/:id", notificationController.getNotificationsByUser);

// ✅ Notification delete karne ka route
routes.delete("/deletenotification/:id", notificationController.deleteNotification);

// ✅ Notification ko read mark karne ka route
routes.put("/markasread/:id", notificationController.markAsRead);

module.exports = routes;

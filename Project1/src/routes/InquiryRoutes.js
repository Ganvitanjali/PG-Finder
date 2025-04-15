const routes = require("express").Router();
const inquiryController = require("../controllers/InquiryController");

routes.post("/add",inquiryController.addInquiry);
routes.get("/get",inquiryController.getInquiry);
routes.post("/reply/:id", inquiryController.replyInquiry);

// Reply to a specific inquiry by ID
routes.put("/inquiries/reply/:id", inquiryController.replyInquiry);

routes.get("/unreadreplies/:userId", inquiryController.getUnreadReplies);

module.exports = routes;

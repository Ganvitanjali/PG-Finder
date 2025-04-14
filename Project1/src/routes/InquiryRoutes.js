const routes = require("express").Router();
const inquiryController = require("../controllers/InquiryController");

routes.post("/add",inquiryController.addInquiry);
routes.get("/get",inquiryController.getInquiry);
routes.post("/reply/:id", inquiryController.replyInquiry);
module.exports = routes;
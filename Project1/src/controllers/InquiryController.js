const inquiryModel = require("../models/InquiryModel");

// Add Inquiry
const addInquiry = async (req, res) => {
    try {
        const savedInquiry = await inquiryModel.create(req.body);
        res.status(200).json({
            message: "Inquiry added successfully",
            data: savedInquiry
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Get All Inquiries
const getInquiry = async (req, res) => {
    try {
        const inquiry = await inquiryModel.find().populate("propertyId").populate("userId");
        res.status(200).json({
            message: "All inquiry",
            data: inquiry
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Reply to Inquiry ✅
const replyInquiry = async (req, res) => {
    try {
        const { inquiryId, replyMessage } = req.body;

        const inquiry = await inquiryModel.findById(inquiryId);
        if (!inquiry) {
            return res.status(404).json({
                message: "Inquiry not found"
            });
        }

        inquiry.reply = replyMessage;
        inquiry.status = "Replied"; // optional: you can track status
        await inquiry.save();

        res.status(200).json({
            message: "Reply sent successfully",
            data: inquiry
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    addInquiry,
    getInquiry,
    replyInquiry // Don't forget to export ✅
};

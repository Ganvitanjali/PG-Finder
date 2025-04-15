const mongoose = require("mongoose");
const inquiryModel = require("../models/InquiryModel");

// Add Inquiry
const addInquiry = async (req, res) => {
    try {
        const { userId, propertyId, message, inquiryDate } = req.body;

        // Check missing fields
        if (!userId || !propertyId || !message || !inquiryDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create inquiry
        const savedInquiry = await inquiryModel.create({
            userId,
            propertyId,
            message,
            inquiryDate,
            status: "Open"
        });

        res.status(200).json({
            message: "Inquiry added successfully",
            data: savedInquiry
        });
    } catch (err) {
        console.log("❌ Inquiry error:", err.message);
        res.status(500).json({ message: err.message });
    }
};

// Get All Inquiries
const getInquiry = async (req, res) => {
    try {
        // Populate 'propertyId' and 'userId' with actual data from the referenced models
        const inquiries = await inquiryModel
            .find()
            .populate('propertyId', 'propertyName')  // Only populate the 'name' field of property
            .populate('userId', 'firstName lastName');     // Only populate the 'name' field of user

        if (!inquiries || inquiries.length === 0) {
            return res.status(404).json({
                message: "No inquiries found"
            });
        }

        res.status(200).json({
            message: "All inquiries fetched successfully",
            data: inquiries
        });
    } catch (err) {
        res.status(500).json({
            message: "An error occurred while fetching inquiries",
            error: err.message
        });
    }
};


// Reply to Inquiry ✅
const replyInquiry = async (req, res) => {
    try {
        const { reply } = req.body;
        const inquiryId = req.params.id;

        // Log the inquiryId for debugging
        console.log("Received inquiryId:", inquiryId);

        // Check if the inquiryId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(inquiryId)) {
            return res.status(400).json({ message: "Invalid inquiry ID format" });
        }

        // Ensure the reply message is present
        if (!reply) {
            return res.status(400).json({ message: "Reply is required" });
        }

        // Find the inquiry by its ID
        const inquiry = await inquiryModel.findById(inquiryId);
        if (!inquiry) {
            console.log("Inquiry not found in the database");
            return res.status(404).json({ message: "Inquiry not found" });
        }

        // Update the inquiry with the reply and change the status to "Resolved"
        inquiry.reply = reply;
        inquiry.status = "Resolved"; // Change status to "Resolved"
        await inquiry.save();

        res.status(200).json({
            message: "Reply sent successfully",
            data: inquiry
        });
    } catch (err) {
        console.error("Error replying to inquiry:", err);
        res.status(500).json({
            message: "An error occurred while replying to the inquiry",
            error: err.message
        });
    }
};

const getUnreadReplies = async (req, res) => {
    try {
        const { userId } = req.params;

        // Unread replies ko fetch karo
        const inquiries = await Inquiry.find({
            userId,
            reply: { $ne: null },
            notified: false  // Jo replies user ne read nahi kiya, wo fetch karenge
        }).populate("propertyId");  // Property details bhi include karo

        // Mark all these as notified
        await Inquiry.updateMany(
            {
                userId,
                reply: { $ne: null },
                notified: false
            },
            {
                $set: { notified: true }
            }
        );

        // Successful response
        res.status(200).json({
            success: true,
            data: inquiries  // Reply wale inquiries send karo
        });
    } catch (error) {
        console.error("Error fetching unread replies:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching unread replies"
        });
    }
};


module.exports = {
    addInquiry,
    getInquiry,
    replyInquiry, // Export the replyInquiry function
    getUnreadReplies
};

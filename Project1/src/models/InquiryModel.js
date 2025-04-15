const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inquirySchema = new Schema({
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: "Property",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    inquiryDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["Open", "Resolved", "Closed"],
        default: "Open"
    },
    reply: { 
        type: String 
    },
    notified: {
        type: Boolean,
        default: false
    }
    
}, {
    timestamps: true
});


module.exports = mongoose.model("inquiry",inquirySchema);

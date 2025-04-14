const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminDashboardSchema = new Schema({
    totalUsers: {
        type: Number,
        default: 0,
    },
    totalPropertys: {
        type: Number,
        default: 0,
    },
    totalBookings: {
        type: Number,
        default: 0,
    },
    pendingInquiries: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AdminDashboard', adminDashboardSchema);

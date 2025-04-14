const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agentProfileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    cityId: {
        type: Schema.Types.ObjectId,
        ref: 'City',
    },
    stateId: {
        type: Schema.Types.ObjectId,
        ref: 'State',
    },
    profileImage: {
        type: String, // Cloudinary image URL
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the login user model (jaise agent login karta hai)
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AgentProfile', agentProfileSchema);

// const mongoose = require("mongoose")
// const Schema = mongoose.Schema

// const userSchema = new Schema({

//     firstName:{
//         type:String
//     },
//     lastName:{
//         type:String
//     },
//     age:{
//         type:Number
//     },
//     status:{
//         type:Boolean,
//         default:true
//     },
//     roleId:{
//         type:Schema.Types.ObjectId, //batugasoijkadsasiksaj
//         ref:"roles"
//     },
//     password:{
//         type:String,
//     },
//     email:{
//         type:String,
//         unique:true
//     },
//     role: {
//         type: String,
//         enum: ["User", "Admin", "Agent", "Buy/Sale"],
//         default: "User", 
//       },

// })

// module.exports = mongoose.model('users',userSchema)

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    status: {
        type: String,
        enum: ["active", "blocked"],
        default: "active"
    },
    roleId: {
        type: Schema.Types.ObjectId,
        ref: "roles"  // 🔥 Role reference from "roles" collection
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ["User", "Admin", "Agent", "Buy/Sale"],
        default: "User",  // 🔥 Default role is "User"
    },
    phone:{
        type: Number,
    },
    resetOTP: { type: Number, default: null },  // Store OTP
    otpExpiry: { type: Date, default: null },
    resetToken: String,
    resetTokenExpiry: Date
});

// 🔥 Method to generate password reset token
userSchema.methods.generatePasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.resetToken = resetToken;
    this.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry

    return resetToken;
};

// 🔥 Method to hash password
userSchema.methods.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt);
};


module.exports = mongoose.model("users", userSchema);

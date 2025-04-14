const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inquirySchema = new Schema({
    propertyId:{
        type:Schema.Types.ObjectId,
        ref:"Property"
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    message:{
        type:String
    },
    inquiryDate:{
        type:Date
    },
    status:{
        type:String,
        enum:["Open","Resolved","Closed"]
    },
    reply: { 
        type: String 
    },
},{
  timestamps: true
});

module.exports = mongoose.model("inquiry",inquirySchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agentdetailsSchema = new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
       
    },
    licenseNo:{
        type:String
    },
    agencyName:{
        type:String
    },
    experienceYears:{
        type:Number
    },
    rating:{
        type:Number
    },
    address:{
        type:String
    }
},{
    timestamps:true
})

module.exports = mongoose.model("AgentDetails",agentdetailsSchema);
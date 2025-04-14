const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    propertyId:{
        type:Schema.Types.ObjectId,
        ref:"Property"
    },
    addedDate:{
        type:Date
    }
       
},{
   timestamps:true 
});

module.exports = mongoose.model("favorite",favoriteSchema);
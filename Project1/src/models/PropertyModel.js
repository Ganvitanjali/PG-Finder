const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    propertyName: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    cityId: {
      type: Schema.Types.ObjectId,
      ref: 'City',
      required: true,
    },
    stateId: {
      type: Schema.Types.ObjectId,
      ref: 'state',
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    areaId: {
      type: Schema.Types.ObjectId,
      ref: 'Area',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    description: {
      type: String,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    otherPriceDescription: {
      type: String,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    furnishingStatus: {
      type: String,
      enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
      required: true,
    },
    yearBuilt: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["available", "Sold", "Rented"],
      required: true,
    },
    image:{
      type:String,

    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);

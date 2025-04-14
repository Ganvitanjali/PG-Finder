const Property = require("../models/PropertyModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudanryUtil");
const PropertyModel = require("../models/PropertyModel");
//storage engine

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//multer object....

const upload = multer({
  storage: storage,
  //fileFilter:
}).single("image");


// Add Property
const addProperty = async (req, res) => {
  try {
    const newProperty = await Property.create(req.body);
    res.status(201).json({
      message: "Property added successfully",
      data: newProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding property", error });
  }
};

// Get All Properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("categoryId")
      .populate("cityId")
      .populate("stateId")
      .populate("areaId")
      .populate("userId");
    res.status(200).json({
      message: "Properties fetched successfully",
      data: properties,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error });
  }
};

const searchProperties = async (req, res) => {
  try {
    const { city, rent } = req.query;

    let filter = {}; // Filters object

    if (city) {
      filter.cityId = city;  // cityId को filter करो
    }
    if (rent) {
      filter.rent = { $lte: parseInt(rent) }; // Rent should be less than or equal
    }

    const properties = await Property.find(filter)
      .populate("categoryId")
      .populate("cityId")
      .populate("stateId")
      .populate("areaId")
      .populate("userId");

    res.status(200).json({
      message: "Filtered properties fetched successfully",
      data: properties,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("categoryId")
      .populate("cityId")
      .populate("stateId")
      .populate("areaId")
      .populate("userId");
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({
      message: "Property fetched successfully",
      data: property,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching property", error });
  }
};

// Update Property
const updatePropertyById = async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating property", error });
  }
};

// Delete Property
const deletePropertyById = async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({
      message: "Property deleted successfully",
      data: deletedProperty,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error });
  }
};

const addPropertyWithFile = async (req, res) => {
  
  upload(req, res, async (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: err.message,
        });
      } else {
        // database data store
        //cloundinary

       {/* console.log(req.body)
        res.status(200).json({
        message:"File uploaded successfully",
        data:req.file
        }) */}
  
        const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
        console.log(cloundinaryResponse);
        console.log(req.body);
  
        //store data in database
        req.body.image = cloundinaryResponse.secure_url;
        // try
        // {
        const savedProperty = await PropertyModel.create(req.body);
  
        res.status(200).json({
          message: "property uploaded successfully",
          data: savedProperty,
        }); 
      // }catch(err)
      //   { 
      //     res.status(500).json({
      //       message: "error while update hording",
      //       err: err,
      //     });
      // }   
     }
    });
  };

module.exports = {
  addProperty,
  getAllProperties,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
  searchProperties,
  addPropertyWithFile,
};

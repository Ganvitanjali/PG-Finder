const cityModel = require("../models/CityModel");

const addCity = async (req, res) => {
  try {
    const savedCity = await cityModel.create(req.body);
    res.status(201).json({
      message: "City added successfully",
      data: savedCity,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCities = async (req, res) => {
  try {
    const cities = await cityModel.find().populate("stateId");
    res.status(200).json({
      message: "All cities",
      data: cities,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getCitiesByStateId = async (req,res) => {
  try {
      const cities = await cityModel.find({stateId: req.params.stateId});
      res.status(200).json({
          message:"Cities fetched succesfully with state id....",
          data: cities
      })
  } catch (error) {
      res.status(500).json({ message: error });
  }
}

module.exports = { addCity, getCities, getCitiesByStateId };
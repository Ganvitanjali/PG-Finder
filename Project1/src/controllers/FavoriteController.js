const favoriteModel = require("../models/FavoriteModel");

const addFavorite = async (req,res) => {
    try{
        const savedFavorite = await favoriteModel.create(req.body);
        res.status(200).json({
            message: "Favorite added successfully",
            data: savedFavorite
        });
    } catch (err) {
        res.status(500).json({
            message: err
           
        });
    }
};

const getFavorite = async (req,res) => {
    try{
       const favorites = await favoriteModel.find().populate("userId").populate("propertyId");
       res.status(200).json({
        message: "All favorite",
        data: favorites
       });
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

module.exports = {
    addFavorite,
    getFavorite
};
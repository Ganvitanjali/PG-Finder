const routes = require("express").Router();
const favoriteController = require("../controllers/FavoriteController");

routes.post("/add", favoriteController.addFavorite);
routes.get("/get", favoriteController.getFavorite);
module.exports = routes;


const routes = require('express').Router();
const propertyController = require("../controllers/PropertyController");

routes.post("/addproperty", propertyController.addProperty);
routes.get("/getallproperties", propertyController.getAllProperties);
routes.get("/getproperty/:id", propertyController.getPropertyById);
routes.get('/search', propertyController.searchProperties); 
routes.put("/updateproperty/:id", propertyController.updatePropertyById);
routes.delete("/deleteproperty/:id", propertyController.deletePropertyById);
routes.post("/addWithFile", propertyController.addPropertyWithFile);

module.exports = routes;

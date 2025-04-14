const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");

router.post("/addcategory", categoryController.addCategory);
router.get("/getallcategories", categoryController.getAllCategories);
router.get("/getcategory/:id", categoryController.getCategoryById);
router.put("/updatecategory/:id", categoryController.updateCategory);
router.delete("/deletecategory/:id", categoryController.deleteCategory);

module.exports = router;


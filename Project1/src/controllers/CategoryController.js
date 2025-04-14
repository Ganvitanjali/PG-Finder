const Category = require("../models/CategoryModel");


const addCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json({
      message: "Category added successfully",
      data: savedCategory,
    });
  } catch (error) {
    console.error("Add Category Error:", error);
    res.status(500).json({
      message: "Error adding category",
      error: error.message,
    });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).json({
      message: "Error fetching categories",
      error: error.message,
    });
  }
};


const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    console.error("Get Category by ID Error:", error);
    res.status(500).json({
      message: "Error fetching category",
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Update Category Error:", error);
    res.status(500).json({
      message: "Error updating category",
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.status(500).json({
      message: "Error deleting category",
      error: error.message,
    });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};

const Agent = require("../models/AgentModel");
const multer = require("multer");
const cloudinaryUtil = require("../utils/CloudanryUtil");

// Multer Storage Engine
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Multer Upload Object
const upload = multer({ storage: storage }).single("profileImage");

// Add Agent Profile (with image upload)
const addAgentProfileWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    } else {
      try {
        // Cloudinary Upload
        const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
        req.body.profileImage = cloudinaryResponse.secure_url;

        // Save agent to DB
        const newAgent = await Agent.create(req.body);
        res.status(201).json({
          message: "Agent profile created successfully",
          data: newAgent,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Error creating agent profile",
          error,
        });
      }
    }
  });
};

// Get All Agents
const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json({
      message: "Agents fetched successfully",
      data: agents,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching agents", error });
  }
};

// Get Agent By Id
const getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.status(200).json({
      message: "Agent fetched successfully",
      data: agent,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching agent", error });
  }
};

// Update Agent Profile
const updateAgentById = async (req, res) => {
  try {
    const updatedAgent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAgent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.status(200).json({
      message: "Agent updated successfully",
      data: updatedAgent,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating agent", error });
  }
};

// Delete Agent Profile
const deleteAgentById = async (req, res) => {
  try {
    const deletedAgent = await Agent.findByIdAndDelete(req.params.id);
    if (!deletedAgent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.status(200).json({
      message: "Agent deleted successfully",
      data: deletedAgent,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting agent", error });
  }
};

module.exports = {
  addAgentProfileWithFile,
  getAllAgents,
  getAgentById,
  updateAgentById,
  deleteAgentById,
};

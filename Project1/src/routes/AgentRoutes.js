const express = require("express");
const router = express.Router();
const agentProfileController = require("../controllers/AgentProfileController");

// Add Agent Profile
router.post("/addagentprofile", agentProfileController.addAgentProfile);

// Get All Agent Profiles
router.get("/getallagentprofiles", agentProfileController.getAllAgentProfiles);

// Get Single Agent Profile by ID
router.get("/getagentprofile/:id", agentProfileController.getAgentProfileById);

// Update Agent Profile
router.put("/updateagentprofile/:id", agentProfileController.updateAgentProfile);

// Delete Agent Profile
router.delete("/deleteagentprofile/:id", agentProfileController.deleteAgentProfile);

module.exports = router;

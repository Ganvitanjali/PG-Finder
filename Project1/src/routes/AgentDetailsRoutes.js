const routes = require("express").Router();
const agentDetailsController = require("../controllers/AgentDetailsController");

routes.post("/add", agentDetailsController.addAgentDetails);
routes.get("/get", agentDetailsController.getAgentDetails);

module.exports = routes;
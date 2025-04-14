const agentdetailsModel = require("../models/AgentDetailsModel");

const addAgentDetails = async (req,res) =>{
    try{
        const savedAgentDetails = await agentdetailsModel.create(req.body);
        res.status(201).json({
            message: "AgentDetails added successfully",
            data:savedAgentDetails,
        });
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

const getAgentDetails = async (req,res) =>{
    try{
       const agentdetails = await agentdetailsModel.find().populate("userId");
       res.status(200).json({
        message: "All agentDetails",
        data: agentdetails
       });
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

module.exports = {
    addAgentDetails,
    getAgentDetails
}
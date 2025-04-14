import React, { useEffect, useState } from "react";
import axios from "axios";

const AgentProfile = () => {
  const agentId = localStorage.getItem("agentId");
  const [agent, setAgent] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await axios.get(`/pg/profile/${agentId}`);
        setAgent(res.data);
      } catch (err) {
        console.error("Failed to fetch agent", err);
      }
    };
    fetchAgent();
  }, [agentId]);

  const handleChange = (e) => {
    setAgent({ ...agent, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/pg/profile/${agentId}`, agent);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed");
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSave}>
        <input type="text" name="fullName" value={agent.fullName} onChange={handleChange} placeholder="Full Name" required />
        <input type="email" name="email" value={agent.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="phoneNumber" value={agent.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
        <input type="text" name="address" value={agent.address} onChange={handleChange} placeholder="Address" required />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default AgentProfile;

import React, { useEffect, useState } from "react";
import axios from "axios";

const InquiryForm = () => {
  const [properties, setProperties] = useState([]);

  const userId = localStorage.getItem("id"); // ✅ Get userId from localStorage

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    message: "",
    propertyId: "",
    inquiryDate: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:3000/property/getAllproperties");
        setProperties(response.data.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Please login to submit an inquiry.");
      return;
    }

    const dataToSend = {
      ...formData,
      userId: userId, // ✅ Include userId from localStorage
    };

    console.log("Submitting Inquiry Data:", dataToSend);
    try {
      await axios.post("http://localhost:3000/inquiry/add", dataToSend);
      alert("Inquiry submitted successfully!");
      setFormData({
        userName: "",
        email: "",
        phone: "",
        message: "",
        propertyId: "",
        inquiryDate: new Date().toISOString().slice(0, 10),
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("Failed to submit inquiry.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Inquiry Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>User Name:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Select Property:</label>
          <select
            name="propertyId"
            value={formData.propertyId}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">-- Select Property --</option>
            {properties.map((property) => (
              <option key={property._id} value={property._id}>
                {property.propertyName}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "4px" }}>
          Submit Inquiry
        </button>
      </form>
    </div>
  );
};

export default InquiryForm;

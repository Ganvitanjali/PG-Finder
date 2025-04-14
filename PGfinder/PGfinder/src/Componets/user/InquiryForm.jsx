import React, { useEffect, useState } from "react";
import axios from "axios";

const InquiryForm = () => {
  const [properties, setProperties] = useState([]); // ✅ Initialize as empty array
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    propertyId: "",
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:3000/property/getAllproperties");
        setProperties(response.data.data); // Make sure your API returns data.data
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/inquiry/add", formData);
      alert("Inquiry submitted successfully!");
      // Reset the form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        propertyId: "",
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("Failed to submit inquiry.");
    }
  };

  return (
    <div className="inquiry-form-container">
      <h2>Inquiry Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Select Property:</label>
          <select
            name="propertyId"
            value={formData.propertyId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a Property --</option>
            {properties?.map((property) => (
              <option key={property._id} value={property._id}>
                {property.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Inquiry</button>
      </form>
    </div>
  );
};

export default InquiryForm;

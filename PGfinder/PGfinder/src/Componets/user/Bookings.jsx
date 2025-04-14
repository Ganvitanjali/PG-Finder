import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookPG = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pgData, setPgData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    bookingDate: "",
  });

  useEffect(() => {
    const fetchPGDetails = async () => {
      try {
        const res = await axios.get(`/property/getproperty/${id}`);
        setPgData(res.data.data);
      } catch (err) {
        console.error("Error loading PG details", err);
      }
    };
    fetchPGDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const bookingPayload = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        bookingDate: formData.bookingDate,
        pgLocation: pgData?.address || "N/A",
        pgId: id,
        email: formData.email,
      };

      // 1. Backend save
      await axios.post("/booking/bookings", bookingPayload);

      // 2. LocalStorage save
      const existingBookings = JSON.parse(localStorage.getItem("pgBookings")) || [];
      const updatedBookings = [...existingBookings, bookingPayload];
      localStorage.setItem("pgBookings", JSON.stringify(updatedBookings));

      alert("Booking successful!");
      navigate("/");
    } catch (err) {
      alert("Booking failed. Please try again.");
      console.error("Booking Error:", err);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>Book PG</h2>

      {pgData && (
        <>
          <h3>{pgData.propertyName}</h3>
          <p>📍 {pgData.address}</p>
          <p>💰 ₹{pgData.basePrice}/month</p>
        </>
      )}

      <form onSubmit={handleBooking}>
        <input
          type="text"
          name="fullName"
          placeholder="Your Name"
          required
          value={formData.fullName}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Your Phone Number"
          required
          value={formData.phoneNumber}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
        <input
          type="date"
          name="bookingDate"
          required
          value={formData.bookingDate}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            width: "100%",
            fontSize: "16px",
          }}
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookPG;

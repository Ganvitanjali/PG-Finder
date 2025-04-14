import React, { useEffect, useState } from "react";
import axios from "axios";

const AgentBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch Bookings API
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/booking/bookings");
      setBookings(response.data.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Handle Status Change
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/booking/bookings/${bookingId}/status`, {
        status: newStatus,
      });
      // Update status locally
      const updatedBookings = bookings.map((booking) => {
        if (booking._id === bookingId) {
          return { ...booking, status: newStatus };
        }
        return booking;
      });
      setBookings(updatedBookings);
      alert("Status updated successfully");
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  // Styles
  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px",
  };

  const headingStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
  };

  const tableContainerStyle = {
    overflowX: "auto",
  };

  const tableStyle = {
    width: "100%",
    backgroundColor: "white",
    borderCollapse: "collapse",
  };

  const thTdStyle = {
    padding: "12px",
    border: "1px solid #ccc",
    textAlign: "left",
  };

  const selectStyle = {
    padding: "4px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const noDataStyle = {
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Agent Bookings</h2>
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Full Name</th>
              <th style={thTdStyle}>Email</th>
              <th style={thTdStyle}>Phone Number</th>
              <th style={thTdStyle}>PG Location</th>
              <th style={thTdStyle}>Booking Date</th>
              <th style={thTdStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td style={thTdStyle}>{booking.fullName}</td>
                  <td style={thTdStyle}>{booking.email}</td>
                  <td style={thTdStyle}>{booking.phoneNumber}</td>
                  <td style={thTdStyle}>{booking.pgLocation}</td>
                  <td style={thTdStyle}>
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>
                  <td style={thTdStyle}>
                    <select
                      value={booking.status || "Pending"}
                      onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                      style={selectStyle}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={{ ...thTdStyle, ...noDataStyle }} colSpan="6">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentBooking;

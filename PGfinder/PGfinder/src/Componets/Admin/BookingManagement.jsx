import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch all bookings API
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/booking/bookings");
      setBookings(response.data.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Handle status change by Admin
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
      alert("Booking status updated successfully!");
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
        Manage Bookings (Admin)
      </h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", backgroundColor: "white", borderCollapse: "collapse", border: "1px solid #ccc" }}>
          <thead>
            <tr>
              {["Full Name", "Email", "Phone Number", "PG Location", "Booking Date", "Status"].map((header) => (
                <th
                  key={header}
                  style={{
                    padding: "8px 16px",
                    border: "1px solid #ccc",
                    backgroundColor: "#f9f9f9",
                    textAlign: "left"
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td style={{ padding: "8px 16px", border: "1px solid #ccc" }}>{booking.fullName}</td>
                  <td style={{ padding: "8px 16px", border: "1px solid #ccc" }}>{booking.email}</td>
                  <td style={{ padding: "8px 16px", border: "1px solid #ccc" }}>{booking.phoneNumber}</td>
                  <td style={{ padding: "8px 16px", border: "1px solid #ccc" }}>{booking.pgLocation}</td>
                  <td style={{ padding: "8px 16px", border: "1px solid #ccc" }}>
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "8px 16px", border: "1px solid #ccc" }}>
                    <select
                      value={booking.status || "Pending"}
                      onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "4px 8px",
                        cursor: "pointer"
                      }}
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
                <td
                  style={{ padding: "8px 16px", border: "1px solid #ccc", textAlign: "center" }}
                  colSpan="6"
                >
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

export default BookingManagement;

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalPropertys: 0,
    totalBookings: 0,
    pendingInquiries: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("/admindashborad/dashboarddata");
      if (response.data.success) {
        setDashboardData(response.data);
      } else {
        console.error("Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    padding: "24px",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
    textAlign: "center",
  };

  const headingStyle = {
    fontSize: "28px", // thoda chhota kar diya
    fontWeight: "bold",
    marginBottom: "24px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", // box size chhota kar diya
    gap: "16px",
    justifyContent: "center", // center mein la diya
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "12px", // thoda chhota radius
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // light shadow
    padding: "16px", // kam padding
    textAlign: "center",
    minHeight: "120px", // chhota box height
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const cardTitleStyle = {
    fontSize: "16px", // thoda chhota font
    fontWeight: "600",
    color: "#374151",
    marginBottom: "4px",
  };

  const cardValueStyle = (color) => ({
    fontSize: "22px", // thoda chhota value font
    fontWeight: "bold",
    color: color,
  });

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Agent Dashboard</h1>

      {loading ? (
        <p style={{ fontSize: "16px" }}>Loading...</p>
      ) : (
        <div style={gridStyle}>
          <div style={cardStyle}>
            <h2 style={cardTitleStyle}>Total Users</h2>
            <p style={cardValueStyle("#2563eb")}>{dashboardData.totalUsers}</p>
          </div>

          <div style={cardStyle}>
            <h2 style={cardTitleStyle}>Total PGs</h2>
            <p style={cardValueStyle("#16a34a")}>{dashboardData.totalPropertys}</p>
          </div>

          <div style={cardStyle}>
            <h2 style={cardTitleStyle}>Total Bookings</h2>
            <p style={cardValueStyle("#7c3aed")}>{dashboardData.totalBookings}</p>
          </div>

          <div style={cardStyle}>
            <h2 style={cardTitleStyle}>Pending Inquiries</h2>
            <p style={cardValueStyle("#dc2626")}>{dashboardData.pendingInquiries}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaBars, FaHome, FaList, FaCalendarCheck, FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🔹 Navbar Toggle Button (Only Show When Sidebar is Closed) */}
      {!isOpen && (
        <button
          style={{
            position: "fixed",
            top: "15px",
            right: "20px",
            background: "#2C3E50",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            zIndex: 3000,
          }}
          onClick={() => setIsOpen(true)}
        >
          <FaBars size={22} />
        </button>
      )}

      {/* 🔹 Sidebar */}
      <div
        style={{
          background: "#fff",
          color: "#000",
          width: "250px",
          height: "100vh",
          position: "fixed",
          top: "0",
          right: "0",
          overflowY: "auto",
          transition: "transform 0.3s ease-in-out",
          boxShadow: "-5px 0 10px rgba(0,0,0,0.2)",
          zIndex: "2000",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* 🔹 Sidebar Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 15px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <h3
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#666",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            🏠 PG Stay Hub
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "#333",
              cursor: "pointer",
            }}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* 🔹 Sidebar Menu */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ padding: "12px 15px", display: "flex", alignItems: "center", gap: "10px" }}>
            <Link to="dashboard" style={{ color: "#333", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
              <FaHome /> Dashboard
            </Link>
          </li>
          <li style={{ padding: "12px 15px", display: "flex", alignItems: "center", gap: "10px" }}>
            <Link to="users" style={{ color: "#333", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
              <FaList /> User Management
            </Link>
          </li>
          
          <li style={{ padding: "12px 15px", display: "flex", alignItems: "center", gap: "10px" }}>
            <Link to="bookings" style={{ color: "#333", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
              <FaCog /> Booking Management
            </Link>
          </li>
          <li style={{ padding: "12px 15px", display: "flex", alignItems: "center", gap: "10px" }}>
            <Link to="inquiries" style={{ color: "#333", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
              <FaCalendarCheck /> Inquiry Management
            </Link>
          </li>
          <li style={{ padding: "12px 15px", display: "flex", alignItems: "center", gap: "10px" }}>
            <Link to="pgs" style={{ color: "#333", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
              <FaUser /> PG Management
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;

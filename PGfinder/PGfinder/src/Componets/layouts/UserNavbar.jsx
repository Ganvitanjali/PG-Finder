import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // 🔹 Handle Search Input Change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log("Searching for:", event.target.value);
  };

  return (
    <div style={navbarStyle}>
      <h2 style={logoStyle}>PG Finder</h2>

      {/* 🔹 Search Bar */}
      {/* <div style={searchContainer}>
        <input
          type="text"
          placeholder="Search PGs..."
          style={searchBoxStyle}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div> */}

      {/* 🔹 Icons Section */}
      <div style={iconContainer}>
        {/* 🔹 Favorites Link */}
        <Link to="/favourites" style={iconStyle}>🤍</Link>

        {/* 🔹 Notifications Link */}
        <Link to="/notifications" style={iconStyle}>🔔</Link>

        {/* 🔹 Signup Button Only (Login Removed) */}
        <Link to="/signup" style={signupButtonStyle}>Signup</Link>
      </div>
    </div>
  );
};

// ✅ Navbar Styling
const navbarStyle = {
  background: "#2C3E50",
  color: "#FFFFFF",
  padding: "10px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "50px",
  zIndex: 1050,
};

const logoStyle = {
  fontSize: "22px",
  fontWeight: "bold",
};

const searchContainer = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  maxWidth: "500px",
};

const searchBoxStyle = {
  padding: "7px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  width: "100%",
  maxWidth: "400px",
  outline: "none",
};

const iconContainer = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginRight: "100px",
};

const iconStyle = { 
  cursor: "pointer", 
  fontSize: "22px",
  color: "white",
  textDecoration: "none",
};

// ✅ Signup Button Styling
const signupButtonStyle = {
  background: "#27ae60", // Green Color
  color: "white",
  padding: "8px 15px",
  borderRadius: "5px",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  transition: "background 0.3s",
};

export default Navbar;

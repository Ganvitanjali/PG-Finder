import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./UserSidebar";
import Navbar from "./UserNavbar";

const UserLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      <div style={{ flex: 1 }}>
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div style={{ padding: "80px 20px", background: "#f4f6f9", minHeight: "100vh" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;

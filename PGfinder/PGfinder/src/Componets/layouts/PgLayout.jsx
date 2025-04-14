import React from "react";
import { Outlet } from "react-router-dom";
import PGSidebar from "./PGSidebar";
import PGNavbar from "./PGNavbar";


const PgLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <PGSidebar />

      <div style={{ flex: 1 }}>
        {/* Navbar */}
        <PGNavbar />

        {/* Page Content */}
        <div style={{ padding: "80px 20px", background: "#f4f6f9", minHeight: "100vh" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PgLayout;

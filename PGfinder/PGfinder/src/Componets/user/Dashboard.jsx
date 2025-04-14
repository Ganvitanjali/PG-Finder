import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import UserNavbar from "../layouts/UserNavbar";


export default function Dashboard() {
  return (
    <>
      {/* User Navbar */}
      <UserNavbar />

      {/* Sidebar */}
      <aside
        className="app-sidebar bg-body-secondary shadow"
        data-bs-theme="dark"
        style={{
          width: "250px",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          padding: "20px",
          overflowY: "auto",
          backgroundColor: "#343a40",
          color: "#fff",
        }}
      >
        <div className="sidebar-brand" style={{ textAlign: "center", marginBottom: "20px" }}>
          <NavLink to="/" className="brand-link" style={{ textDecoration: "none", color: "white" }}>
            <img
              src="../../dist/assets/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              style={{ width: "40px", marginRight: "10px" }}
            />
            <span className="brand-text fw-light">AdminLTE 4</span>
          </NavLink>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className="nav sidebar-menu" style={{ listStyle: "none", padding: "0" }}>
            <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link active">
              <i className="nav-icon bi bi-speedometer" />
              <p> Dashboard <i className="nav-arrow bi bi-chevron-right" /></p>
            </NavLink>

            </li>
            <li className="nav-item">
              <NavLink
                to="/pg-listings"
                className="nav-link"
                style={{ display: "block", padding: "10px", color: "#fff", textDecoration: "none" }}
              >
                <i className="bi bi-house-door" style={{ marginRight: "10px" }} />
                PG Listings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/bookings"
                className="nav-link"
                style={{ display: "block", padding: "10px", color: "#fff", textDecoration: "none" }}
              >
                <i className="bi bi-calendar-check" style={{ marginRight: "10px" }} />
                Bookings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/settings"
                className="nav-link"
                style={{ display: "block", padding: "10px", color: "#fff", textDecoration: "none" }}
              >
                <i className="bi bi-gear" style={{ marginRight: "10px" }} />
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        style={{
          marginLeft: "250px",
          padding: "20px",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Outlet />
      </main>
    </>
  );
}

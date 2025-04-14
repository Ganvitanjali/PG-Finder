// import { Outlet, Link } from "react-router-dom";

// const AdminLayout = () => {
//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       {/* Sidebar */}
//       <div style={{
//         width: "250px",
//         background: "#2c3e50",
//         color: "white",
//         padding: "20px",
//         display: "flex",
//         flexDirection: "column"
//       }}>
//         <h2 style={{ textAlign: "center" }}>Admin Panel</h2>
//         <nav>
//           <ul style={{ listStyle: "none", padding: 0 }}>
//             <li><Link to="/admin/dashboard" style={linkStyle}>Dashboard</Link></li>
//             <li><Link to="/admin/users" style={linkStyle}>User Management</Link></li>
//             <li><Link to="/admin/pgs" style={linkStyle}>PG Management</Link></li>
//             <li><Link to="/admin/bookings" style={linkStyle}>Booking Management</Link></li>
//             <li><Link to="/admin/inquiries" style={linkStyle}>Inquiry Management</Link></li>
//           </ul>
//         </nav>
//       </div>

//       {/* Content Area */}
//       <div style={{ flex: 1, padding: "20px" }}>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// // Style for Links
// const linkStyle = {
//   color: "white",
//   textDecoration: "none",
//   display: "block",
//   padding: "10px",
//   borderRadius: "5px"
// };

// export default AdminLayout;


import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";


const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <AdminSidebar />

      <div style={{ flex: 1 }}>
        {/* Navbar */}
        <AdminNavbar />

        {/* Page Content */}
        <div style={{ padding: "80px 20px", background: "#f4f6f9", minHeight: "100vh" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

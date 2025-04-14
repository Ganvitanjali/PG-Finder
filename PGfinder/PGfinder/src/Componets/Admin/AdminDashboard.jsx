// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [dashboardData, setDashboardData] = useState({
//     totalUsers: 0,
//     totalPropertys: 0,
//     totalBookings: 0,
//     pendingInquiries: 0
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const response = await axios.get("/admindashborad/dashboarddata");
//       if (response.data.success) {
//         setDashboardData(response.data);
//       } else {
//         console.error("Failed to fetch dashboard data");
//       }
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const containerStyle = {
//     padding: "24px",
//     backgroundColor: "#f3f4f6",
//     minHeight: "100vh",
//     textAlign: "center",
//   };

//   const headingStyle = {
//     fontSize: "28px", // thoda chhota kar diya
//     fontWeight: "bold",
//     marginBottom: "24px",
//   };

//   const gridStyle = {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", // box size chhota kar diya
//     gap: "16px",
//     justifyContent: "center", // center mein la diya
//   };

//   const cardStyle = {
//     backgroundColor: "#ffffff",
//     borderRadius: "12px", // thoda chhota radius
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // light shadow
//     padding: "16px", // kam padding
//     textAlign: "center",
//     minHeight: "120px", // chhota box height
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//   };

//   const cardTitleStyle = {
//     fontSize: "16px", // thoda chhota font
//     fontWeight: "600",
//     color: "#374151",
//     marginBottom: "4px",
//   };

//   const cardValueStyle = (color) => ({
//     fontSize: "22px", // thoda chhota value font
//     fontWeight: "bold",
//     color: color,
//   });

//   return (
//     <div style={containerStyle}>
//       <h1 style={headingStyle}>Agent Dashboard</h1>

//       {loading ? (
//         <p style={{ fontSize: "16px" }}>Loading...</p>
//       ) : (
//         <div style={gridStyle}>
//           <div style={cardStyle}>
//             <h2 style={cardTitleStyle}>Total Users</h2>
//             <p style={cardValueStyle("#2563eb")}>{dashboardData.totalUsers}</p>
//           </div>

//           <div style={cardStyle}>
//             <h2 style={cardTitleStyle}>Total PGs</h2>
//             <p style={cardValueStyle("#16a34a")}>{dashboardData.totalPropertys}</p>
//           </div>

//           <div style={cardStyle}>
//             <h2 style={cardTitleStyle}>Total Bookings</h2>
//             <p style={cardValueStyle("#7c3aed")}>{dashboardData.totalBookings}</p>
//           </div>

//           <div style={cardStyle}>
//             <h2 style={cardTitleStyle}>Pending Inquiries</h2>
//             <p style={cardValueStyle("#dc2626")}>{dashboardData.pendingInquiries}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // Registering ArcElement for pie charts
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalPropertys: 0,
    totalBookings: 0,
    pendingInquiries: 0,
    propertyList: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("/admindashborad/dashboarddata");  // Adjust your API endpoint here
      if (response.data.success) {
        setDashboardData({
          totalUsers: response.data.totalUsers,
          totalPropertys: response.data.totalPropertys,
          totalBookings: response.data.totalBookings,
          pendingInquiries: response.data.pendingInquiries,
          propertyList: response.data.propertyList || [],
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Bookings Chart Data (Pie Chart)
  const bookingsChartData = {
    labels: dashboardData.propertyList.map((property) => property.name || "Unknown"),
    datasets: [
      {
        data: dashboardData.propertyList.map(
          (property) => property.bookingsCount || 0  // Default to 0 if bookingsCount is undefined
        ),
        backgroundColor: ["#7c3aed", "#16a34a", "#2563eb", "#dc2626"], // Dynamic colors
        borderWidth: 1,
      },
    ],
  };

  // Property Chart Data (Bar Chart)
  const propertyChartData = {
    labels: dashboardData.propertyList.map((property) => property.name || "Unknown"),
    datasets: [
      {
        label: "Properties",
        data: dashboardData.propertyList.map(() => 1), // Count 1 for each property
        backgroundColor: "#16a34a",
        borderWidth: 1,
      },
    ],
  };

  // Styling
  const containerStyle = {
    padding: "24px",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
    textAlign: "center",
  };

  const headingStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "24px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    justifyContent: "center",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "16px",
    textAlign: "center",
    minHeight: "120px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const cardTitleStyle = {
    fontSize: "16px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "4px",
  };

  const cardValueStyle = (color) => ({
    fontSize: "22px",
    fontWeight: "bold",
    color: color,
  });

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Admin Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Dashboard Stats */}
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

          {/* Bookings Chart */}
          <div>
            <h2 style={headingStyle}>Bookings Chart</h2>
            <div style={{ width: "500px", height: "400px", margin: "0 auto" }}>
              {dashboardData.propertyList.length > 0 ? (
                <Pie data={bookingsChartData} />
              ) : (
                <p>No booking data available</p>
              )}
            </div>
          </div>

          {/* Property Chart */}
          <div>
            <h2 style={headingStyle}>Property Chart</h2>
            <div style={{ width: "500px", height: "400px", margin: "0 auto" }}>
              <Bar data={propertyChartData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

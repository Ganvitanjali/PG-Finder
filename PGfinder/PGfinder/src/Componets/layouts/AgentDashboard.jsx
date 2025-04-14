import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AgentDashboard = () => {
  const [pgs, setPgs] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const agentId = localStorage.getItem("id"); // ✅ Agent ka ID localStorage se lo

  useEffect(() => {
    getAgentPGs();
    getAgentEarnings();
  }, []);

  // ✅ Get PGs Listed by Agent
  const getAgentPGs = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/pgs/agent/${agentId}`);
      setPgs(response.data.pgs);
    } catch (error) {
      console.error("Error fetching PGs:", error);
    }
  };

  // ✅ Get Agent Earnings
  const getAgentEarnings = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/earnings/${agentId}`);
      setEarnings(response.data.totalEarnings);
    } catch (error) {
      console.error("Error fetching earnings:", error);
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Agent Panel</h2>
        <nav>
          <ul style={styles.navList}>
            <li><Link to="/agent/dashboard" style={styles.navItem}>Dashboard</Link></li>
            <li><Link to="/agent/add-pg" style={styles.navItem}>Add PG</Link></li>
            <li><Link to="/agent/my-pgs" style={styles.navItem}>My PGs</Link></li>
            <li><Link to="/agent/bookings" style={styles.navItem}>Bookings</Link></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h2 style={styles.heading}>Welcome, Agent!</h2>
        
        {/* Earnings Card */}
        <div style={styles.card}>
          <h3>Total Earnings</h3>
          <p>₹{earnings}</p>
        </div>

        {/* PG Listings */}
        <h3>My PG Listings</h3>
        <div style={styles.pgList}>
          {pgs.length > 0 ? (
            pgs.map((pg) => (
              <div key={pg._id} style={styles.pgCard}>
                <img src={pg.image} alt="PG" style={styles.pgImage} />
                <h4>{pg.propertyName}</h4>
                <p>Rent: ₹{pg.basePrice}</p>
                <Link to={`/updatepg/${pg._id}`} style={styles.editBtn}>Edit</Link>
              </div>
            ))
          ) : (
            <p>No PGs found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: { display: "flex", height: "100vh" },
  sidebar: { width: "250px", background: "#2c3e50", color: "white", padding: "20px" },
  logo: { textAlign: "center" },
  navList: { listStyle: "none", padding: 0 },
  navItem: { color: "white", textDecoration: "none", display: "block", padding: "10px" },
  mainContent: { flex: 1, padding: "20px" },
  heading: { fontSize: "24px", marginBottom: "20px" },
  card: { padding: "20px", background: "#007bff", color: "white", borderRadius: "8px", marginBottom: "20px" },
  pgList: { display: "flex", gap: "20px", flexWrap: "wrap" },
  pgCard: { padding: "10px", border: "1px solid #ddd", borderRadius: "8px", width: "250px" },
  pgImage: { width: "100%", height: "150px", borderRadius: "8px" },
  editBtn: { display: "block", background: "#28a745", color: "white", textAlign: "center", padding: "10px", borderRadius: "5px", marginTop: "10px" },
};

export default AgentDashboard;

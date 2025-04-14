import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CustLoder } from "../common/CustLoder";

const PgManagement = () => {
  const [pgs, setPgs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPgs = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/property/getallproperties");
      setPgs(res.data.data);
    } catch (error) {
      console.error("Error fetching PGs:", error);
    }
    setIsLoading(false);
  };

  const deletePg = async (id) => {
    if (window.confirm("Are you sure you want to delete this PG?")) {
      try {
        await axios.delete(`/property/deleteproperty/${id}`);
        setPgs(pgs.filter((pg) => pg._id !== id));
        alert("PG deleted successfully");
      } catch (error) {
        console.error("Error deleting PG:", error);
        alert("Failed to delete PG");
      }
    }
  };

  useEffect(() => {
    fetchPgs();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#ffffff", minHeight: "100vh" }}>
      {isLoading && <CustLoder />}
      <h3 style={{ marginBottom: "20px", fontWeight: "bold", color: "#333" }}>PG MANAGEMENT</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", overflow: "hidden" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0", color: "#333" }}>
            <th style={{ padding: "12px", border: "1px solid #e0e0e0" }}>Property Name</th>
            <th style={{ padding: "12px", border: "1px solid #e0e0e0" }}>Image</th>
            <th style={{ padding: "12px", border: "1px solid #e0e0e0" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {pgs?.map((pg) => (
            <tr key={pg._id} style={{ backgroundColor: "#ffffff", color: "#333" }}>
              <td style={{ padding: "10px", border: "1px solid #e0e0e0" }}>{pg.propertyName}</td>
              <td style={{ padding: "10px", border: "1px solid #e0e0e0" }}>
                <img
                  style={{ height: "100px", width: "100px", borderRadius: "5px", objectFit: "cover" }}
                  src={pg?.image}
                  alt="Property"
                />
              </td>
              <td style={{ padding: "10px", border: "1px solid #e0e0e0" }}>
                <Link
                  to={`/pglayout/updatepg/${pg._id}`}
                  style={{
                    textDecoration: "none",
                    padding: "6px 12px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    borderRadius: "5px",
                    fontWeight: "500",
                  }}
                >
                  UPDATE
                </Link>
                <button
                  style={{
                    marginLeft: "10px",
                    padding: "6px 12px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => deletePg(pg._id)}
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PgManagement;

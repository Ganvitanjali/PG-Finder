import React, { useEffect, useState } from "react";
import axios from "axios";

const ExplorePG = () => {
  const [pgs, setPgs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPg, setSelectedPg] = useState(null);

  const fetchPgs = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/property/getallproperties");
      console.log("API Response:", res.data);
      setPgs(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching PGs:", error);
      setPgs([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPgs();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {isLoading && <div style={{ fontSize: "18px", color: "#666" }}>Loading...</div>}
      <h3 style={{ marginBottom: "20px", fontWeight: "bold" }}>EXPLORE PG</h3>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {pgs.length > 0 ? (
          pgs.map((pg) => (
            <div key={pg._id} style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "15px", textAlign: "left", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)", transition: "transform 0.3s", cursor: "pointer" }}>
              <img src={pg.image} alt="Property" style={{ width: "100%", height: "150px", borderRadius: "10px", objectFit: "cover" }} />
              <h4 style={{ marginTop: "10px", fontWeight: "bold" }}>{pg.propertyName}</h4>
              <p style={{ color: "#666" }}>📍 {pg.address}</p>
              <p style={{ fontWeight: "bold", color: "#28a745" }}>💰 ₹{pg.basePrice}/month</p>
              <button style={{ padding: "8px 15px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }} onClick={() => setSelectedPg(pg)}>
                View Details
              </button>
            </div>
          ))
        ) : (
          <p style={{ fontSize: "18px", color: "#666", fontWeight: "bold" }}>🚫 No PGs available</p>
        )}
      </div>

      {/* PG Details Modal */}
      {selectedPg && (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setSelectedPg(null)}>
          <div style={{ display: "flex", backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "left", maxWidth: "800px", width: "90%", boxShadow: "0px 4px 8px rgba(0,0,0,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ flex: 1, paddingRight: "20px" }}>
              <img src={selectedPg.image} alt="Property" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
            </div>
            <div style={{ flex: 1 }}>
              <h2>{selectedPg.propertyName}</h2>
              <p><strong>📍 Location:</strong> {selectedPg.address}</p>
              <p><strong>🏙 City:</strong> {selectedPg.cityId?.name || "N/A"}</p>
              <p><strong>🌎 State:</strong> {selectedPg.stateId?.name || "N/A"}</p>
              <p><strong>📮 Zipcode:</strong> {selectedPg.zipcode}</p>
              <p><strong>🛏 Bedrooms:</strong> {selectedPg.bedrooms} | 🛁 Bathrooms: {selectedPg.bathrooms}</p>
              <p><strong>🛋 Furnishing:</strong> {selectedPg.furnishingStatus}</p>
              <p><strong>📜 Description:</strong> {selectedPg.description}</p>
              <p><strong>🏗 Year Built:</strong> {selectedPg.yearBuilt}</p>
              <p><strong>💰 Price:</strong> ₹{selectedPg.basePrice}/month</p>
              <p><strong>⚡ Other Charges:</strong> {selectedPg.otherPriceDescription}</p>
              <button style={{ padding: "8px 15px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }} onClick={() => setSelectedPg(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplorePG;

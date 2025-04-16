import React, { useEffect, useState } from "react";
import axios from "axios";
import { CustLoder } from "../common/CustLoder";
import { useNavigate } from "react-router-dom";

const PGListing = () => {
  const [pgs, setPgs] = useState([]);
  const [filteredPgs, setFilteredPgs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPg, setSelectedPg] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const navigate = useNavigate();

  const fetchPgs = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/property/getallproperties");
      console.log("API Response:", res.data);
      setPgs(res.data.data);
      setFilteredPgs(res.data.data); // Set filtered PGs initially
    } catch (error) {
      console.error("Error fetching PGs:", error);
    }
    setIsLoading(false);
  };

  const toggleFavorite = (pg) => {
    const isFav = favorites.some((fav) => fav._id === pg._id);
    let updatedFavorites = isFav
      ? favorites.filter((fav) => fav._id !== pg._id)
      : [...favorites, pg];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleBooking = (pgId) => {
    localStorage.setItem("selectedPGId", pgId); // Store in local storage
    navigate(`bookings/${pgId}`); // Navigate to booking page
  };

  // Search functionality
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    const filtered = pgs.filter((pg) => {
      return (
        pg.propertyName.toLowerCase().includes(event.target.value.toLowerCase()) ||
        pg.address.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });
    setFilteredPgs(filtered);
  };

  useEffect(() => {
    fetchPgs();
    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavs);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {isLoading && <CustLoder />}
      <h3 style={{ marginBottom: "20px", fontWeight: "bold" }}>PG LISTINGS</h3>
      
      {/* Search Bar */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search PG by name or address..."
          value={searchQuery}
          onChange={handleSearch}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "500px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
      </div>

      {/* PG Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        {filteredPgs?.map((pg) => (
          <div
            key={pg._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "left",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
              position: "relative",
              backgroundColor: "#fff",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              style={{
                width: "100%",
                height: "200px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
              src={pg?.image}
              alt="Property"
            />
            <h4 style={{ marginTop: "10px", fontWeight: "bold" }}>
              {pg.propertyName}
            </h4>
            <p style={{ color: "#666" }}>📍 {pg.address}</p>
            <p style={{ fontWeight: "bold", color: "#28a745" }}>
              ₹{pg.basePrice}/month
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
              <button
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  flex: 1,
                  marginRight: "5px",
                  fontSize: "14px",
                }}
                onClick={() => setSelectedPg(pg)}
              >
                View Details
              </button>
              <button
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  flex: 1,
                  fontSize: "14px",
                }}
                onClick={() => handleBooking(pg._id)}
              >
                Book
              </button>
            </div>

            {/* ❤️ Favorite Icon */}
            <span
              onClick={() => toggleFavorite(pg)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontSize: "24px",
                cursor: "pointer",
                transition: "transform 0.3s",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {favorites.some((fav) => fav._id === pg._id) ? "❤️" : "🤍"}
            </span>
          </div>
        ))}
      </div>

      {/* PG Details Modal */}
      {selectedPg && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setSelectedPg(null)}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "left",
              maxWidth: "400px",
              width: "90%",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedPg.propertyName}</h2>
            <img
              src={selectedPg.image}
              alt="Property"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <p><strong>📍 Location:</strong> {selectedPg.address}</p>
            <p><strong>💰 Rent:</strong> ₹{selectedPg.basePrice}/month</p>
            <p><strong>🛏 Bedrooms:</strong> {selectedPg.bedrooms}</p>
            <p><strong>🛁 Bathrooms:</strong> {selectedPg.bathrooms}</p>
            <p><strong>🛋 Furnishing:</strong> {selectedPg.furnishingStatus}</p>
            <p><strong>🔧 Other Charges:</strong> {selectedPg.otherPriceDescription}</p>
            <p><strong>📅 Year Built:</strong> {selectedPg.yearBuilt}</p>
            <p><strong>📜 Description:</strong> {selectedPg.description}</p>
            <p><strong>📌 Status:</strong> {selectedPg.status}</p>

            <button
              style={{
                padding: "10px 15px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
                width: "100%",
              }}
              onClick={() => setSelectedPg(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PGListing;

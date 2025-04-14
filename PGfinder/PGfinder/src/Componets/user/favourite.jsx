import React, { useState, useEffect } from "react";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  // ✅ Load Favorite PGs from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // 🔹 Remove PG from Favorites
  const removeFavorite = (pgId) => {
    const updatedFavorites = favorites.filter((pg) => pg._id !== pgId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div style={containerStyle}>
      <h2>❤️ Favorite PGs</h2>
      {favorites.length > 0 ? (
        <div style={pgContainer}>
          {favorites.map((pg) => (
            <div key={pg._id} style={pgCardStyle}>
              <div style={imageContainer}>
                <img src={pg.image} alt={pg.propertyName} style={pgImageStyle} />
              </div>
              <h3>{pg.propertyName}</h3>
              <p>📍 {pg.address}</p>
              <p>💰 ₹{pg.basePrice}/month</p>

              {/* ✅ Remove Button */}
              <button style={removeButtonStyle} onClick={() => removeFavorite(pg._id)}>
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>🙁 No favorites added yet.</p>
      )}
    </div>
  );
};

// ✅ Styles (Same as PGListing.jsx)
const containerStyle = { padding: "20px", maxWidth: "800px", margin: "auto", textAlign: "center" };
const pgContainer = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" };
const pgCardStyle = { border: "1px solid #ddd", padding: "15px", borderRadius: "10px", boxShadow: "2px 2px 5px rgba(0,0,0,0.1)", textAlign: "center", position: "relative" };
const imageContainer = { position: "relative", display: "inline-block" };
const pgImageStyle = { width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" };
const removeButtonStyle = { background: "#e74c3c", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" };

export default Favorite;

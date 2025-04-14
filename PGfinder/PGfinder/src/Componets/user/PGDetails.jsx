import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PGDetails = () => {
  const { id } = useParams(); // ✅ URL se PG ki ID le rahe hain
  const [pg, setPg] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/property/getproperty/${id}`) // ✅ API call
      .then((res) => setPg(res.data))
      .catch((error) => console.error("Error fetching PG details:", error));
  }, [id]);

  if (!pg) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={styles.container}>
      <h1>{pg.title}</h1>
      <img src={pg.image} alt={pg.title} style={styles.pgImage} />
      
      <div style={styles.detailsBox}>
        <p><strong>🏠 Property Name:</strong> {pg.propertyName}</p>
        <p><strong>📍 Address:</strong> {pg.address}, {pg.zipcode}</p>
        <p><strong>🏙 City:</strong> {pg.cityId} | 🏛 State: {pg.stateId}</p>
        <p><strong>🛏 Bedrooms:</strong> {pg.bedrooms} | 🛁 Bathrooms: {pg.bathrooms}</p>
        <p><strong>🛋 Furnishing:</strong> {pg.furnishingStatus}</p>
        <p><strong>💰 Rent:</strong> ₹{pg.basePrice}/month</p>
        <p><strong>🔧 Other Charges:</strong> {pg.otherPriceDescription}</p>
        <p><strong>📅 Year Built:</strong> {pg.yearBuilt}</p>
        <p><strong>📜 Description:</strong> {pg.description}</p>
        <p><strong>📌 Status:</strong> {pg.status}</p>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px", textAlign: "center" },
  pgImage: { width: "100%", maxWidth: "500px", height: "300px", objectFit: "cover", borderRadius: "5px" },
  detailsBox: { marginTop: "20px", textAlign: "left", maxWidth: "600px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }
};

export default PGDetails;


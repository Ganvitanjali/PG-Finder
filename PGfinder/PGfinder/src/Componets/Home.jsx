// import React from "react";
// import { Link } from "react-router-dom";

// const HomePage = () => {
//   return (
//     <div style={containerStyle}>
//       {/* Hero Section */}
//       <div style={heroSection}>
//         <h1 style={heroTitle}>Find Your Perfect PG</h1>
//         <p style={heroText}>Discover the best PGs in your city with comfort and affordability.</p>
//         <Link to="/listings" style={exploreButton}>Explore PGs</Link>
//       </div>

//       {/* Featured PGs */}
//       <div style={sectionStyle}>
//         <h2 style={sectionTitle}>Featured PGs</h2>
//         <div style={pgContainer}>
//           {[1, 2, 3, 4].map((pg) => (
//             <div key={pg} style={pgCard}>
//               <img
//                 src="https://via.placeholder.com/300"
//                 alt="PG Preview"
//                 style={pgImage}
//               />
//               <h3>Luxury PG {pg}</h3>
//               <p>Location: City Center</p>
//               <p>Price: ₹5000/month</p>
//               <Link to="/details" style={viewDetails}>View Details</Link>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Why Choose Us Section */}
//       <div style={whyChooseSection}>
//         <h2 style={sectionTitle}>Why Choose PG Finder?</h2>
//         <div style={benefitsContainer}>
//           <div style={benefitCard}>
//             <h3>Verified Listings</h3>
//             <p>All PGs are verified to ensure safety and comfort.</p>
//           </div>
//           <div style={benefitCard}>
//             <h3>Affordable Prices</h3>
//             <p>We provide the best prices to fit your budget.</p>
//           </div>
//           <div style={benefitCard}>
//             <h3>24/7 Support</h3>
//             <p>Our team is available round-the-clock to assist you.</p>
//           </div>
//         </div>
//       </div>

//       {/* Testimonials */}
//       <div style={sectionStyle}>
//         <h2 style={sectionTitle}>What Our Users Say</h2>
//         <div style={testimonialContainer}>
//           <div style={testimonialCard}>
//             <p>"PG Finder helped me find a perfect PG in just a day! Highly recommended."</p>
//             <h4>- Rohan Sharma</h4>
//           </div>
//           <div style={testimonialCard}>
//             <p>"Great platform with verified listings and affordable prices!"</p>
//             <h4>- Priya Singh</h4>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer style={footerStyle}>
//         <div style={footerLinks}>
//           <Link to="/about" style={footerLink}>About Us</Link>
//           <Link to="/contact" style={footerLink}>Contact</Link>
//           <Link to="/privacy" style={footerLink}>Privacy Policy</Link>
//         </div>
//         <p style={footerText}>© 2025 PG Finder. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// // ✅ Inline Styles
// const containerStyle = { width: "100%", margin: "0", padding: "0" };
// const heroSection = { textAlign: "center", padding: "80px 20px", background: "#2C3E50", color: "#fff" };
// const heroTitle = { fontSize: "36px", marginBottom: "10px" };
// const heroText = { fontSize: "18px", marginBottom: "20px" };
// const exploreButton = { background: "#27ae60", padding: "10px 20px", color: "#fff", textDecoration: "none", borderRadius: "5px" };
// const sectionStyle = { padding: "60px 20px", textAlign: "center" };
// const sectionTitle = { fontSize: "28px", marginBottom: "20px" };
// const pgContainer = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" };
// const pgCard = { border: "1px solid #ddd", padding: "15px", borderRadius: "10px", textAlign: "center", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" };
// const pgImage = { width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px" };
// const viewDetails = { display: "block", marginTop: "10px", color: "#27ae60", textDecoration: "none", fontWeight: "bold" };
// const whyChooseSection = { background: "#f9f9f9", padding: "60px 20px", textAlign: "center" };
// const benefitsContainer = { display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" };
// const benefitCard = { width: "250px", padding: "20px", background: "#fff", borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" };
// const testimonialContainer = { display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" };
// const testimonialCard = { width: "300px", padding: "20px", background: "#fff", borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" };
// const footerStyle = { background: "#2C3E50", color: "#fff", textAlign: "center", padding: "20px 0", marginTop: "40px" };
// const footerLinks = { display: "flex", justifyContent: "center", gap: "20px", marginBottom: "10px" };
// const footerLink = { color: "#fff", textDecoration: "none", fontSize: "16px" };
// const footerText = { fontSize: "14px" };

// export default HomePage;


// HomePage.jsx

import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <div style={heroSection}>
        <h1 style={heroTitle}>Find Your Perfect PG</h1>
        <p style={heroText}>
          Discover the best PGs in your city with comfort and affordability.
        </p>
        <Link to="/listings" style={exploreButton}>
          Explore PGs
        </Link>
      </div>

      {/* Featured PGs */}
      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Featured PGs</h2>
        <div style={pgContainer}>
          {[1, 2, 3, 4].map((pg) => (
            <div key={pg} style={pgCard}>
              <img
                src="https://via.placeholder.com/300"
                alt="PG Preview"
                style={pgImage}
              />
              <h3>Luxury PG {pg}</h3>
              <p>Location: City Center</p>
              <p>Price: ₹5000/month</p>
              <Link to="/details" style={viewDetails}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div style={whyChooseSection}>
        <h2 style={sectionTitle}>Why Choose PG Finder?</h2>
        <div style={benefitsContainer}>
          <div style={benefitCard}>
            <h3>Verified Listings</h3>
            <p>All PGs are verified to ensure safety and comfort.</p>
          </div>
          <div style={benefitCard}>
            <h3>Affordable Prices</h3>
            <p>We provide the best prices to fit your budget.</p>
          </div>
          <div style={benefitCard}>
            <h3>24/7 Support</h3>
            <p>Our team is available round-the-clock to assist you.</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={sectionStyle}>
        <h2 style={sectionTitle}>What Our Users Say</h2>
        <div style={testimonialContainer}>
          <div style={testimonialCard}>
            <p>
              "PG Finder helped me find a perfect PG in just a day! Highly
              recommended."
            </p>
            <h4>- Rohan Sharma</h4>
          </div>
          <div style={testimonialCard}>
            <p>"Great platform with verified listings and affordable prices!"</p>
            <h4>- Priya Singh</h4>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={footerStyle}>
        <div style={footerLinks}>
          <Link to="/about" style={footerLink}>
            About Us
          </Link>
          <Link to="/contact" style={footerLink}>
            Contact
          </Link>
          <Link to="/privacy" style={footerLink}>
            Privacy Policy
          </Link>
        </div>
        <p style={footerText}>© 2025 PG Finder. All rights reserved.</p>
      </footer>
    </div>
  );
};

// ✅ Inline Styles
const containerStyle = {
  width: "100%",
  margin: "0",
  padding: "0",
  fontFamily: "Arial, sans-serif",
};

const heroSection = {
  textAlign: "center",
  padding: "80px 20px",
  background: "#2C3E50",
  color: "#fff",
};

const heroTitle = {
  fontSize: "36px",
  marginBottom: "10px",
};

const heroText = {
  fontSize: "18px",
  marginBottom: "20px",
};

const exploreButton = {
  background: "#27ae60",
  padding: "10px 20px",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "5px",
};

const sectionStyle = {
  padding: "60px 20px",
  textAlign: "center",
};

const sectionTitle = {
  fontSize: "28px",
  marginBottom: "30px",
};

const pgContainer = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "20px",
};

const pgCard = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "20px",
  width: "250px",
  textAlign: "center",
};

const pgImage = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "5px",
};

const viewDetails = {
  marginTop: "10px",
  display: "inline-block",
  background: "#3498db",
  color: "#fff",
  padding: "8px 12px",
  textDecoration: "none",
  borderRadius: "4px",
};

const whyChooseSection = {
  background: "#f9f9f9",
  padding: "60px 20px",
  textAlign: "center",
};

const benefitsContainer = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "20px",
};

const benefitCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "250px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};

const testimonialContainer = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "20px",
};

const testimonialCard = {
  background: "#f1f1f1",
  padding: "20px",
  borderRadius: "8px",
  width: "300px",
  fontStyle: "italic",
};

const footerStyle = {
  background: "#2C3E50",
  color: "#fff",
  padding: "20px 0",
  textAlign: "center",
};

const footerLinks = {
  marginBottom: "10px",
};

const footerLink = {
  color: "#fff",
  margin: "0 10px",
  textDecoration: "none",
};

const footerText = {
  fontSize: "14px",
};

export default HomePage;





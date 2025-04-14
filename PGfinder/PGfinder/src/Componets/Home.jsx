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

           {/* FAQ Section */}
<div style={{ padding: "50px 20px", backgroundColor: "#f9f9f9" }}>
  <h2 style={{ textAlign: "center", fontSize: "32px", color: "#333", marginBottom: "40px" }}>
    Frequently Asked Questions
  </h2>

  <div style={{ maxWidth: "900px", margin: "0 auto" }}>
    
    {/* Question 1 */}
    <div style={{ marginBottom: "20px", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h4 style={{ color: "#2c3e50", fontSize: "20px", marginBottom: "10px" }}>
        How do I book a PG through PG Finder?
      </h4>
      <p style={{ color: "#7f8c8d", fontSize: "16px" }}>
        To book a PG, simply browse through the listings, select the one that fits your requirements, and click on the 'Book Now' button. You can then fill out the necessary details to confirm your booking.
      </p>
    </div>

    {/* Question 2 */}
    <div style={{ marginBottom: "20px", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h4 style={{ color: "#2c3e50", fontSize: "20px", marginBottom: "10px" }}>
        Are the PGs listed on PG Finder verified?
      </h4>
      <p style={{ color: "#7f8c8d", fontSize: "16px" }}>
        Yes, all the PGs listed on PG Finder are verified to ensure safety, cleanliness, and reliability. Our team regularly checks the PGs to maintain quality standards.
      </p>
    </div>

    {/* Question 3 */}
    <div style={{ marginBottom: "20px", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h4 style={{ color: "#2c3e50", fontSize: "20px", marginBottom: "10px" }}>
        Can I contact the PG owners directly?
      </h4>
      <p style={{ color: "#7f8c8d", fontSize: "16px" }}>
        Yes, you can contact the PG owners directly through the contact details provided in the PG listing page. You can also use the booking system for further inquiries.
      </p>
    </div>

    {/* Question 4 */}
    <div style={{ marginBottom: "20px", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h4 style={{ color: "#2c3e50", fontSize: "20px", marginBottom: "10px" }}>
        Is PG Finder available in all cities?
      </h4>
      <p style={{ color: "#7f8c8d", fontSize: "16px" }}>
        Currently, PG Finder is available in major cities across India. We're expanding continuously to include more cities, so stay tuned!
      </p>
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





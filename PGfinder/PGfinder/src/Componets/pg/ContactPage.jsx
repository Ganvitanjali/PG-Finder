import React from "react";

const ContactPage = () => {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.contactContainer}>
        <h2 style={styles.heading}>📞 Contact Us</h2>
        <p style={styles.description}>We’d love to hear from you! Fill out the form below or reach us through our contact details.</p>
        
        <form style={styles.form}>
          <input type="text" placeholder="Your Name" style={styles.inputField} required />
          <input type="email" placeholder="Your Email" style={styles.inputField} required />
          <input type="text" placeholder="Subject" style={styles.inputField} required />
          <textarea placeholder="Your Message" style={styles.textarea} required></textarea>
          <button type="submit" style={styles.submitBtn}>Send Message</button>
        </form>

        <div style={styles.contactInfo}>
          <p><strong>Email:</strong> contact@yourwebsite.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Address:</strong> 123, Main Street, Your City, India</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f0f0f5",
  },
  contactContainer: {
    maxWidth: "600px",
    width: "100%",
    padding: "30px",
    background: "#fff",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    borderRadius: "12px",
    textAlign: "center",
  },
  heading: {
    fontSize: "26px",
    color: "#333",
    marginBottom: "10px",
  },
  description: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputField: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "16px",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "16px",
    outline: "none",
    minHeight: "120px",
    resize: "none",
  },
  submitBtn: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },
  submitBtnHover: {
    backgroundColor: "#0056b3",
  },
  contactInfo: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#444",
    textAlign: "left",
  },
};

export default ContactPage;

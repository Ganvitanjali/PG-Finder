import React from 'react';

const Contact = () => {
  const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    padding: '50px 20px',
    background: '#fefefe',
    textAlign: 'center',
    boxSizing: 'border-box',
  };

  const titleStyle = {
    fontSize: '3rem',
    color: '#333',
    marginBottom: '20px',
    fontWeight: 'bold',
  };

  const descriptionStyle = {
    width: '100%',
    maxWidth: '700px',
    margin: '0 auto 40px',
    fontSize: '1.2rem',
    color: '#555',
    lineHeight: '1.6',
  };

  const formStyle = {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'left',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    background: '#007bff',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '100%', // full width button
  };

  const sectionTitleStyle = {
    fontSize: '2rem',
    color: '#444',
    margin: '40px 0 20px',
    fontWeight: '600',
  };

  const infoStyle = {
    marginBottom: '10px',
    color: '#555',
    fontSize: '1rem',
  };

  const mapStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '8px',
    marginTop: '30px',
    border: 'none',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    // Future: yahan API ya EmailJS se connect kar sakte ho
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Contact Us</h1>
      <p style={descriptionStyle}>
        We'd love to hear from you! Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
      </p>

      {/* Contact Info */}
      <h2 style={sectionTitleStyle}>Our Contact Information</h2>
      <p style={infoStyle}><strong>Address:</strong> 123 PG Finder Street, Ahmedabad, Gujarat</p>
      <p style={infoStyle}><strong>Phone:</strong> +91 9876543210</p>
      <p style={infoStyle}><strong>Email:</strong> support@pgfinder.com</p>

      {/* Contact Form */}
      <h2 style={sectionTitleStyle}>Send Us a Message</h2>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label style={labelStyle}>Name</label>
        <input type="text" placeholder="Your Name" style={inputStyle} required />

        <label style={labelStyle}>Email</label>
        <input type="email" placeholder="Your Email" style={inputStyle} required />

        <label style={labelStyle}>Message</label>
        <textarea placeholder="Your Message" style={{ ...inputStyle, height: '120px' }} required />

        <button type="submit" style={buttonStyle}>Send Message</button>
      </form>

      {/* Map Embed */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.4053087077894!2d72.57136237519788!3d23.112844513310252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b383132128f%3A0x7654374c1c1ff717!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1712715256451!5m2!1sen!2sin"
        style={mapStyle}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default Contact;

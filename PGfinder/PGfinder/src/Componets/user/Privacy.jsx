import React from 'react';

const Privacy = () => {
  const containerStyle = {
    padding: '50px 20px',
    background: '#fefefe',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '3rem',
    color: '#333',
    marginBottom: '20px',
    fontWeight: 'bold',
  };

  const sectionTitleStyle = {
    fontSize: '2rem',
    color: '#444',
    margin: '40px 0 20px',
    fontWeight: '600',
  };

  const textStyle = {
    maxWidth: '800px',
    margin: '0 auto 20px',
    fontSize: '1.1rem',
    color: '#555',
    lineHeight: '1.8',
    textAlign: 'left',
  };

  const listStyle = {
    textAlign: 'left',
    maxWidth: '800px',
    margin: '0 auto 20px',
    color: '#555',
    lineHeight: '1.8',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Privacy Policy</h1>
      <p style={textStyle}>
        At PG Finder, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.
      </p>

      <h2 style={sectionTitleStyle}>Information We Collect</h2>
      <ul style={listStyle}>
        <li>Personal identification information (Name, email address, phone number, etc.)</li>
        <li>Usage data and cookies to improve your experience</li>
        <li>Location data to help you find PGs nearby</li>
      </ul>

      <h2 style={sectionTitleStyle}>How We Use Your Information</h2>
      <ul style={listStyle}>
        <li>To provide and maintain our services</li>
        <li>To notify you about changes to our services</li>
        <li>To provide customer support</li>
        <li>To monitor the usage of our service and improve it</li>
      </ul>

      <h2 style={sectionTitleStyle}>Your Data Protection Rights</h2>
      <p style={textStyle}>
        You have the right to access, update, or delete your personal information. If you wish to exercise any of these rights, please contact us.
      </p>

      <h2 style={sectionTitleStyle}>Third-Party Services</h2>
      <p style={textStyle}>
        We may employ third-party companies and individuals to facilitate our services. These third parties have access to your Personal Information only to perform tasks on our behalf.
      </p>

      <h2 style={sectionTitleStyle}>Changes to This Policy</h2>
      <p style={textStyle}>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
      </p>

      <h2 style={sectionTitleStyle}>Contact Us</h2>
      <p style={textStyle}>
        If you have any questions about this Privacy Policy, please contact us at support@pgfinder.com.
      </p>
    </div>
  );
};

export default Privacy;

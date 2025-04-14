import React from 'react';

const About = () => {
  const containerStyle = {
    padding: '50px 20px',
    background: '#f4f6f8',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '3rem',
    color: '#333',
    marginBottom: '20px',
    fontWeight: 'bold',
  };

  const descriptionStyle = {
    maxWidth: '700px',
    margin: '0 auto 40px',
    fontSize: '1.2rem',
    color: '#555',
    lineHeight: '1.6',
  };

  const sectionTitleStyle = {
    fontSize: '2rem',
    color: '#444',
    margin: '40px 0 20px',
    fontWeight: '600',
  };

  const cardsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '30px',
    marginBottom: '40px',
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '350px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    textAlign: 'left',
  };

  const cardHoverStyle = {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  };

  const [hoveredCard, setHoveredCard] = React.useState(null);

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>About Us</h1>
      <p style={descriptionStyle}>
        Welcome to our platform! We are passionate about connecting people with the best PG (Paying Guest) accommodations in town.
        Our mission is to simplify your search for a comfortable and affordable place to stay.
      </p>

      {/* Vision & Mission Section */}
      <div style={cardsContainerStyle}>
        <div
          style={{
            ...cardStyle,
            ...(hoveredCard === 'vision' ? cardHoverStyle : {}),
          }}
          onMouseEnter={() => setHoveredCard('vision')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h2>🌟 Our Vision</h2>
          <p>
            We envision a world where everyone can find safe and affordable accommodation with ease.
            Our goal is to bring transparency and convenience to the PG finding experience.
          </p>
        </div>

        <div
          style={{
            ...cardStyle,
            ...(hoveredCard === 'mission' ? cardHoverStyle : {}),
          }}
          onMouseEnter={() => setHoveredCard('mission')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h2>🚀 Our Mission</h2>
          <p>
            Our mission is to empower tenants and PG owners alike by providing a reliable, user-friendly platform that bridges the gap between supply and demand.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <h2 style={sectionTitleStyle}>Our Story</h2>
      <p style={descriptionStyle}>
        It all started with a simple idea — making it easier for students and professionals to find trustworthy PG accommodations.
        We understand the struggle of moving to a new city and finding a safe place to stay. That's why we built this platform, so you can focus on your dreams while we handle your stay.
      </p>

      {/* What We Offer */}
      <h2 style={sectionTitleStyle}>What We Offer</h2>
      <div style={cardsContainerStyle}>
        <div
          style={{
            ...cardStyle,
            ...(hoveredCard === 'verified' ? cardHoverStyle : {}),
          }}
          onMouseEnter={() => setHoveredCard('verified')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h3>✅ Verified Listings</h3>
          <p>
            All PGs are verified by our team to ensure you get safe and reliable accommodation.
          </p>
        </div>

        <div
          style={{
            ...cardStyle,
            ...(hoveredCard === 'support' ? cardHoverStyle : {}),
          }}
          onMouseEnter={() => setHoveredCard('support')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h3>🤝 24/7 Support</h3>
          <p>
            Our support team is always ready to assist you with any queries or concerns.
          </p>
        </div>

        <div
          style={{
            ...cardStyle,
            ...(hoveredCard === 'community' ? cardHoverStyle : {}),
          }}
          onMouseEnter={() => setHoveredCard('community')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h3>🏘️ Trusted Community</h3>
          <p>
            Join our community of happy tenants and reliable PG owners across the city.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

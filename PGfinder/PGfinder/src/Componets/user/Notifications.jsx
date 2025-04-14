import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  
  // Step 1: LocalStorage se userId le lo
  const id = localStorage.getItem('id');  // Ensure 'id' is stored in localStorage

  // Step 2: Fetch function banao
  const fetchNotifications = async () => {
    try {
      if (!id) {
        console.log("User ID not found in localStorage");
        return;
      }

      const response = await axios.get(`http://localhost:3000/notification/getnotificationsbyuser/${id}`);
      setNotifications(response.data.data);  // Ensure that 'data' contains the notifications
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Step 3: Component mount hone par call karo
  useEffect(() => {
    fetchNotifications();
  }, [id]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Your Notifications</h2>
      {notifications.length === 0 ? (
        <p style={{ textAlign: 'center', fontStyle: 'italic' }}>No notifications found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {notifications.map((notification) => (
            <li key={notification._id} style={{ 
              background: '#f4f4f4', 
              padding: '10px', 
              margin: '10px 0', 
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}>
              <strong style={{ fontSize: '1.1em', color: '#333' }}>
                {notification.title}
              </strong>
              <p style={{ marginTop: '5px', color: '#555' }}>
                {notification.message}
              </p>
              <small style={{ display: 'block', marginTop: '10px', color: '#888' }}>
                {new Date(notification.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;

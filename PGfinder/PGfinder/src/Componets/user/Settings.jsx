import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountSettings = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  // Fetch user profile data
  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing from localStorage");
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`/user/profile/${userId}`);
        setUser(response.data);
        localStorage.setItem("userData", JSON.stringify(response.data));
      } catch (error) {
        console.error("Failed to fetch user", error);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchUser();
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User ID is missing. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.put(`/user/profile/${userId}`, user);
      localStorage.setItem("userData", JSON.stringify(response.data));
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Account Settings</h2>
      <form onSubmit={handleSave}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={user.fullName}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={user.phoneNumber}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

// Styling object
const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "30px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    width: "100%",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default AccountSettings;

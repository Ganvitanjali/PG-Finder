import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    status: "",
  });

  const id = localStorage.getItem("id");
  console.log("User ID from localStorage:", id);

  useEffect(() => {
    if (!id) {
      console.error("User ID not found");
      return;
    }

    axios
      .get(`http://localhost:3000/user/${id}`)
      .then((response) => {
        const userData = response.data.data;
        console.log("Fetched user data:", userData);

        setUser({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          phone: userData.phone || "",
          status: userData.status || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedUser = {
      ...user,
      [name]: value,
    };

    console.log("Updated field:", name, "Value:", value);
    console.log("Current user state:", updatedUser);

    setUser(updatedUser);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    console.log("Sending updated user data to backend:", user);

    axios
      .put(`http://localhost:3000/users/${id}`, user)
      .then(() => {
        alert("Profile updated successfully!");
        console.log("Profile update successful");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
      });
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>User Profile</h2>
      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Phone:</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Status:</label>
          <input
            type="text"
            name="status"
            value={user.status}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;

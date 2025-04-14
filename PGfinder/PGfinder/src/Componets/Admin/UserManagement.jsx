import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [userData, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/users");
      console.log("Fetched Users:", response.data.data);
      if (response.data && response.data.data) {
        setUsers(response.data.data);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await axiosInstance.delete(`/user/${userId}`);
      if (response.data.success) {
        toast.success("User deleted successfully");
        fetchUsers();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const apiEndpoint =
        currentStatus === "active"
          ? `/block/${userId}`
          : `/unblock/${userId}`;
      const response = await axiosInstance.put(apiEndpoint);
      if (response.data.success) {
        toast.success(
          `User ${
            currentStatus === "active" ? "blocked" : "unblocked"
          } successfully`
        );
        fetchUsers();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Failed to update status");
    }
  };

  const filteredUsers = userData.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const thStyle = {
    padding: "12px",
    border: "1px solid #ddd",
    backgroundColor: "#f4f4f4",
  };
  const tdStyle = {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "16px" }}>
        User Management
      </h1>

      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "300px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td style={tdStyle}>
                    {user.firstName} {user.lastName}
                  </td>
                  <td style={tdStyle}>{user.email}</td>
                  <td style={tdStyle}>
                    {user.status === "active" ? "Active" : "Blocked"}
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() =>
                        handleToggleStatus(user._id, user.status)
                      }
                      style={{
                        marginRight: "8px",
                        padding: "6px 12px",
                        backgroundColor:
                          user.status === "active" ? "#f44336" : "#4CAF50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      {user.status === "active" ? "Block" : "Unblock"}
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#f44336",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={tdStyle} colSpan="4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;

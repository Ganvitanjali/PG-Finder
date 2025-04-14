import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleOtpChange = (e) => setOtp(e.target.value);
  const handlePasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOtpSent) {
      // Send OTP request
      try {
        const response = await axios.post("http://localhost:3000/user/forgotpassword", { email });
        setMessage(response.data.message);
        setIsOtpSent(true);
      } catch (error) {
        setMessage(error.response ? error.response.data.message : "Something went wrong");
      }
    } else if (!isOtpVerified) {
      // Verify OTP request
      try {
        const response = await axios.post("http://localhost:3000/user/verifyotp", {
          email,
          otp,
        });
        setMessage(response.data.message);
        setIsOtpVerified(true); // OTP is verified
      } catch (error) {
        setMessage(error.response ? error.response.data.message : "Something went wrong");
      }
    } else {
      // Reset password request
      if (newPassword !== confirmPassword) {
        setMessage("Passwords do not match.");
        return;
      }
      try {
        const response = await axios.post("http://localhost:3000/user/resetpassword", {
          email,
          newPassword,
        });
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response ? error.response.data.message : "Something went wrong");
      }
    }
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f7f7f7",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const messageStyle = {
    marginTop: "20px",
    fontSize: "16px",
    color: "red",
    textAlign: "center",
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: "center" }}>Forgot Password</h2>
        {!isOtpSent ? (
          <div>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Send OTP</button>
          </div>
        ) : !isOtpVerified ? (
          <div>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter OTP"
              required
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Verify OTP</button>
          </div>
        ) : (
          <div>
            <input
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter New Password"
              required
              style={inputStyle}
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm New Password"
              required
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Reset Password</button>
          </div>
        )}
      </form>
      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
};

export default ForgotPassword;

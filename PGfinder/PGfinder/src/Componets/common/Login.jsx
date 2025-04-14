import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  margin:0;
  padding:0;
  background: linear-gradient(135deg, #8e44ad, #3498db);
`;

const LoginWrapper = styled.div`
  display: flex;
  width: 900px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const LoginForm = styled.div`
  width: 50%;
  padding: 40px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f8f8f8;
  color: #333;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #6a11cb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 15px;
  &:hover {
    background-color: #4a078b;
  }
`;

const ImageSection = styled.div`
  width: 50%;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Illustration = styled.img`
  width: 110%;
  height: 110%;
`;

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [role, setRole] = useState("user");

  const submitHandler = async (data) => {
    try {
      const apiUrl =
        role === "admin"
          ? "http://localhost:3000/user/login"
          : "http://localhost:3000/user/login"; // ✅ Corrected API URL

      const res = await axios.post(apiUrl, data);

      if (res.status === 200) {
        alert("Login Success");

        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.role);

        if (res.data.data.role === "Admin") {
          navigate("/admin/dashboard"); // ✅ Redirect to Admin Dashboard
        } else if(res.data.data.role==="Agent"){
          navigate("/pglayout/dashboard"); // ✅ Redirect to Agent Dashboard
        }
        else {
          navigate("/"); // ✅ Redirect to User Dashboard
        }
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      console.log("Login Error:", error.response?.data || error.message);
      alert("Login Failed: " + (error.response?.data?.message || "Server Error"));
    }
  };

  return (
    <Container>
      <LoginWrapper>
        <LoginForm>
          <Title>Login</Title>
          

          <form onSubmit={handleSubmit(submitHandler)}>
            <label>Email Address</label>
            <Input type="text" {...register("email")} placeholder="you@example.com" required />

            <label>Password</label>
            <Input type="password" {...register("password")} placeholder="Enter 6 characters or more" required />

            <div style={{ textAlign: 'right', marginTop: '5px' }}>
             <span
               style={{ color: '#6a11cb', cursor: 'pointer', textDecoration: 'underline' }}
               onClick={() => navigate("/forgotpassword")}
              >
              Forgot Password?
              </span>
            </div>

            <Button type="submit">Login</Button>
          </form>

          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <p>Don't have an account? <a href="/signup" style={{ color: 'blue', textDecoration: 'none' }}>Sign Up</a></p>
          </div>
        </LoginForm>

        <ImageSection>
          <Illustration src="/placeholder-concept-illustration_114360-4983.avif" alt="Illustration" />
        </ImageSection>
      </LoginWrapper>
    </Container>
  );
};

export default Login;

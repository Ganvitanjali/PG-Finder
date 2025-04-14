import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #0052d4, #4364f7, #6fb1fc);
  transition: all 0.5s ease-in-out;
`;

const Wrapper = styled.div`
  display: flex;
  width: 1100px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const LeftPanel = styled.div`
  width: 50%;
  background: linear-gradient(to top, #0052d4, #4364f7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  color: white;
  text-align: center;
`;

const RightPanel = styled.div`
  width: 50%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-in-out;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #0052d4;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background: #4364f7;
  }
`;

const LinkText = styled.p`
  margin-top: 15px;
  font-size: 14px;
  text-align: center;
`;

const Link = styled.span`
  color: #0052d4;
  cursor: pointer;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    text-decoration: underline;
    color: #4364f7;
  }
`;

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Roles List
  const roles = [
    { id: "67eb59c3ddb76838c6523b67", name: "Admin" },
    { id: "67be98e3c77b7de8651d3ef1", name: "User" },
    { id: "67be98e3c77b7de8651d3ef2", name: "Agent" },
  ];

  const [selectedRole, setSelectedRole] = useState({ roleId: "", roleName: "" });

  const handleRoleChange = (e) => {
    const selectedId = e.target.value;
    const selected = roles.find(role => role.id === selectedId);
    setSelectedRole({
      roleId: selected?.id || "",
      roleName: selected?.name || ""
    });
  };

  const submitHandler = async (data) => {
    if (!selectedRole.roleId) {
      toast.error("Please select a role!");
      return;
    }

    try {
      const requestData = {
        ...data,
        roleId: selectedRole.roleId,
        role: selectedRole.roleName,
      };

      const response = await axios.post("http://localhost:3000/user", requestData);

      if (response.data) {
        toast.success(response.data.message || "User created successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Container>
      <Wrapper>
        <LeftPanel>
          <h1>Welcome!</h1>
          <p>Join us and explore endless possibilities.</p>
        </LeftPanel>

        <RightPanel>
          <Title>Create Account</Title>
          <form onSubmit={handleSubmit(submitHandler)}>
            <FormGroup>
              <Label>First Name</Label>
              <Input {...register("firstName", { required: "First name is required" })} />
              {errors.firstName && <p style={{ color: "red" }}>{errors.firstName.message}</p>}
            </FormGroup>

            <FormGroup>
              <Label>Last Name</Label>
              <Input {...register("lastName", { required: "Last name is required" })} />
              {errors.lastName && <p style={{ color: "red" }}>{errors.lastName.message}</p>}
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <Input type="email" {...register("email", { required: "Email is required" })} />
              {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
            </FormGroup>

            <FormGroup>
              <Label>Select Role</Label>
              <Select onChange={handleRoleChange} value={selectedRole.roleId}>
                <option value="">-- Select Role --</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </Select>
            </FormGroup>

            <Button type="submit">Sign Up</Button>
          </form>

          <LinkText>
            Already have an account? <Link onClick={() => navigate("/login")}>Login here</Link>
          </LinkText>
        </RightPanel>
      </Wrapper>
    </Container>
  );
};

export default SignUp;

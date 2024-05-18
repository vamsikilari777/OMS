import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const RegisterUserRoleModal = ({ show, onHide }) => {
  const [userRole, setUserRole] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    hospital_name: "",
    location: "",
  });

  const handleChange = (e) => {
    setUserRole({ ...userRole, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("${baseURL}/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRole),
      });
      if (response.ok) {
        alert("User registered successfully");
        onHide();
      } else {
        alert("Failed to register user");
        onHide();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Register New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formUserRoleName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={userRole.name}
              onChange={handleChange}
              required
            />
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              value={userRole.email}
              onChange={handleChange}
              required
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={userRole.password}
              onChange={handleChange}
              required
            />
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              placeholder="Mention role"
              name="role"
              value={userRole.role}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Label>Hospital Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter hospital name"
            name="hospital_name"
            value={userRole.hospital_name}
            onChange={handleChange}
            required
          />
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Location"
            name="location"
            value={userRole.location}
            onChange={handleChange}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Register User Role
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RegisterUserRoleModal;

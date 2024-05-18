import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../assets/css/RegisterModal.css";
import baseURL from "../config";

const ProfileModal = ({ show, onHide, user }) => {
  const [hospital, setHospital] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    mobile: "", // Add id field to state
  });

  useEffect(() => {
    if (user) {
      setHospital({
        username: user.username || "",
        email: user.email || "",
        password: user.password || "",
        confirm_password: user.confirm_password || "",
        mobile: user.mobile || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`${baseURL}/admin/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: hospital.username,
          email: hospital.email,
          password: hospital.password,
          confirm_password: hospital.confirm_password,
          mobile: hospital.mobile,
        }),
      });
      if (response.ok) {
        onHide();
        console.log("Successfully updated data");
      } else {
        console.error("Failed to update data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={(e) => handleUpdate(user.id)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form fields */}
          <Form.Group className="mb-3" controlId="formHospitalName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter FullName"
              name="username"
              value={hospital.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formHospitalNumber">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              value={hospital.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formHospitalEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              name="password"
              value={hospital.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formHospitalAddress">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Confirm Password"
              name="confirm_password"
              value={hospital.confirm_password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formHospitalAddress">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Mobile Number"
              name="mobile"
              value={hospital.mobile}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProfileModal;

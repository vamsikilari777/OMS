import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../assets/css/RegisterModal.css"; // Import custom CSS for modal backdrop blur

const RegisterHospitalModal = ({ show, onHide }) => {
  const [hospital, setHospital] = useState({
    name: "",
    address: "",
    phone_number: "",
  });

  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("${baseURL}/admin/hospitals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hospital),
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
          <Modal.Title>Register New Hospital</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formHospitalName">
            <Form.Label>Hospital Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter hospital name"
              name="name"
              value={hospital.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formHospitalAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={hospital.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formHospitalPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone number"
              name="phone_number"
              value={hospital.phone_number}
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
            Register Hospital
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RegisterHospitalModal;

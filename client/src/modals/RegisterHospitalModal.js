import React, { useState } from "react"; // Import React and the useState hook from React
import { Modal, Button, Form } from "react-bootstrap"; // Import Modal, Button, and Form components from react-bootstrap
import "../assets/css/RegisterModal.css"; // Import custom CSS for modal backdrop blur

// Define the RegisterHospitalModal functional component
const RegisterHospitalModal = ({ show, onHide }) => {
  // Initialize state for hospital details using the useState hook
  const [hospital, setHospital] = useState({
    name: "",
    address: "",
    phone_number: "",
  });

  // Function to handle input changes and update the hospital state
  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Send a POST request to register a new hospital
      const response = await fetch("${baseURL}/admin/hospitals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hospital),
      });
      if (response.ok) {
        // Alert success message and close the modal if registration is successful
        alert("Hospital registered successfully");
        onHide();
      } else {
        // Alert failure message and close the modal if registration fails
        alert("Failed to register hospital");
        onHide();
      }
    } catch (error) {
      // Log and alert an error message if the request fails
      console.error("Error:", error);
      alert("An error occurred");
      onHide();
    }
  };

  // Return the Modal component with a form to register a new hospital
  return (
    <Modal show={show} onHide={onHide} centered>
      {/* Form to handle hospital registration, on submit call handleSubmit */}
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Register New Hospital</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form group for the hospital name */}
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
          {/* Form group for the hospital address */}
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
          {/* Form group for the hospital phone number */}
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
          {/* Button to close the modal */}
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          {/* Button to submit the form and register the hospital */}
          <Button type="submit" variant="primary">
            Register Hospital
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

// Export the RegisterHospitalModal component as the default export
export default RegisterHospitalModal;

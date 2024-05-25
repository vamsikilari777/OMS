import React, { useState } from "react"; // Import React and the useState hook from React
import { Modal, Button, Form } from "react-bootstrap"; // Import Modal, Button, and Form components from react-bootstrap

// Define the RegisterUserRoleModal functional component
const RegisterUserRoleModal = ({ show, onHide }) => {
  // Initialize state for user role details using the useState hook
  const [userRole, setUserRole] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    hospital_name: "",
    location: "",
  });

  // Function to handle input changes and update the user role state
  const handleChange = (e) => {
    setUserRole({ ...userRole, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Send a POST request to register a new user role
      const response = await fetch("${baseURL}/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRole),
      });
      if (response.ok) {
        // Alert success message and close the modal if registration is successful
        alert("User registered successfully");
        onHide();
      } else {
        // Alert failure message and close the modal if registration fails
        alert("Failed to register user");
        onHide();
      }
    } catch (error) {
      // Log and alert an error message if the request fails
      console.error("Error:", error);
      alert("An error occurred");
      onHide();
    }
  };

  // Return the Modal component with a form to register a new user role
  return (
    <Modal show={show} onHide={onHide} centered>
      {/* Form to handle user role registration, on submit call handleSubmit */}
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Register New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form group for user role details */}
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
          {/* Input field for hospital name */}
          <Form.Label>Hospital Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter hospital name"
            name="hospital_name"
            value={userRole.hospital_name}
            onChange={handleChange}
            required
          />
          {/* Input field for location */}
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
          {/* Button to close the modal */}
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          {/* Button to submit the form and register the user role */}
          <Button type="submit" variant="primary">
            Register User Role
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

// Export the RegisterUserRoleModal component as the default export
export default RegisterUserRoleModal;

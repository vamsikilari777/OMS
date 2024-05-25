import React, { useState, useEffect } from "react"; // Import React and hooks from react
import { Modal, Button, Form } from "react-bootstrap"; // Import Modal, Button, and Form components from react-bootstrap
import "../assets/css/RegisterModal.css"; // Import custom CSS for the modal
import baseURL from "../config"; // Import the baseURL configuration

// Define the functional component named ProfileModal
const ProfileModal = ({ show, onHide, user }) => {
  // Define state for hospital details with useState hook
  const [hospital, setHospital] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    mobile: "", // Initialize mobile field
  });

  // useEffect hook to update the hospital state when the user prop changes
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

  // Function to handle input changes and update the hospital state
  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  // Function to handle the update request
  const handleUpdate = async (id) => {
    try {
      // Send a PUT request to update the user data
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
        // Close the modal on successful update
        onHide();
        console.log("Successfully updated data");
      } else {
        // Log an error message if the update fails
        console.error("Failed to update data:", response.statusText);
      }
    } catch (error) {
      // Log an error message if the request fails
      console.error("Error updating data:", error);
    }
  };

  // Return the Modal component with a form to update profile details
  return (
    <Modal show={show} onHide={onHide} centered>
      {/* Form to handle user profile updates, on submit call handleUpdate */}
      <Form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          handleUpdate(user.id); // Call handleUpdate with user id
        }}
      >
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
              placeholder="Enter Password"
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
          {/* Button to close the modal */}
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          {/* Button to submit the form and update the profile */}
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

// Export the ProfileModal component as the default export
export default ProfileModal;

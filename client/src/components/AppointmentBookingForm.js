// Importing necessary modules and components from React and React Bootstrap
import React, { useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
<<<<<<< HEAD
import "../assets/css/AppointBookingForm.css"; // Importing custom CSS for the form
import baseURL from "../config"; // Importing the base URL from the configuration file
=======

import "../assets/css/AppointBookingForm.css";
import baseURL from "../config";
>>>>>>> c7a0ea388c4f3672638964925fcb34629fd26740

// Functional component for the appointment booking modal
function AppointmentBookingModal() {
  // State to manage form data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    email: "",
    date_of_appointment: "",
    time_of_appointment: "",
    hospital_name: "",
    appointment_type: "",
    address: "",
    mobile_no: "",
  });

  // State to manage form submission status and errors
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: "",
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Make a POST request to submit the form data
      const response = await fetch(`${baseURL}/admin/bookAppointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Convert form data to JSON
      });

      if (response.ok) {
        console.log("Form data submitted successfully");
        // Reset form fields after successful submission
        setFormData({
          first_name: "",
          last_name: "",
          age: "",
          gender: "",
          email: "",
          date_of_appointment: "",
          time_of_appointment: "",
          hospital_name: "",
          appointment_type: "",
          address: "",
          mobile_no: "",
        });
        setFormStatus({ submitted: true, error: "" }); // Update form status
      } else {
        // Handle non-200 HTTP response
        throw new Error(`Failed to submit form data: ${response.statusText}`);
      }
    } catch (error) {
      // Catch and display errors
      console.error("Error submitting form data:", error.message);
      setFormStatus({ submitted: false, error: error.message }); // Update form status with error
    }
  };

  // Handle changes to form fields
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setFormData({
      ...formData,
      [name]: value, // Update the corresponding form field
    });
  };

  return (
    <div> {/* Main container div for the form */}
      <Card className="Form form-main"> {/* Card component for styling the form */}
        <div className="div-1 d-flex"> {/* Div for the form heading */}
          <div className="heading float-start"> {/* Heading container */}
            <h3 className="heading-2">Appointment Details</h3> {/* Form heading */}
          </div>
        </div>
<<<<<<< HEAD
        <Form onSubmit={handleSubmit}> {/* Form component with submission handler */}
          {/* Form fields */}
          <Row>
            <Col> {/* Column for the first set of form fields */}
              <Form.Control
=======
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Control 
>>>>>>> c7a0ea388c4f3672638964925fcb34629fd26740
                name="first_name"
                placeholder="First name"
                required
                value={formData.first_name}
<<<<<<< HEAD
                onChange={handleChange} // Change handler
=======
                onChange={handleChange}
                
>>>>>>> c7a0ea388c4f3672638964925fcb34629fd26740
              />
              <br />
              <Form.Control
                name="age"
                type="number"
                placeholder="Age"
                className="white-field"
                value={formData.age}
                onChange={handleChange}
                
              />
              <br />
              <Form.Control
                name="mobile_no"
                type="tel"
                placeholder="Phone Number"
                pattern="[0-9]{10}"
                value={formData.mobile_no}
                onChange={handleChange}
                
              />
              <br />
              <Form.Control
                type="date"
                name="date_of_appointment"
                required
                value={formData.date_of_appointment}
                onChange={handleChange}
                
              />
              <br />
              <Form.Control
                type="time"
                name="time_of_appointment"
                required
                value={formData.time_of_appointment}
                onChange={handleChange}
                
              />
              <br />
              <Form.Select
                name="hospital_name"
                required
                value={formData.hospital_name}
                onChange={handleChange}
                
              >
                <option value="" disabled selected>
                  Select Hospital
                </option>
                <option>Amma Hospital</option>
                <option>Gouri Gopal Hospital</option>
                <option>Suraksha Hospital</option>
                <option>RR Reddy ENT Hospital</option>
                <option>Dhurga Multi Speciality Hospital</option>
              </Form.Select>
              <br />
            </Col>
            <Col> {/* Column for the second set of form fields */}
              <Form.Control
                name="last_name"
                placeholder="Last name"
                required
                value={formData.last_name}
                onChange={handleChange}
                
              />
              <br />
              <Form.Select
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </Form.Select>
              <br />
              <Form.Select
                name="appointment_type"
                required
                value={formData.appointment_type}
                onChange={handleChange}
                
              >
                <option value="">Select Booking Type</option>
                <option>emergency appointment</option>
                <option>basic appointment</option>
              </Form.Select>
              <br />
              <Form.Control
                name="address"
                placeholder="Address"
                required
                value={formData.address}
                onChange={handleChange}
                
              />
              <br />
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                
              />
              <br />
            </Col>
          </Row>
          {/* Row for the submit and reset button */}
          <Row className="justify-content-end mt-3">
            <Col xs="auto">
              <Button variant="primary" type="submit"> {/* Submit button */}
                Submit
              </Button>
            </Col>
            <Col xs="auto">
              <Button variant="danger" type="reset"> {/* Reset button */}
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
        {/* Display error message if submission fails */}
        {formStatus.error && (
          <div className="error-message">{formStatus.error}</div>
        )}
      </Card>
    </div>
  );
}

export default AppointmentBookingModal; // Exporting the component as default

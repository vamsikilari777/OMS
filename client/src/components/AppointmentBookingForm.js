import React, { useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";

import "../assets/css/AppointBookingForm.css";
import baseURL from "../config";

function AppointmentBookingModal() {
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

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURL}/admin/bookAppointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form data submitted successfully");
        // Reset form fields after submission
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
        setFormStatus({ submitted: true, error: "" });
      } else {
        // Handle non-200 HTTP response
        throw new Error(`Failed to submit form data: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error submitting form data:", error.message);
      setFormStatus({ submitted: false, error: error.message });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <Card className="Form form-main">
        <div className="div-1 d-flex">
          <div className="heading float-start">
            <h3 className="heading-2">Appointment Details</h3>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Control 
                name="first_name"
                placeholder="First name"
                required
                value={formData.first_name}
                onChange={handleChange}
                
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
            <Col>
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
          <Row className="justify-content-end mt-3">
            <Col xs="auto">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
            <Col xs="auto">
              <Button variant="danger" type="reset">
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
        {formStatus.error && (
          <div className="error-message">{formStatus.error}</div>
        )}
      </Card>
    </div>
  );
}

export default AppointmentBookingModal;

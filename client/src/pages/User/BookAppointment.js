import React, { useState } from "react"; // Import React and useState hook
import { Card, Button, Form, Row, Col } from "react-bootstrap"; // Import necessary components from react-bootstrap
import "../../assets/css/AppointBookingForm.css"; // Import CSS for styling
import baseURL from "../../config"; // Import base URL for API requests

function AppointmentBooking() {
  // Define state to hold form data
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

  // Define state to hold form submission status
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: "",
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch(`${baseURL}/api/bookAppointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (response.ok) {
        console.log("Form data submitted successfully");
        // Reset form data after successful submission
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
      console.error("Error submitting form data:", error.message);
      setFormStatus({ submitted: false, error: error.message }); // Update form status with error message
    }
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from event target
    setFormData({
      ...formData,
      [name]: value, // Update form data state
    });
  };

  return (
    <div>
      <Card className="Form form-main"> {/* Form container */}
        <div className="div-1 d-flex">
          <div className="heading float-start">
            <h3 className="heading-2">Appointment Details</h3>
          </div>
        </div>
        <Form onSubmit={handleSubmit}> {/* Form element with submit handler */}
          <Row>
            <Col>
              <Form.Control
                name="first_name"
                placeholder="Full Name"
                required // Required attribute for mandatory fields
                value={formData.first_name}
                onChange={handleChange}
              />
              <br />
              <Form.Control
                name="age"
                type="number" // Type "number" for age input
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />
              <br />
              <Form.Control
                name="mobile_no"
                type="tel" // Type "tel" for phone number input
                placeholder="Phone Number"
                // pattern="[0-9]{10}" // Pattern for 10-digit phone number
                value={formData.mobile_no}
                onChange={handleChange}
              />
              <br />
              <Form.Control
                type="date"
                name="date_of_appointment"
                placeholderText="Appointment Date"
                required
                value={formData.date_of_appointment}
                onChange={handleChange}
              />
              <br />
              <Form.Control
                type="time"
                name="time_of_appointment"
                placeholderText="Appointment time"
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
              <Form.Select
                name="last_name"
                required
                value={formData.last_name}
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  Select Doctor
                </option>
                <option>Hussain</option>
                <option>Vamsi</option>
                <option>Harish</option>
                <option>Sharvan</option>
                <option>John</option>
              </Form.Select>
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
                <option>emergency appointment </option>
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
                type="email" // Type "email" for email input
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
              <Button className="button" type="submit">
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
          <div className="error-message">{formStatus.error}</div> // Display error message if form submission fails
        )}
      </Card>
    </div>
  );
}

export default AppointmentBooking; // Export AppointmentBooking component

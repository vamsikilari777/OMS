import React, { useState } from "react"; // Import React and useState hook
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap"; // Import components from react-bootstrap
import { Link } from "react-router-dom"; // Import Link component for navigation
import axios from "axios"; // Import axios for making HTTP requests
import { useHistory } from "react-router-dom"; // Import useHistory hook for navigation
import hero from "../../assets/images/hero.png"; // Import hero image
import Popup from "../../components/Popup"; // Import Popup component
import baseURL from "../../config"; // Import baseURL from config file
import "../../assets/css/LoginPage.css"; // Import CSS for styling

const UpdatedLoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  }); // Initialize formData state for email and password

  const [showError, setShowError] = useState(false); // State for controlling error alert visibility
  const [showPopup, setShowPopup] = useState(false); // State for controlling the popup visibility
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for controlling success popup visibility

  const history = useHistory(); // Initialize useHistory for navigation

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from event target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    })); // Update formData state with new value
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log(formData); // Log formData for debugging
    try {
      const response = await axios.post(
        `${baseURL}/api/login`, // Correct interpolation of the environment variable
        formData
      ); // Make POST request to login API
      console.log("Logged User Data: ", response.data); // Log response data for debugging
      if (response.status === 200) {
        setShowSuccessPopup(true); // Show success popup
        setTimeout(() => {
          setShowSuccessPopup(false);
          if (response.data.user.role === "admin") {
            history.push("/dashboard", { user: response.data.user }); // Redirect to admin dashboard
          } else if (response.data.user.role === "doctor") {
            history.push("/doctor", { user: response.data.user }); // Redirect to doctor dashboard
          } else if (response.data.user.role === "reception") {
            history.push("/reception", { user: response.data.user }); // Redirect to reception dashboard
          } else {
            history.push("/user", { user: response.data.user }); // Redirect to user dashboard
          }
        }, 2000); // Hide the popup after 2 seconds and then redirect
        console.log("Successful login"); // Log success message
      } else {
        setShowError(true); // Show error message if login was not successful
        setShowPopup(true); // Show the popup
      }
    } catch (error) {
      console.error("Invalid email or password!", error); // Log error for debugging
      setShowError(true); // Show error message if there was an error in the request
      setShowPopup(true); // Show the popup
    }
  };

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="user-animation">
            <div className="user-icon">
              <img className="hero-animated img-fluid" src={hero} alt="hero" /> {/* Hero image */}
            </div>
          </Col>
          <Col md={6}>
            <div className="tech2">
              <h1>
                <span>Medi</span>Monitor<span>X</span>
              </h1> {/* Application name */}
            </div>
            <div className="login-form">
              <h2 className="text-center mb-4">Login</h2> {/* Login heading */}
              <Form onSubmit={handleSubmit}> {/* Form submission handler */}
                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: "15px" }}
                  /> {/* Email input field */}
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: "15px" }}
                  /> {/* Password input field */}
                </Form.Group>

                <Button variant="primary" type="submit" block>
                  Login
                </Button> {/* Login button */}
                <div className="text-center mt-3">
                  <p>
                    Don't have an account? <Link to="/signup">Register</Link> {/* Register link */}
                  </p>
                </div>
              </Form>
              {showError && (
                <Alert variant="danger" className="mt-3">
                  Invalid email or password!
                </Alert>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {showPopup && (
        <Popup
          message="Invalid email or password! "
          onClose={() => setShowPopup(false)}
        />
      )} {/* Error popup */}

      {showSuccessPopup && (
        <Popup
          message="Successful login"
          onClose={() => setShowSuccessPopup(false)}
        />
      )} {/* Success popup */}
    </div>
  );
};

export default UpdatedLoginPage; // Export the UpdatedLoginPage component

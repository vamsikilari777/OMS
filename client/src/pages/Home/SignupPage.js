import React, { useState } from "react"; // Import React and useState hook
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap"; // Import necessary components from react-bootstrap
import { Link } from "react-router-dom"; // Import Link component for navigation
import axios from "axios"; // Import axios for making HTTP requests
import { useHistory } from "react-router-dom"; // Import useHistory hook for navigation
import hero from "../../assets/images/hero.png"; // Import hero image
import Popup from "../../components/Popup"; // Import Popup component for displaying popups
import "../../assets/css/SignupPage.css"; // Import CSS for styling
import baseURL from "../../config"; // Import base URL for API requests

const SignupPage = () => {
  // Initialize form data state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
    role: "user",
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for controlling success popup visibility
  const [showSuccess, setShowSuccess] = useState(false); // State for showing success message
  const [showError, setShowError] = useState(false); // State for showing error message
  const [errorMessage, setErrorMessage] = useState(""); // State for storing error message
  const [mobileExistsError, setMobileExistsError] = useState(false); // State for showing mobile exists error
  const [passwordMismatchError, setPasswordMismatchError] = useState(false); // State for showing password mismatch error
  const history = useHistory(); // Initialize useHistory for navigation

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from event target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Update formData state with new input value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(formData); // Log formData for debugging
    try {
      const response = await axios.post(`${baseURL}/api/register`, formData); // Send POST request to register API
      console.log(response.data); // Log response data for debugging
      if (response.status === 200) {
        // If registration is successful
        setShowSuccessPopup(true); // Show success popup
        setShowSuccess(true); // Show success message
        // Hide the popup after 2 seconds and then redirect to login page
        setTimeout(() => {
          setShowSuccessPopup(false);
          history.push("/login");
        }, 2000); // 2000 milliseconds = 2 seconds
        console.log("Registered Successfully");
      }
    } catch (error) {
      console.error("Error during registration:", error); // Log error for debugging
      if (error.response) {
        const errorMessage = error.response.data; // Get error message from response
        if (errorMessage && errorMessage.includes("User already exists")) {
          setMobileExistsError(true); // Show error alert for mobile number already exists
        } else if (
          errorMessage &&
          errorMessage.includes("Passwords do not match")
        ) {
          setPasswordMismatchError(true); // Show error alert for passwords do not match
        } else {
          setErrorMessage(errorMessage || "An error occurred..!"); // Set a generic error message if errorMessage is undefined
          setShowError(true); // Show the error alert
        }
      } else {
        setErrorMessage("An error occurred...!"); // Set a generic error message
        setShowError(true); // Show the error alert
      }
    }
  };

  return (
    <div className="signup-page"> {/* Container for signup page */}
      <Container>
        <Row className="justify-content-center align-items-center"> {/* Center content */}
          <Col md={6} className="user-animation"> {/* Column for hero image */}
            <div className="user-icon">
              <img className="hero-animated img-fluid " src={hero} alt="hero" /> {/* Hero image */}
            </div>
          </Col>
          <Col md={6}> {/* Column for signup form */}
            <div className="tech2">
              <h1>
                <span>Medi</span>Monitor<span>X</span>
              </h1>
            </div>
            <div className="signup-form"> {/* Signup form container */}
              <h2 className="text-center mb-4">Sign Up</h2>
              <Form onSubmit={handleSubmit}> {/* Form submission handler */}
                <Form.Group controlId="username"> {/* Form group for username */}
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter Full Name"
                    value={formData.username}
                    onChange={handleChange} // Handle input change
                    required
                    style={{ marginBottom: "15px" }}
                  />
                </Form.Group>
                <Form.Group controlId="email"> {/* Form group for email */}
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange} // Handle input change
                    required
                    style={{ marginBottom: "15px" }}
                  />
                </Form.Group>
                <Form.Group controlId="mobile"> {/* Form group for mobile */}
                  <Form.Control
                    type="text"
                    name="mobile"
                    placeholder="Enter Phone Number"
                    value={formData.mobile}
                    onChange={handleChange} // Handle input change
                    required
                    style={{ marginBottom: "15px" }}
                  />
                </Form.Group>
                <Form.Group controlId="password"> {/* Form group for password */}
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange} // Handle input change
                    required
                    style={{ marginBottom: "15px" }}
                  />
                </Form.Group>
                <Form.Group controlId="confirm_password"> {/* Form group for confirm password */}
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange} // Handle input change
                    required
                    style={{ marginBottom: "15px" }}
                  />
                </Form.Group>
                <div className="d-flex">
                  <Button variant="primary" className="m-2" type="submit" block> {/* Submit button */}
                    Sign Up
                  </Button>
                  <div className="text-center mt-3 ">
                    <p>
                      Already have an account? <Link to="/login">Login</Link> {/* Link to login page */}
                    </p>
                  </div>
                </div>
              </Form>
              {showSuccess && ( // Show success alert
                <Alert variant="success" className="mt-3">
                  Registration successful!{" "}
                  <Link to="/login">Click here to login</Link>
                </Alert>
              )}
              {mobileExistsError && ( // Show mobile exists error alert
                <Alert variant="danger" className="mt-3">
                  Mobile number already exists!
                </Alert>
              )}
              {passwordMismatchError && ( // Show password mismatch error alert
                <Alert variant="danger" className="mt-3">
                  Passwords do not match!
                </Alert>
              )}
              {showError && ( // Show generic error alert
                <Alert variant="danger" className="mt-3">
                  {errorMessage}
                </Alert>
              )}
              {showSuccessPopup && ( // Show success popup
                <Popup
                  message="Registered Successfully"
                  onClose={() => setShowSuccessPopup(false)}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupPage; // Export SignupPage component

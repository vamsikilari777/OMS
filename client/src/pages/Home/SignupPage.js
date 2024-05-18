import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link component
import axios from "axios";
import { useHistory } from "react-router-dom";
import hero from "../../assets/images/hero.png";
import Popup from "../../components/Popup";
import "../../assets/css/SignupPage.css";
import baseURL from "../../config";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
    role: "user",
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mobileExistsError, setMobileExistsError] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(`${baseURL}/api/register`, formData);
      console.log(response.data);
      if (response.status === 200) {
        // Show success popup
        setShowSuccessPopup(true);
        setShowSuccess(true);
        // Hide the popup after 3 seconds and then redirect
        setTimeout(() => {
          setShowSuccessPopup(false);
          history.push("/login");
        }, 2000); // 3000 milliseconds = 3 seconds
        console.log("Registered Successfully");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response) {
        const errorMessage = error.response.data;
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
    <div className="signup-page">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="user-animation">
            <div className="user-icon">
              <img className="hero-animated img-fluid " src={hero} alt="hero" />
            </div>
          </Col>
          <Col md={6}>
            <div className="tech2">
              <h1>
                <span>Medi</span>Monitor<span>X</span>
              </h1>
            </div>
            <div className="signup-form">
              <h2 className="text-center mb-4">Sign Up</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter Full Name"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: "15px" }}
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: "15px" }}
                  />
                </Form.Group>
                <Form.Group controlId="mobile">
                  <Form.Control
                    type="text"
                    name="mobile"
                    placeholder="Enter Phone Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: "15px" }}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: "15px" }}
                  />
                </Form.Group>
                <Form.Group controlId="confirm_password">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: "15px" }}
                  />
                </Form.Group>
                <div className="d-flex">
                  <Button variant="primary" className="m-2" type="submit" block>
                    Sign Up
                  </Button>
                  <div className="text-center mt-3 ">
                    <p>
                      Already have an account? <Link to="/login">Login</Link>
                    </p>
                  </div>
                </div>
              </Form>
              {showSuccess && (
                <Alert variant="success" className="mt-3">
                  Registration successful!{" "}
                  <Link to="/login">Click here to login</Link>
                </Alert>
              )}
              {mobileExistsError && (
                <Alert variant="danger" className="mt-3">
                  Mobile number already exists!
                </Alert>
              )}
              {passwordMismatchError && (
                <Alert variant="danger" className="mt-3">
                  Passwords do not match!
                </Alert>
              )}
              {showError && (
                <Alert variant="danger" className="mt-3">
                  {errorMessage}
                </Alert>
              )}
              {showSuccessPopup && (
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

export default SignupPage;

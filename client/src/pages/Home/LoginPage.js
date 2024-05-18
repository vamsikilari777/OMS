import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import hero from "../../assets/images/hero.png";
import Popup from "../../components/Popup";
import baseURL from "../../config";
import "../../assets/css/LoginPage.css";

const UpdatedLoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for controlling the popup visibility
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const history = useHistory(); //Initialize use History

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
      const response = await axios.post(
        `${baseURL}/api/login`, // Correct interpolation of the environment variable
        formData
      );
      console.log("Logged User Data: ", response.data);
      if (response.status === 200) {
        // Show success popup
        setShowSuccessPopup(true);
        // Hide the popup after 2 seconds and then redirect
        setTimeout(() => {
          setShowSuccessPopup(false);
          if (response.data.user.role === "admin") {
            history.push("/dashboard", { user: response.data.user });
          } else if (response.data.user.role === "doctor") {
            history.push("/doctor", { user: response.data.user });
          } else if (response.data.user.role === "reception") {
            history.push("/reception", { user: response.data.user });
          } else {
            history.push("/user", { user: response.data.user });
          }
        }, 2000); // 2000 milliseconds = 2 seconds
        console.log("Successful login");
      } else {
        setShowError(true); // Show error message if login was not successful
        setShowPopup(true); // Show the popup
      }
    } catch (error) {
      console.error("Invalid email or password!", error);
      setShowError(true); // Show error message if there was an error in the request
      setShowPopup(true);
    }
  };

  return (
    <div className="login-page">
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
            <div className="login-form">
              <h2 className="text-center mb-4">Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: "15px" }}
                  />
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
                  />
                </Form.Group>

                <Button variant="primary" type="submit" block>
                  Login
                </Button>
                <div className="text-center mt-3">
                  <p>
                    Don't have an account? <Link to="/signup">Register</Link>
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
      )}

      {showSuccessPopup && (
        <Popup
          message="Successful login"
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
    </div>
  );
};

export default UpdatedLoginPage;

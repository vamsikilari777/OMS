/* eslint-disable jsx-a11y/anchor-is-valid */ // Disable ESLint rule for valid anchor href

import React from "react"; // Import React
import { Link } from "react-router-dom"; // Import Link component from react-router-dom for navigation
import { Button } from "react-bootstrap"; // Import Button component from react-bootstrap
import logo from "../../assets/images/logo.png"; // Import logo image
import hero from "../../assets/images/hero.png"; // Import hero image
import Footer from "../../components/Footer"; // Import Footer component
import "../../assets/css/HomePage.css"; // Import CSS for styling the HomePage

function Home() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light"> {/* Navbar setup */}
        <div className="container">
          <a className="navbar-brand" href="/home"> {/* Navbar brand/logo */}
            <img className="navbar-logo" src={logo} alt="logo" /> {/* Logo image */}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span> {/* Toggler icon for mobile view */}
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav"> {/* Navbar links */}
              <li className="nav-item">
                <a className="nav-link me-4" href="#"> {/* Home link */}
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-4" href="#"> {/* About Us link */}
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-4" href="#"> {/* Pricing link */}
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-4" href="#"> {/* Contact Us link */}
                  Contact Us
                </a>
              </li>
            </ul>
            <div className="d-flex"> {/* Signup and Login buttons */}
              <Button
                variant="secondary"
                as={Link}
                to="/signup"
                className="m-2"
              >
                Signup
              </Button>
              <Button variant="primary" as={Link} to="/login" className="m-2">
                Login
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container"> {/* Main content container */}
        <div className="row">
          <div className="col-lg-6 d-flex align-items-center"> {/* Left column with welcome text */}
            <div className="text-center p-4">
              <div className="tech2">
                <h1>Welcome to MediMonitorX</h1> {/* Welcome message */}
              </div>
              <div className="tech">
                <p className="p-2 mt-4">
                  "Your Trusted Partner in Health and Well-being. With Tailored
                  Solutions, Expert Guidance, and Compassionate Care, We're Here
                  to Support You on Your Health Journey. Together, Let's Achieve
                  Optimal Wellness."
                </p> {/* Descriptive paragraph */}
              </div>
            </div>
          </div>
          <div className="col-lg-6"> {/* Right column with hero image */}
            <div className="animatedhero">
              <img className="hero-animated img-fluid " src={hero} alt="hero" /> {/* Hero image */}
            </div>
          </div>
        </div>
      </div>

      <div className="bottomFooter"> {/* Footer section */}
        <Footer />
      </div>
    </div>
  );
}

export default Home; // Export Home component

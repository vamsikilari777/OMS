/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import hero from "../../assets/images/hero.png";
import Footer from "../../components/Footer";
import "../../assets/css/HomePage.css";

function Home() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/home">
            <img className="navbar-logo" src={logo} alt="logo" />
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
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link me-4" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-4" href="#">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-4" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-4" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
            <div className="d-flex">
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

      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-flex align-items-center">
            <div className="text-center p-4">
              <div className="tech2">
                <h1>Welcome to MediMonitorX</h1>
              </div>
              <div className="tech">
                <p className="p-2 mt-4">
                  "Your Trusted Partner in Health and Well-being. With Tailored
                  Solutions, Expert Guidance, and Compassionate Care, We're Here
                  to Support You on Your Health Journey. Together, Let's Achieve
                  Optimal Wellness."
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="animatedhero">
              <img className="hero-animated img-fluid " src={hero} alt="hero" />
            </div>
          </div>
        </div>
      </div>

      <div className="bottomFooter">
        <Footer />
      </div>
    </div>
  );
}

export default Home;

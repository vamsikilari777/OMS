// Importing necessary modules and CSS for styling the footer component
import React from "react";
import "../assets/css/Footer.css"; // Custom CSS for the Footer component

// Functional component for the Footer
const Footer = () => {
  return (
    <>
      {/* Main container div for the footer */}
      <div>
        {/* Footer section */}
        <footer className="footer">
          <div className="container"> {/* Container for responsive layout */}
            <div className="row"> {/* Row for organizing columns */}
              {/* Column 1: Company Information */}
              <div className="col-md-4 col-sm-6">
                <h3>TechRovar</h3>
                <p>
                  Techrovar IT is a new age innovative software services
                  company, providing end-to-end design, development, testing and
                  support activities. We are working with clients across the
                  globe in multiple industries.
                </p>
              </div>
              {/* Column 2: About Us */}
              <div className="col-md-4 col-sm-6">
                <h3>About Us</h3>
                <p>
                  Started by a group of people who are passionate about
                  technology and determined to add value to large groups across
                  the globe. We believe that technology can bring a positive
                  change in society and we would like to be part of that
                  initiative.
                </p>
              </div>
              {/* Column 3: Contact Information */}
              <div className="col-md-4 col-sm-6">
                <h3>Contact Info</h3>
                <ul className="contact-list">
                  <li>
                    <p>
                      <i className="fa fa-home home" id="ad"></i>
                      Plot no:82, Apollo Pharmacy Building. 2nd Floor,
                      Venkatadri Nagar, Joharapuram road, Nandyal Checkpost,
                      Kurnool-518002, Andhra Pradesh.
                    </p>
                    <p>
                      <i className="fa fa-phone"></i>
                      +91 8019357139
                    </p>
                    <p>
                      <i className="fa fa-envelope-o"></i>
                      info@techrovar.org
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        {/* Copyright section  */}
        <div className="copyright-part">
          <p>
            Copy rights &copy; 2024. TechRovar IT Private Limited. All Rights
            Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer; // Exporting the Footer component as default

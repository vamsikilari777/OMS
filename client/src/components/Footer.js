import React from "react";
import "../assets/css/Footer.css";

const Footer = () => {
  return (
    <>
      <div>
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <h3>TechRovar</h3>
                <p>
                  Techrovar IT is a new age innovative software services
                  company, providing end-to-end design, development, testing and
                  support activities. We are working with clients across the
                  globe in multiple industries.
                </p>
              </div>
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
              <div className="col-md-4 col-sm-6">
                <h3>Contact Info</h3>
                <ul className="contact-list">
                  <li>
                    <p>
                      <i className="fa fa-home home" id="ad"></i>
                      Plot no:82, Apollo Pharmacy Building. 2nd Floor,
                      Venkatadri Nagar, Joharapuram road,Nandyal Checkpost,
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
        <div className="copyright-part">
          <p>
            Copy rights &copy; 2024.TechRovar IT Private Limited. All Rights
            Reserved
          </p>
        </div>
      </div>
    </>
  );
};
export default Footer;

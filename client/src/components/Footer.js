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
                  <li className="line">
                 
                    <p>
                    <i className="fa fa-home" id="ad"></i>
                     <span className="icon-text"> Plot no :<span className="Number"> 82</span>, Apollo Pharmacy Building. 2nd Floor,
                      Venkatadri Nagar, Joharapuram road,Nandyal Checkpost,
                      <br/> Kurnool-<span className="Number">518002</span>, Andhra Pradesh.</span>
                    </p>
                    <p className="Number">
                      <i className="fa fa-phone"></i>
                      {/* +91 8019357139 */}
                      <span className="icon-text">+91 8019357139</span>
                    </p>
                    <p>
                      <i className="fa fa-envelope-o"></i>
                      <span className="icon-text">info@techrovar.org</span>
                      
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

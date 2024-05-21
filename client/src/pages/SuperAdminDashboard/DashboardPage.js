import React, { useState, useEffect } from "react"; // Import necessary hooks from React
import { Card } from "react-bootstrap"; // Import the Card component from react-bootstrap for UI layout
import styled from "styled-components"; // Import styled-components for custom styling
import "../../assets/css/Dashboard.css"; // Import custom CSS for the dashboard
import axios from "axios"; // Import axios for making HTTP requests
import {
  FaHospital,
  FaUserDoctor,
  FaUserInjured,
  FaFileMedical,
  FaDroplet,
  FaPills,
} from "react-icons/fa6"; // Import icons from react-icons
import baseURL from "../../config"; // Import the base URL from the config file

// Styled-component for custom styling of the Card component
const CardContainer = styled(Card)`
  && {
    border-radius: 1rem;
    margin-bottom: 1rem;
    background-color: darkgray;
    border: none;
    padding-top: 0.5rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

    .card-header {
      background-color: #5b5b5b;
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1rem;
      border-radius: 1rem;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      svg {
        margin-right: 0.5rem;
      }
    }

    .card-body {
      padding: 2rem;

      h5 {
        font-size: 1.8rem;
        font-weight: bold;
        color: #3f51b5;
      }
    }
  }
`;

const Dashboard = () => {
  // State to store the counts of hospitals, doctors, and patients
  const [counts, setCounts] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalHospitals: 0,
  });

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an HTTP GET request to the server to fetch dashboard data
        const response = await axios.get(`${baseURL}/admin/dashboard`);
        // Update the state with the fetched data
        setCounts(response.data);
        console.log("Total Patients:", response.data.totalPatients);
        console.log("Total Doctors:", response.data.totalDoctors);
        console.log("Total Hospitals:", response.data.totalHospitals);
      } catch (error) {
        // Log an error message if the request fails
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="dot">
      <div className="container">
        <div className="pt-4 row spy">
          {/* Card for displaying total hospitals */}
          <div className="col-md-4 pt-2">
            <CardContainer>
              <Card.Header>
                <FaHospital size={30} />
                Total Hospitals
              </Card.Header>
              <Card.Body>
                <h5>{counts.totalHospitals}</h5>
              </Card.Body>
            </CardContainer>
          </div>
          {/* Card for displaying total doctors */}
          <div className="col-md-4 pt-2">
            <CardContainer>
              <Card.Header>
                <FaUserDoctor size={30} />
                Total Doctors
              </Card.Header>
              <Card.Body>
                <h5>{counts.totalDoctors}</h5>
              </Card.Body>
            </CardContainer>
          </div>
          {/* Card for displaying total patients */}
          <div className="col-md-4 pt-2">
            <CardContainer>
              <Card.Header>
                <FaUserInjured size={30} />
                Total Patients
              </Card.Header>
              <Card.Body>
                <h5>{counts.totalPatients}</h5>
              </Card.Body>
            </CardContainer>
          </div>
          {/* Placeholder card for nurse/staff */}
          <div className="col-md-4 pt-2">
            <CardContainer>
              <Card.Header>
                <FaFileMedical size={30} />
                Nurse/Staff
              </Card.Header>
              <Card.Body>
                <p>Fetching...</p>
              </Card.Body>
            </CardContainer>
          </div>
          {/* Placeholder card for blood donors */}
          <div className="col-md-4 pt-2">
            <CardContainer>
              <Card.Header>
                <FaDroplet size={30} />
                Blood Donors
              </Card.Header>
              <Card.Body>
                <p>Fetching..</p>
              </Card.Body>
            </CardContainer>
          </div>
          {/* Placeholder card for total pharmacies */}
          <div className="col-md-4 pt-2">
            <CardContainer>
              <Card.Header>
                <FaPills size={30} />
                Total Pharmacy's
              </Card.Header>
              <Card.Body>
                <p>Fetching...</p>
              </Card.Body>
            </CardContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; // Export the Dashboard component a

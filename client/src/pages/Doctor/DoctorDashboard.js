import React, { useState, useEffect } from "react"; // Importing necessary hooks from React
import { Card } from "react-bootstrap"; // Importing Card component from React Bootstrap
import styled from "styled-components"; // Importing styled-components for styling
import "../../assets/css/Dashboard.css"; // Importing CSS for styling
import { FaHospital, FaUserDoctor, FaUserInjured } from "react-icons/fa6"; // Importing icons from react-icons
import baseURL from "../../config"; // Importing baseURL configuration file


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
`;                                          // Styled component for custom styling of the Card component

const Dashboard = () => {
  const [counts, setCounts] = useState({     // State for storing the counts of different types of appointments
    emergencyAppointments: 0,
    todayAppointments: 0,
    totalPatients: 0,
  });

 
  useEffect(() => {                               // useEffect hook to fetch data when the component mounts
    const fetchData = async () => {
      try {
        const responseEmergency = await fetch(
          `${baseURL}/doctor/getAllEmergencyCount`
        );                                              // Fetching count of emergency appointments
        if (!responseEmergency.ok) {
          throw new Error("Failed to fetch emergency data");
        }
        const dataEmergency = await responseEmergency.json();   // Parsing the JSON response (convert the text into object)
        setCounts((prevCounts) => ({
          ...prevCounts,
          emergencyAppointments: dataEmergency.emergencyCount,
        })); // Updating the state with the fetched data
      } catch (error) {
        console.error("Error fetching emergency data:", error);
      }

      try {
        const responseTotalPatients = await fetch(
          `${baseURL}/doctor/getAllAppointmentCount`
        ); // Fetching count of all appointments
        if (!responseTotalPatients.ok) {
          throw new Error("Failed to fetch total data");
        }
        const dataTotal = await responseTotalPatients.json(); // Parsing the JSON response
        setCounts((prevCounts) => ({
          ...prevCounts,
          totalPatients: dataTotal.appointmentCount,
        })); // Updating the state with the fetched data
      } catch (error) {
        console.error("Error fetching total data:", error);
      }

      try {
        const responseTotal = await fetch(
          `${baseURL}/doctor/getTodayAppointments`
        ); // Fetching count of today's appointments
        if (!responseTotal.ok) {
          throw new Error("Failed to fetch total data");
        }
        const dataTotal = await responseTotal.json(); // Parsing the JSON response
        setCounts((prevCounts) => ({
          ...prevCounts,
          todayAppointments: dataTotal.appointmentCount1,
        })); // Updating the state with the fetched data
      } catch (error) {
        console.error("Error fetching total data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="dot">
      <div className="container">
        <div className="pt-4 row spy">
          {/* Card for displaying emergency appointments count */}
          <div className="col-md-4 pt-2">
            <CardContainer>
              <Card.Header>
                <FaHospital size={30} /> {/* Icon for the card */}
                Emergency Appointments
              </Card.Header>
              <Card.Body>
                <h5>{counts.emergencyAppointments}</h5> {/* Display the count */}
              </Card.Body>
            </CardContainer>
          </div>
          {/* Card for displaying today's appointments count */}
          <div className="col-md-4 pt-2">
            <CardContainer>
              <Card.Header>
                <FaUserDoctor size={30} /> {/* Icon for the card */}
                Today's Appointments
              </Card.Header>
              <Card.Body>
                <h5>{counts.todayAppointments}</h5> {/* Display the count */}
              </Card.Body>
            </CardContainer>
          </div>
          {/* Card for displaying total patients count */}
          <div className="col-md-4 pt-2">
            <CardContainer>
              <Card.Header>
                <FaUserInjured size={30} /> {/* Icon for the card */}
                Total Patients
              </Card.Header>
              <Card.Body>
                <h5>{counts.totalPatients}</h5> {/* Display the count */}
              </Card.Body>
            </CardContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; // Exporting the component 

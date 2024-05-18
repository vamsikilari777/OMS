import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import "../../assets/css/Dashboard.css";
import { FaHospital, FaUserDoctor, FaUserInjured } from "react-icons/fa6";
import baseURL from "../../config";

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
  const [counts, setCounts] = useState({
    emergencyAppointments: 0,
    todayAppointments: 0,
    totalPatients: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseEmergency = await fetch(
          `${baseURL}/doctor/getAllEmergencyCount`
        );
        if (!responseEmergency.ok) {
          throw new Error("Failed to fetch emergency data");
        }
        const dataEmergency = await responseEmergency.json();
        setCounts((prevCounts) => ({
          ...prevCounts,
          emergencyAppointments: dataEmergency.emergencyCount,
        }));
      } catch (error) {
        console.error("Error fetching emergency data:", error);
      }

      try {
        const responseTotalPatients = await fetch(
          `${baseURL}/doctor/getAllAppointmentCount`
        );
        if (!responseTotalPatients.ok) {
          throw new Error("Failed to fetch total data");
        }
        const dataTotal = await responseTotalPatients.json();
        setCounts((prevCounts) => ({
          ...prevCounts,
          totalPatients: dataTotal.appointmentCount,
        }));
      } catch (error) {
        console.error("Error fetching total data:", error);
      }

      try {
        const responseTotal = await fetch(
          `${baseURL}/doctor/getTodayAppointments`
        );
        if (!responseTotal.ok) {
          throw new Error("Failed to fetch total data");
        }
        const dataTotal = await responseTotal.json();
        setCounts((prevCounts) => ({
          ...prevCounts,
          todayAppointments: dataTotal.appointmentCount1,
        }));
      } catch (error) {
        console.error("Error fetching total data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="dot">
      <div className="container">
        <div className="pt-4 row spy">
          <div className="col-md-4 pt-2">
            <CardContainer>
              <Card.Header>
                <FaHospital size={30} />
                Emergency Appointments
              </Card.Header>
              <Card.Body>
                <h5>{counts.emergencyAppointments}</h5>
              </Card.Body>
            </CardContainer>
          </div>
          <div className="col-md-4 pt-2">
            <CardContainer>
              <Card.Header>
                <FaUserDoctor size={30} />
                Today's Appointments
              </Card.Header>
              <Card.Body>
                <h5>{counts.todayAppointments}</h5>
              </Card.Body>
            </CardContainer>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

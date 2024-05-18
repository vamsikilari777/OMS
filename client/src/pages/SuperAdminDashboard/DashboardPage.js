import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import "../../assets/css/Dashboard.css";
import axios from "axios";
import {
  FaHospital,
  FaUserDoctor,
  FaUserInjured,
  FaFileMedical,
  FaDroplet,
  FaPills,
} from "react-icons/fa6";
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
    totalPatients: 0,
    totalDoctors: 0,
    totalHospitals: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin/dashboard`);
        setCounts(response.data);
        console.log("Total Patients:", response.data.totalPatients);
        console.log("Total Doctors:", response.data.totalDoctors);
        console.log("Total Hospitals:", response.data.totalHospitals);
      } catch (error) {
        console.error("Error fetching data:", error);
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
                Total Hospitals
              </Card.Header>
              <Card.Body>
                <h5>{counts.totalHospitals}</h5>
              </Card.Body>
            </CardContainer>
          </div>
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

export default Dashboard;

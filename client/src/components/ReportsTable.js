// ReportsTable.js
import React from "react";
import { Container, Table, Button } from "react-bootstrap";

function ReportsTable({ hospitals, handleShowModal }) {
  return (
    <Container className="pt-3">
      {/* <h1>Hospital Information</h1> */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hospital Name</th>
            <th>Location</th>
            <th>Reports</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital.id}>
              <td>{hospital.id}</td>
              <td>{hospital.name}</td>
              <td>{hospital.location}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleShowModal(hospital)}
                >
                  View Reports
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ReportsTable;

// ReportsTable.js

import React from "react"; // Importing React for component creation
import { Container, Table, Button } from "react-bootstrap"; // Importing Container, Table, and Button components from react-bootstrap

/**
 * ReportsTable Component
 * @param {Array} hospitals - Array of hospital data
 * @param {Function} handleShowModal - Function to handle showing modal for reports
 * @returns {JSX.Element} - Returns the JSX for the ReportsTable component
 */
function ReportsTable({ hospitals, handleShowModal }) {
  return (
    <Container className="pt-3"> {/* Container for styling */}
      {/* Table for displaying hospital reports */}
      <Table striped bordered hover>
        <thead>
          <tr>
<<<<<<< HEAD
            <th>ID</th> {/* Header for hospital ID */}
            <th>Hospital Name</th> {/* Header for hospital name */}
            <th>Location</th> {/* Header for hospital location */}
            <th>Reports</th> {/* Header for hospital reports */}
=======
            {/* This is an Table Header */}
            <th>ID</th>
            <th>Hospital Name</th>
            <th>Location</th>
            <th>Reports</th>
>>>>>>> c7a0ea388c4f3672638964925fcb34629fd26740
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital.id}> {/* Row for each hospital */}
              <td>{hospital.id}</td> {/* Display hospital ID */}
              <td>{hospital.name}</td> {/* Display hospital name */}
              <td>{hospital.location}</td> {/* Display hospital location */}
              <td>
                {/* Button to view reports */}
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

export default ReportsTable; // Exporting ReportsTable Component as default

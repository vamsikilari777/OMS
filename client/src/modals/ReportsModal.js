// Import necessary modules from React and react-bootstrap
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// Define the ReportsModal functional component
function ReportsModal({ showModal, handleCloseModal, hospitals }) {
  // State for the search term entered by the user
  const [searchTerm, setSearchTerm] = useState("");

  // Function to filter patients based on search term
  const filteredPatients = hospitals
    .flatMap((hospital) => hospital.reports) // Flatten the reports array from all hospitals
    .filter((report) => report.includes(searchTerm)); // Filter reports based on the search term

  // Return the Modal component
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      {/* Modal Header */}
      <Modal.Header closeButton>
        <Modal.Title>Reports</Modal.Title> {/* Title for the modal */}
      </Modal.Header>
      {/* Modal Body */}
      <Modal.Body>
        {/* Form for searching patients by Patient ID */}
        <Form.Group controlId="searchPatient">
          <Form.Control
            type="text"
            placeholder="Search Patient ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term based on user input
          />
        </Form.Group>
        <h4>Reports of All Patients</h4> {/* Subheading */}
        <ul>
          {/* Display filtered patients' reports */}
          {filteredPatients.map((patient, index) => (
            <li key={index}>{patient}</li>
          ))}
        </ul>
      </Modal.Body>
      {/* Modal Footer */}
      <Modal.Footer>
        {/* Close Button */}
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// Export the ReportsModal component as the default export
export default ReportsModal;

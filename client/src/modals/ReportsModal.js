// ReportsModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ReportsModal({ showModal, handleCloseModal, hospitals }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to filter patients based on search term
  const filteredPatients = hospitals
    .flatMap((hospital) => hospital.reports)
    .filter((report) => report.includes(searchTerm));

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Reports</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="searchPatient">
          <Form.Control
            type="text"
            placeholder="Search Patient ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <h4>Reports of All Patients</h4>
        <ul>
          {filteredPatients.map((patient, index) => (
            <li key={index}>{patient}</li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReportsModal;

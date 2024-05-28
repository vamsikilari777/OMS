import React from "react";
import { Modal, Button } from "react-bootstrap";

const PatientHistoryModal = ({ show, onHide }) => {
  const patientHistory = "Patient's history goes here...";

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Patient History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{patientHistory}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PatientHistoryModal;

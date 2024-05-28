import React from "react";
import { Modal, Button } from "react-bootstrap";

function ViewAppointmentModal({ showModal, handleCloseModal }) {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>View Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Appointment details go here.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewAppointmentModal;

// Import necessary modules from React and react-bootstrap
import React from "react";
import { Modal, Button } from "react-bootstrap";

// Define the ViewAppointmentModal functional component
function ViewAppointmentModal({ showModal, handleCloseModal }) {
  // Return the Modal component
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      {/* Modal Header */}
      <Modal.Header closeButton>
        <Modal.Title>View Appointment</Modal.Title> {/* Title for the modal */}
      </Modal.Header>
      {/* Modal Body */}
      <Modal.Body>
        <p>Appointment details go here.</p> {/* Placeholder text for appointment details */}
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

// Export the ViewAppointmentModal component as the default export
export default ViewAppointmentModal;

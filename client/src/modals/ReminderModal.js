import React from "react"; // Import React library
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button components from react-bootstrap

// Define the ReminderModal functional component
const ReminderModal = ({ show, onHide }) => {
  // Return the Modal component
  return (
    <Modal show={show} onHide={onHide}>
      {/* Modal Header */}
      <Modal.Header closeButton>
        <Modal.Title>Reminder Details</Modal.Title> {/* Title for the modal */}
      </Modal.Header>
      {/* Modal Body */}
      <Modal.Body>
        <p>Reminder details form goes here...</p> {/* Placeholder text for reminder details form */}
      </Modal.Body>
      {/* Modal Footer */}
      <Modal.Footer>
        {/* Close Button */}
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        {/* Save Reminder Button */}
        <Button variant="primary">Save Reminder</Button>
      </Modal.Footer>
    </Modal>
  );
};

// Export the ReminderModal component as the default export
export default ReminderModal;

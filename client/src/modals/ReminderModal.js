import React from "react";
import { Modal, Button } from "react-bootstrap";

const ReminderModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Reminder Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Reminder details form goes here...</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary">Save Reminder</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReminderModal;

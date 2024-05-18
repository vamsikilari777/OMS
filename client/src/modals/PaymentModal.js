import React from "react";
import { Modal, Button } from "react-bootstrap";

const PaymentModal = ({ show, onHide, invoiceDetails }) => {
  // Check if invoiceDetails is null
  if (!invoiceDetails) {
    return null; // Render nothing if invoiceDetails is null
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Make Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Customer:</strong> {invoiceDetails.customer}
        </p>
        <p>
          <strong>Amount:</strong> ${invoiceDetails.amount}
        </p>
        {/* Add payment form inputs here */}
        <p>Payment form inputs go here...</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary">Submit Payment</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;

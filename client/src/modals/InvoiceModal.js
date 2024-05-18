import React from "react";
import { Modal, Button } from "react-bootstrap";

const InvoiceModal = ({ show, onHide, invoiceDetails }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Invoice Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Customer:</strong> {invoiceDetails.customer}
        </p>
        <p>
          <strong>Amount:</strong> ${invoiceDetails.amount}
        </p>
        <p>
          <strong>Items:</strong>
        </p>
        <ul>
          {invoiceDetails.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>
          <strong>Date:</strong> {invoiceDetails.date}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InvoiceModal;

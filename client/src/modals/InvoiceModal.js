import React from "react"; // Import the React library
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button components from react-bootstrap

// Define a functional component named InvoiceModal
const InvoiceModal = ({ show, onHide, invoiceDetails }) => {
  // Return the Modal component, which is controlled by the show and onHide props
  return (
    <Modal show={show} onHide={onHide}>
      {/* Modal header section with a close button */}
      <Modal.Header closeButton>
        {/* Title of the modal */}
        <Modal.Title>Invoice Details</Modal.Title>
      </Modal.Header>
      {/* Modal body section containing the invoice details */}
      <Modal.Body>
        {/* Display the customer name */}
        <p>
          <strong>Customer:</strong> {invoiceDetails.customer}
        </p>
        {/* Display the invoice amount */}
        <p>
          <strong>Amount:</strong> ${invoiceDetails.amount}
        </p>
        {/* Display the list of items */}
        <p>
          <strong>Items:</strong>
        </p>
        <ul>
          {/* Map over the items array and display each item in a list */}
          {invoiceDetails.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        {/* Display the invoice date */}
        <p>
          <strong>Date:</strong> {invoiceDetails.date}
        </p>
      </Modal.Body>
      {/* Modal footer section with a Close button */}
      <Modal.Footer>
        {/* Button to close the modal, triggers the onHide function when clicked */}
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Export the InvoiceModal component as the default export
export default InvoiceModal;

import React from "react"; // Import the React library
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button components from react-bootstrap

// Define the functional component named PaymentModal
const PaymentModal = ({ show, onHide, invoiceDetails }) => {
  // Check if invoiceDetails is null
  if (!invoiceDetails) {
    return null; // Render nothing if invoiceDetails is null
  }

  // Return the Modal component, which is controlled by the show and onHide props
  return (
    <Modal show={show} onHide={onHide}>
      {/* Modal header section with a close button */}
      <Modal.Header closeButton>
        {/* Title of the modal */}
        <Modal.Title>Make Payment</Modal.Title>
      </Modal.Header>
      {/* Modal body section containing the invoice details and payment form */}
      <Modal.Body>
        {/* Display the customer name */}
        <p>
          <strong>Customer:</strong> {invoiceDetails.customer}
        </p>
        {/* Display the invoice amount */}
        <p>
          <strong>Amount:</strong> ${invoiceDetails.amount}
        </p>
        {/* Placeholder for payment form inputs */}
        <p>Payment form inputs go here...</p>
      </Modal.Body>
      {/* Modal footer section with Cancel and Submit Payment buttons */}
      <Modal.Footer>
        {/* Button to cancel the modal, triggers the onHide function when clicked */}
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        {/* Button to submit the payment (currently no action assigned) */}
        <Button variant="primary">Submit Payment</Button>
      </Modal.Footer>
    </Modal>
  );
};

// Export the PaymentModal component as the default export
export default PaymentModal;

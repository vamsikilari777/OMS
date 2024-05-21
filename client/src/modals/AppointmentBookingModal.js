// Import the React library
import React from "react";
// Import the Modal component from react-bootstrap library
import { Modal } from "react-bootstrap";
// Import the AppointmentBookingForm component from the specified path
import AppointmentBookingForm from "../components/AppointmentBookingForm";

// Define the AppointmentBookingModal functional component
function AppointmentBookingModal({ showModal, handleCloseModal }) {
  return (
    // Modal component from react-bootstrap, controlled by showModal and handleCloseModal props
    <Modal show={showModal} onHide={handleCloseModal}>
      {/* Modal header with a custom CSS class and a close button */}
      <Modal.Header className="custom-modal" closeButton>
        {/* Modal title set to "Book Appointment" */}

        <Modal.Title>Book Appointment</Modal.Title>
      </Modal.Header>

      {/* Modal body to contain the form component */}
      <Modal.Body>
        {/* Appointment booking form component with handleCloseModal passed as a prop */}
        <AppointmentBookingForm handleCloseModal={handleCloseModal} />
      </Modal.Body>
    </Modal> // Close the Modal component
  );
}

// Export the AppointmentBookingModal component as the default export
export default AppointmentBookingModal;

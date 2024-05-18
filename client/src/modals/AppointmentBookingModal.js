import React from "react";
import { Modal } from "react-bootstrap";
import AppointmentBookingForm from "../components/AppointmentBookingForm";

function AppointmentBookingModal({ showModal, handleCloseModal }) {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header className="custom-modal" closeButton>
        <Modal.Title>Book Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AppointmentBookingForm handleCloseModal={handleCloseModal} />
      </Modal.Body>
    </Modal>
  );
}

export default AppointmentBookingModal;

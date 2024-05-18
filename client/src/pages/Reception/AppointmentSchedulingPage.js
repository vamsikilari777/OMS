import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AppointmentBookingModal from "../../modals/AppointmentBookingModal";
import ViewAppointmentModal from "../../modals/ViewAppointmentModal";

function AppointmentSchedulingPage() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const handleCloseBookingModal = () => setShowBookingModal(false);
  const handleShowBookingModal = () => setShowBookingModal(true);

  const handleCloseViewModal = () => setShowViewModal(false);
  const handleShowViewModal = () => setShowViewModal(true);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1>Appointment Scheduling</h1>
          <p className="text-muted">
            Efficiently manage appointments for patients and healthcare
            providers.
          </p>
          <Button
            variant="primary"
            className="mr-2"
            onClick={handleShowBookingModal}
          >
            Book Appointment
          </Button>
          <Button variant="secondary" onClick={handleShowViewModal}>
            View Schedule
          </Button>
        </Col>
      </Row>

      <AppointmentBookingModal
        showModal={showBookingModal}
        handleCloseModal={handleCloseBookingModal}
      />
      <ViewAppointmentModal
        showModal={showViewModal}
        handleCloseModal={handleCloseViewModal}
      />
    </Container>
  );
}

export default AppointmentSchedulingPage;

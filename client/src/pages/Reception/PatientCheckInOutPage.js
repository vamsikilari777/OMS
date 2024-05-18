import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

function PatientCheckInOutPage() {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1>Patient Check-In/Out</h1>
          <p className="text-muted">
            Manage daily admissions and discharges efficiently.
          </p>
          <Button variant="primary" className="mr-2">
            Check-In
          </Button>
          <Button variant="secondary">Check-Out</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>Today's Admissions</h3>
          <Card className="mt-2">
            <Card.Body>
              <Card.Title>Patient Name</Card.Title>
              <Card.Text>Admission Date: 12/05/2024</Card.Text>
            </Card.Body>
          </Card>
          <Card className="mt-2">
            <Card.Body>
              <Card.Title>Patient Name</Card.Title>
              <Card.Text>Admission Date: 12/05/2024</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <h3>Today's Discharges</h3>
          <Card className="mt-2">
            <Card.Body>
              <Card.Title>Patient Name</Card.Title>
              <Card.Text>Discharge Date: 12/05/2024</Card.Text>
            </Card.Body>
          </Card>
          <Card className="mt-2">
            <Card.Body>
              <Card.Title>Patient Name</Card.Title>
              <Card.Text>Discharge Date: 12/05/2024</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PatientCheckInOutPage;

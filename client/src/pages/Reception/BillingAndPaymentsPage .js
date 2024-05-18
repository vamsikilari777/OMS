import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import InvoiceModal from "../../modals/InvoiceModal";
import PaymentModal from "../../modals/PaymentModal";

const BillingAndPaymentsPage = () => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  // Function to generate invoice
  const generateInvoice = () => {
    // Implement your logic to generate invoice
    // For demonstration purpose, I'm just setting dummy invoice details
    const dummyInvoiceDetails = {
      customer: "John Doe",
      amount: 100,
      items: ["Item 1", "Item 2", "Item 3"],
      date: "2024-04-24",
    };
    setInvoiceDetails(dummyInvoiceDetails);
    setShowInvoiceModal(true);
  };

  // Function to handle payment
  const handlePayment = () => {
    // Implement your logic to process payment
    // For demonstration purpose, just opening the payment modal
    setShowPaymentModal(true);
  };

  return (
    <Container>
      <h1 className="mt-5">Billing and Payments</h1>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Generate Invoice</Card.Title>
              <Button variant="primary" onClick={generateInvoice}>
                Generate Invoice
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Make Payment</Card.Title>
              <Button variant="success" onClick={handlePayment}>
                Make Payment
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Invoice Modal */}
      {invoiceDetails && (
        <InvoiceModal
          show={showInvoiceModal}
          onHide={() => setShowInvoiceModal(false)}
          invoiceDetails={invoiceDetails}
        />
      )}

      {/* Payment Modal */}
      <PaymentModal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        invoiceDetails={invoiceDetails}
      />
    </Container>
  );
};

export default BillingAndPaymentsPage;

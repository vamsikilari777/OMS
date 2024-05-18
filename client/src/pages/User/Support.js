import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function MainContent() {
  return (
    <div className="vw-60 bg-secondary">
      <div className="d-flex justify-content-center align-item-center vh-80">
        <Col md={9} className="mt-2 pt-4 pb-4 bg-dark text-light rounded-2 ">
          <Container>
            <Row>
              <Col className="text-center">
                <h3>Help & Support</h3>
                <p>
                  We believe that the affordability and quality of healthcare
                  services provided by us and our track record of building
                  long-term relationships with medical professionals, have
                  enabled our growth and helped us .
                </p>
              </Col>
            </Row>

            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="number" placeholder="Enter Mobile Number" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Write Query Here</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Write Something Here"
                  rows={3}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="secondary" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Col>
      </div>
    </div>
  );
}

export default MainContent;

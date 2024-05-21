import React from "react"; // Import React library
import { Container, Row, Col } from "react-bootstrap"; // Import Container, Row, and Col components from react-bootstrap
import Button from "react-bootstrap/Button"; // Import Button component from react-bootstrap
import Form from "react-bootstrap/Form"; // Import Form component from react-bootstrap

function MainContent() {
  // Define the MainContent functional component
  return (
    <div className="vw-60 bg-secondary"> {/* Main container with background color */}
      <div className="d-flex justify-content-center align-item-center vh-80"> {/* Container for vertical alignment */}
        <Col md={9} className="mt-2 pt-4 pb-4 bg-dark text-light rounded-2 "> {/* Column with styling */}
          <Container> {/* Nested Container component */}
            <Row> {/* Row for content */}
              <Col className="text-center"> {/* Column for content alignment */}
                <h3>Help & Support</h3> {/* Heading */}
                <p>
                  We believe that the affordability and quality of healthcare
                  services provided by us and our track record of building
                  long-term relationships with medical professionals, have
                  enabled our growth and helped us .
                </p> {/* Text content */}
              </Col>
            </Row>

            <Form> {/* Form component */}
              <Form.Group className="mb-3" controlId="formBasicEmail"> {/* Form group for name input */}
                <Form.Label>Name</Form.Label> {/* Label for name input */}
                <Form.Control type="text" placeholder="Enter name" /> {/* Text input for name */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword"> {/* Form group for mobile number input */}
                <Form.Label>Mobile Number</Form.Label> {/* Label for mobile number input */}
                <Form.Control type="number" placeholder="Enter Mobile Number" /> {/* Number input for mobile number */}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              > {/* Form group for query input */}
                <Form.Label>Write Query Here</Form.Label> {/* Label for query input */}
                <Form.Control
                  as="textarea"
                  placeholder="Write Something Here"
                  rows={3}
                /> {/* Textarea input for query */}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox"> {/* Form group for checkbox */}
                <Form.Check type="checkbox" label="Check me out" /> {/* Checkbox input */}
              </Form.Group>
              <Button variant="secondary" type="submit"> {/* Submit button */}
                Submit
              </Button>
            </Form>
          </Container>
        </Col>
      </div>
    </div>
  );
}

export default MainContent; // Export the MainContent component

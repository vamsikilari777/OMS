// Import the React library
import React from "react";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button components from react-bootstrap
// Define a functional component named PatientHistoryModal
const PatientHistoryModal = ({ show, onHide }) => {
  // Define a constant for the patient's history text
  const patientHistory = "Patient's history goes here...";

  return (
    // Return the Modal component, which is controlled by the show and onHide props
    <Modal show={show} onHide={onHide}>
      {/* Modal header section with a close button */}
      <Modal.Header closeButton>
        {/* Title of the modal */}
        <Modal.Title>Patient History</Modal.Title>
      </Modal.Header>

      {/* Modal body section containing the patient history */}
      <Modal.Body>
        {/* Display the patient history text inside a paragraph */}
        <p>{patientHistory}</p>
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
// Export the PatientHistoryModal component as the default export
export default PatientHistoryModal;

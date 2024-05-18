import React, { useState } from "react";
import { Button, Table, Form, FormGroup, FormControl } from "react-bootstrap";
import PatientHistoryModal from "../../modals/PatientHistoryModal ";

const PatientRecordsPage = () => {
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [patientRecords, setPatientRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to fetch patient records based on search query
  const fetchPatientRecords = () => {
    // Implement your logic to fetch patient records here
    // For demonstration purpose, I'm just setting dummy records
    const dummyRecords = [
      { id: 1, name: "John Doe", age: 35, condition: "Fever" },
      { id: 2, name: "Jane Smith", age: 45, condition: "Cough" },
      { id: 3, name: "Alice Johnson", age: 50, condition: "Headache" },
    ];
    setPatientRecords(dummyRecords);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle search button click
  const handleSearch = () => {
    fetchPatientRecords();
  };

  // Function to handle view history button click
  const handleViewHistory = () => {
    // Implement logic to fetch and display patient's history
    // For demonstration purpose, just opening the modal
    setShowHistoryModal(true);
  };

  return (
    <div>
      <h1>Patient Records Access</h1>
      <Form inline>
        <FormGroup controlId="searchForm">
          <FormControl
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </FormGroup>
      </Form>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Condition</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patientRecords.map((record, index) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.name}</td>
              <td>{record.age}</td>
              <td>{record.condition}</td>
              <td>
                <Button variant="info" onClick={handleViewHistory}>
                  View History
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* History Modal */}
      <PatientHistoryModal
        show={showHistoryModal}
        onHide={() => setShowHistoryModal(false)}
      />
    </div>
  );
};

export default PatientRecordsPage;

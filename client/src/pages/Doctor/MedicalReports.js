import React, { useState, useEffect } from "react"; // Importing necessary hooks from React
import axios from "axios"; // Importing axios for making HTTP requests
import {
  Container,
  Table,
  Form,
  Button,
  Modal,
  Pagination,
} from "react-bootstrap"; // Importing components from React Bootstrap
import { Worker, Viewer } from "@react-pdf-viewer/core"; // Importing PDF viewer components
import "@react-pdf-viewer/core/lib/styles/index.css"; // Importing styles for the PDF viewer
import baseURL from "../../config"; // Importing baseURL configuration file

const HospitalTable = () => {
  const [data, setData] = useState([]); // State for storing patient data
  const [filteredData, setFilteredData] = useState([]); // State for storing filtered patient data
  const [searchTerm, setSearchTerm] = useState(""); // State for storing the search term
  const [currentPage, setCurrentPage] = useState(1); // State for storing the current page number
  const [itemsPerPage] = useState(5); // State for the number of items per page (constant)
  const [showModal, setShowModal] = useState(false); // State for controlling the visibility of the modal
  const [currentPdfUrl, setCurrentPdfUrl] = useState(""); // State for storing the current PDF URL
  const [darkMode, setDarkMode] = useState(true); // Manually set dark mode

  // Fetching patient data from the server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/doctor/patients`);
        setData(response.data); // Setting the data state with the fetched data
        setFilteredData(response.data); // Also setting the filtered data state
      } catch (error) {
        console.error("Error fetching data:", error); // catching the error and displayed in console
      }
    };
    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Filtering the data based on the search term whenever the search term or data changes
  useEffect(() => {
    const filtered = data.filter((item) => {
      const patientName = item.patientName ? item.patientName.toLowerCase() : "";
      const doctorName = item.doctorName ? item.doctorName.toLowerCase() : "";
      const date = item.date ? item.date.toLowerCase() : "";
      return (
        patientName.includes(searchTerm.toLowerCase()) ||
        doctorName.includes(searchTerm.toLowerCase()) ||
        date.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredData(filtered); // Setting the filtered data state with the filtered results
  }, [searchTerm, data]); // Dependencies are searchTerm and data

  // Handler for changing the search term
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handler for pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handler for opening a PDF in a modal
  const handlePdfOpen = async (patientId) => {
    try {
      const response = await axios.get(`${baseURL}/api/pdf/${patientId}`, {
        responseType: "arraybuffer",
      }); // Fetching the PDF file as a binary array
      const pdfBlob = new Blob([response.data], { type: "application/pdf" }); // Creating a Blob from the binary array
      const pdfUrl = URL.createObjectURL(pdfBlob); // Creating a URL for the Blob
      setCurrentPdfUrl(pdfUrl); // Setting the current PDF URL state
      setShowModal(true); // Showing the modal
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  // Calculating indices for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem); // Getting the items for the current page

  // Define dark mode styles
  const darkModeStyles = { backgroundColor: "#222", color: "#fff" };

  return (
    <Container
      style={darkMode ? darkModeStyles : null}
      className="w-90 h-80 pt-3 p-4"
    >
      {/* Search input field */}
      <Form.Group controlId="search" className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search by Patient, Doctor, or Date..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={darkMode ? { backgroundColor: "#333", color: "#fff" } : null}
        />
      </Form.Group>
      {/* Table for displaying patient data */}
      <Table striped bordered hover variant={darkMode ? "dark" : "light"}>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Patient Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Disease</th>
            <th>Reports</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.patient_id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.gender}</td>
              <td>{item.diseases}</td>
              <td>
                <Button
                  variant="link"
                  onClick={() => handlePdfOpen(item.patient_id)}
                >
                  View Report
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Pagination controls */}
      <Pagination>
        {Array.from(
          { length: Math.ceil(filteredData.length / itemsPerPage) }, // Creating an array for the pagination items
          (_, index) => (
            <Pagination.Item
              key={index + 1}
              onClick={() => paginate(index + 1)}
              active={index + 1 === currentPage}
              style={
                darkMode ? { backgroundColor: "#333", color: "#fff" } : null
              }
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>

      {/* Modal for displaying the PDF */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header
          closeButton
          style={darkMode ? { backgroundColor: "#333", color: "#fff" } : null}
        >
          <Modal.Title>PDF Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={currentPdfUrl} />
          </Worker>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default HospitalTable; // Exporting the component 

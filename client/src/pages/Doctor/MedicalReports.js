import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Form,
  Button,
  Modal,
  Pagination,
} from "react-bootstrap";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import baseURL from "../../config";

const HospitalTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState("");
  const [darkMode, setDarkMode] = useState(true); // Manually set dark mode

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/doctor/patients`);
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => {
      const patientName = item.patientName
        ? item.patientName.toLowerCase()
        : "";
      const doctorName = item.doctorName ? item.doctorName.toLowerCase() : "";
      const date = item.date ? item.date.toLowerCase() : "";
      return (
        patientName.includes(searchTerm.toLowerCase()) ||
        doctorName.includes(searchTerm.toLowerCase()) ||
        date.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePdfOpen = async (patientId) => {
    try {
      const response = await axios.get(`${baseURL}/api/pdf/${patientId}`, {
        responseType: "arraybuffer",
      });
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setCurrentPdfUrl(pdfUrl);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Define dark mode styles
  const darkModeStyles = { backgroundColor: "#222", color: "#fff" };

  return (
    <Container
      style={darkMode ? darkModeStyles : null}
      className="w-90 h-80 pt-3 p-4"
    >
      <Form.Group controlId="search" className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search by Patient, Doctor, or Date..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={darkMode ? { backgroundColor: "#333", color: "#fff" } : null}
        />
      </Form.Group>
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
      <Pagination>
        {Array.from(
          { length: Math.ceil(filteredData.length / itemsPerPage) },
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

export default HospitalTable;

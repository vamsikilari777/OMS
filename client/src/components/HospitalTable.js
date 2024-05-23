/* eslint-disable react-hooks/exhaustive-deps */
// Import necessary modules from React and React Bootstrap
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

// Define the HospitalTable functional component
const HospitalTable = () => {
  // State hooks to manage accounts, current page, and total pages
  const [accounts, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Function to fetch data from the server
  const fetchData = async () => {
    try {
      // Fetch data for the current page
      const response = await fetch(
        `${baseURL}/admin/hospitals?page=${currentPage}`
      );
      const data = await response.json();
      console.log("Fetched data:", data);

      const userData = [...data]; // Using spread operator to copy the array
      console.log(userData);

      setAccounts(userData);
      setTotalPages(data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect hook to fetch data when currentPage changes
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // Handler function to navigate to the next page
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Handler function to navigate to the previous page
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Handler function to update data for a specific hospital
  const handleUpdate = async (id) => {
    try {
      // Make a request to update data for the specified id
      const response = await fetch(`/admin/hospitals/${id}`, {
        method: "PUT", // Assuming you use a PUT request for updating data
        headers: {
          "Content-Type": "application/json",
        },
        // Add the data you want to update here
        body: JSON.stringify({
          /* Add updated data here */
        }),
      });
      // Check if the request was successful
      if (response.ok) {
        // Update the local state or fetch updated data
        console.log("Successfully updated data");
        fetchData();
      } else {
        console.error("Failed to update data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Handler function to delete data for a specific hospital
  const handleDelete = async (id) => {
    // Show a confirmation dialog before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        // Make a request to delete data for the specified id
        const response = await fetch(`/admin/hospitals/${id}`, {
          method: "DELETE", // Assuming you use a DELETE request for deleting data
        });
        // Check if the request was successful
        if (response.ok) {
          // Update the local state or fetch updated data
          console.log("Successfully deleted data");
          fetchData();
        } else {
          console.error("Failed to delete data:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  // Render the component
  return (
    <div>
      <h2>All User Roles</h2>
      {accounts && accounts.length > 0 ? (
        // Table to display hospital data
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Hospital ID</th>
              <th>Hospital Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.hospital_id}>
                <td>{account.hospital_id}</td>
                <td>{account.name}</td>
                <td>{account.address}</td>
                <td>{account.phone_number}</td>
                <td>
                  {/* Button to update data for a specific hospital */}
                  <Button
                    variant="primary"
                    onClick={() => handleUpdate(account.id)}
                  >
                    Update
                  </Button>
                  {/* Button to delete data for a specific hospital */}
                  <Button
                    className="ms-2"
                    variant="danger"
                    onClick={() => handleDelete(account.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        // Message to display if no data is available
        <p>Sorry..! Currently There Is No Further Data Here</p>
      )}
      {/* Button to navigate to the previous page */}
      <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
        Previous
      </Button>{" "}
      {/* Button to navigate to the next page */}
      <Button
        className="ms-2"
        disabled={currentPage >= totalPages - 1}
        onClick={handleNextPage}
      >
        Next
      </Button>
    </div>
  );
};

export default HospitalTable; // Exporting the HospitalTable component as a default

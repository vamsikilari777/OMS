/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

const UserTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${baseURL}/admin/allUsers?page=${currentPage}`
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

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data when currentPage changes

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleUpdate = async (id) => {
    try {
      // Make a request to update data for the specified id
      const response = await fetch(`/admin/allUsers/${id}`, {
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

  const handleDelete = async (id) => {
    // Show a confirmation dialog before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        // Make a request to delete data for the specified id
        const response = await fetch(`/admin/allUsers/${id}`, {
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

  return (
    <div>
      <h2>All User Roles</h2>
      {accounts && accounts.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              <th>Hospital Name</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id}>
                <td>{account.id}</td>
                <td>{account.username}</td>
                <td>{account.email}</td>
                <td>{account.password}</td>
                <td>{account.role}</td>
                <td>{account.hospital_name}</td>
                <td>{account.location}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleUpdate(account.id)}
                  >
                    Update
                  </Button>
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
        <p>Sorry..!Currently There No Further Data Here</p>
      )}
      <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
        Previous
      </Button>{" "}
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

export default UserTable;

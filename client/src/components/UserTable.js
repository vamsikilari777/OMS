/* eslint-disable react-hooks/exhaustive-deps */
<<<<<<< HEAD
import React, { useState, useEffect } from "react"; // Import React and necessary hooks
import { Table, Button } from "react-bootstrap"; // Import Table and Button components from react-bootstrap
=======
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import baseURL from "../config";
>>>>>>> c7a0ea388c4f3672638964925fcb34629fd26740

const UserTable = () => {
  const [accounts, setAccounts] = useState([]); // State to store user accounts
  const [currentPage, setCurrentPage] = useState(1); // State to track current page number
  const [totalPages, setTotalPages] = useState(1); // State to store total number of pages

  // Function to fetch user data
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${baseURL}/admin/allUsers?page=${currentPage}`
      ); // Fetch user data from the server
      const data = await response.json(); // Extract JSON data from the Response
      console.log("Fetched data:", data);

      const userData = [...data]; // Copy the fetched data array using spread operator
      console.log(userData);

      setAccounts(userData); // Update the state with fetched data
      setTotalPages(data.length); // Set total pages
    } catch (error) {
      console.error("Error fetching data:", error); // Log error if fetching data fails
    }
  };

  // Effect to fetch data when currentPage changes
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // Function to handle next page button click
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Function to handle previous page button click
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Function to handle update user data
  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`/admin/allUsers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          /* Add updated data here */
        }),
      }); // Make a request to update data for the specified id
      if (response.ok) {
        console.log("Successfully updated data"); // Log success message if update is successful
        fetchData(); // Fetch updated data
      } else {
        console.error("Failed to update data:", response.statusText); // Log error message if update fails
      }
    } catch (error) {
      console.error("Error updating data:", error); // Log error if updating data fails
    }
  };

  // Function to handle delete user data
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    ); // Show confirmation dialog before deleting
    if (confirmDelete) {
      try {
        const response = await fetch(`/admin/allUsers/${id}`, {
          method: "DELETE",
        }); // Make a request to delete data for the specified id
        if (response.ok) {
          console.log("Successfully deleted data"); // Log success message if delete is successful
          fetchData(); // Fetch updated data
        } else {
          console.error("Failed to delete data:", response.statusText); // Log error message if delete fails
        }
      } catch (error) {
        console.error("Error deleting data:", error); // Log error if deleting data fails
      }
    }
  };

  return (
    <div>
      <h2>All User Roles</h2> {/* Heading for user table */}
      {/* Render user table if accounts array is not empty */}
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
                  {/* Button to update user data */}
                  <Button
                    variant="primary"
                    onClick={() => handleUpdate(account.id)}
                  >
                    Update
                  </Button>
                  {/* Button to delete user data */}
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
        // Render message if accounts array is empty
        <p>Sorry..! Currently There Are No Further Data Here</p>
      )}
      {/* Button to navigate to previous page */}
      <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
        Previous
      </Button>{" "}
      {/* Button to navigate to next page */}
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

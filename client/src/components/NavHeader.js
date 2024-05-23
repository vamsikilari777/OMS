import React, { useState } from "react"; // Importing React for component creation and useState hook for state management
import "../assets/css/MainPage.css"; // Importing CSS for styling
import { Icon } from "@mui/material"; // Importing Icon component from Material-UI
import { Form } from "react-bootstrap"; // Importing Form component from react-bootstrap
import { useHistory } from "react-router-dom"; // Importing useHistory hook from react-router-dom
import ProfileModal from "../modals/ProfileModal"; // Importing ProfileModal component

/**
 * NavHeader Component
 * @param {function} handleToggle - Function to handle Sidebar toggle
 * @param {boolean} isSidebarOpen - Flag indicating if the sidebar is open
 * @param {object} user - User object containing user information
 * @returns {JSX.Element} - Returns the JSX for the NavHeader component
 */
export const NavHeader = ({ handleToggle, isSidebarOpen, user }) => {
  const history = useHistory(); // Initializing useHistory hook
  const [showProfileModal, setShowProfileModal] = useState(false); // Initializing state for profile modal visibility

  /**
   * Handler for logout action
   */
  const handleLogout = () => {
    // Display confirmation alert
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    // If user confirms, redirect to home page
    if (confirmLogout) {
      history.push("/");
    }
  };

  /**
   * Handler for profile click event
   */
  const handleProfileClick = () => {
    setShowProfileModal(true); // Show profile modal
  };

  // Render the NavHeader component
  return (
    <div className="">
      <header className="sidebar-header d-flex justify-content-between align-items-center p-2">
        <div className="d-flex align-items-center">
          {/* Button to toggle sidebar */}
          <button
            type="button"
            onClick={handleToggle}
            className="btn btn-link text-decoration-none text-light"
          >
            <Icon>{isSidebarOpen ? "close" : "menu"}</Icon>
          </button>
        </div>
        <Form inline className="d-flex mx-2">
          {/* Application logo */}
          <h2 className="text-light">
            <span style={{ color: "red" }}>M</span>
            <span>e</span>
            <span>d</span>
            <span>i</span>
            <span>M</span>
            <span>o</span>
            <span>n</span>
            <span>i</span>
            <span>t</span>
            <span>o</span>
            <span>r</span>
            <span style={{ color: "blue" }}>X</span>
          </h2>
        </Form>
        <div className="d-flex">
          {/* Button to open profile modal */}
          <button
            onClick={handleProfileClick}
            className="btn btn-link text-decoration-none text-light"
          >
            <Icon>account_circle</Icon>
          </button>
          {/* ProfileModal component */}
          <ProfileModal
            show={showProfileModal}
            onHide={() => setShowProfileModal(false)}
            user={user}
          />
          {/* Button to logout */}
          <button
            onClick={handleLogout}
            className="btn btn-link text-decoration-none text-light mr-2"
          >
            <Icon>logout</Icon>
          </button>
        </div>
      </header>
    </div>
  );
};

export default NavHeader; // Export the NavHeader component as default

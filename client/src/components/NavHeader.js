import React, { useState } from "react";
import "../assets/css/MainPage.css";
import { Icon } from "@mui/material";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ProfileModal from "../modals/ProfileModal";

export const NavHeader = ({
  handleToggle,
  isSidebarOpen,
  user, 
}) => {
  const history = useHistory();
  const [showProfileModal, setShowProfileModal] = useState(false);

  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   history.push("/");
  // };
  const handleLogout = () => {
    // Display confirmation alert
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    // If user confirms, perform logout action
    if (confirmLogout) {
      history.push("/");
    }
  };

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  return (
    <div className="">
      <header className="sidebar-header d-flex justify-content-between align-items-center p-2">
        <div className="d-flex align-items-center">
          <button
            type="button"
            onClick={handleToggle}
            className="btn btn-link text-decoration-none text-light"
          >
            <Icon>{isSidebarOpen ? "close" : "menu"}</Icon>
          </button>
        </div>
        <Form inline className="d-flex mx-2">
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
          <button
            onClick={handleProfileClick}
            className="btn btn-link text-decoration-none text-light"
          >
            <Icon>account_circle</Icon>
          </button>
          <ProfileModal
            show={showProfileModal}
            onHide={() => setShowProfileModal(false)}
            user={user}
          />
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

export default NavHeader;

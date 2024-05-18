import React, { useState } from "react";
import "../assets/css/Popup.css";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function Popup({ message, onClose }) {
  const [isOpen, setIsOpen] = useState(true); // State to manage whether the popup is open or closed

  // Function to close the popup
  const closePopup = () => {
    setIsOpen(false);
    onClose(); // Call the onClose function passed as prop to handle closing the popup
  };

  // Render the popup if isOpen is true
  return (
    <>
      {isOpen && (
        <div className="popup-container">
          <div className="popup-content">
            <Alert
              icon={<CheckIcon fontSize="18px" />}
              severity="success"
              action={
                <IconButton
                  size="small"
                  onClick={closePopup}
                  aria-label="close"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            >
              <h5> {message} </h5>
            </Alert>
          </div>
        </div>
      )}
    </>
  );
}

export default Popup;

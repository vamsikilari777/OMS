import React, { useState } from "react"; // Importing React for component creation and useState hook for state management
import "../assets/css/Popup.css"; // Importing CSS for styling
import Alert from "@mui/material/Alert"; // Importing Alert component from Material-UI
import CheckIcon from "@mui/icons-material/Check"; // Importing CheckIcon component from Material-UI
import IconButton from "@mui/material/IconButton"; // Importing IconButton component from Material-UI
import CloseIcon from "@mui/icons-material/Close"; // Importing CloseIcon component from Material-UI

/**
 * Popup Component
 * @param {string} message - Message to be displayed in the popup
 * @param {function} onClose - Function to handle closing the popup
 * @returns {JSX.Element} - Returns the JSX for the Popup component
 */
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
              icon={<CheckIcon fontSize="18px" />} // Check icon for success message
              severity="success" // Severity set to success
              action={
                <IconButton
                  size="small"
                  onClick={closePopup}
                  aria-label="close"
                >
                  <CloseIcon fontSize="small" /> {/* Close icon */}
                </IconButton>
              }
            >
              <h5> {message} </h5> {/* Display message */}
            </Alert>
          </div>
        </div>
      )}
    </>
  );
}

export default Popup; // Export the Popup component as default

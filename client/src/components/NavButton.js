import React from "react"; // Importing React for component creation
import "../assets/css/MainPage.css"; // Importing CSS for styling
import { Icon } from "@mui/material"; // Importing Icon component from Material-UI

/**
 * NavButton Component
 * @param {function} onClick - Function to handle click events
 * @param {string} name - Name of the button
 * @param {string} icon - Icon to be displayed on the button
 * @param {boolean} isActive - Flag to indicate if the button is active
 * @param {boolean} hasSubNav - Flag to indicate if the button has a sub-navigation
 * @returns {JSX.Element} - Returns the JSX for the NavButton component
 */
export const NavButton = ({ onClick, name, icon, isActive, hasSubNav }) => {
  // Handler for button click
  const handleClick = () => {
    console.log("Clicked:", name);
    onClick(name);
  };

  // Render the NavButton component
  return (
    <button
      type="button" // Button type
      onClick={handleClick} // onClick event handler
      className={isActive ? "active" : ""} // Apply 'active' class if isActive is true
    >
      {/* Render icon if provided */}
      {icon && <Icon>{icon}</Icon>}
      <span>{name}</span> {/* Render button name */}
      {/* Render expand icon if button has sub-navigation */}
      {hasSubNav && <Icon>expand_more</Icon>}
    </button>
  );
};

export default NavButton; // Export the NavButton component as default

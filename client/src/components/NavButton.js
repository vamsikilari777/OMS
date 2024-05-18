import React from "react";
import "../assets/css/MainPage.css";
import { Icon } from "@mui/material";

export const NavButton = ({ onClick, name, icon, isActive, hasSubNav }) => {
  const handleClick = () => {
    console.log("Clicked:", name);
    onClick(name);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={isActive ? "active" : ""}
    >
      {icon && <Icon>{icon}</Icon>}
      <span>{name}</span>
      {hasSubNav && <Icon>expand_more</Icon>}
    </button>
  );
};
export default NavButton;

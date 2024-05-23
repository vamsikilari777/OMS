import React, { useRef } from "react"; // Importing React and useRef hook
import NavButton from "./NavButton"; // Importing NavButton component

/**
 * SubMenu Component
 * @param {Object} item - Menu item object containing name and items
 * @param {string} activeItem - Active menu item
 * @param {Function} handleClick - Function to handle click events
 * @returns {JSX.Element} - Returns the JSX for the SubMenu component
 */
export const SubMenu = ({ item, activeItem, handleClick }) => {
  const navRef = useRef(null); // Creating a ref for sub-menu navigation

  // Function to check if sub-menu is open
  const isSubNavOpen = (item, items) =>
    items.some((i) => i === activeItem) || item === activeItem;

  return (
    <div
      className={`sub-nav ${isSubNavOpen(item.name, item.items) ? "open" : ""}`}
      style={{
        height: !isSubNavOpen(item.name, item.items)
          ? 0
          : navRef.current?.clientHeight,
      }}
    >
      <div ref={navRef} className="sub-nav-inner">
        {/* Rendering sub-menu items */}
        {item?.items.map((subItem) => (
          <NavButton
            key={subItem}
            onClick={handleClick}
            name={subItem}
            isActive={activeItem === subItem}
          />
        ))}
      </div>
    </div>
  );
};

export default SubMenu; // Exporting SubMenu Component as default

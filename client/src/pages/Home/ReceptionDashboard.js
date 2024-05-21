import React, { useState } from "react"; // Import React and useState hook
import "../../assets/css/MainPage.css"; // Import CSS for styling
import { useLocation } from "react-router-dom"; // Import useLocation hook for accessing route state
import NavButton from "../../components/NavButton"; // Import NavButton component
import NavHeader from "../../components/NavHeader"; // Import NavHeader component
import SubMenu from "../../components/SubMenu"; // Import SubMenu component
import ReceptionItems from "../../utils/ReceptionItems"; // Import ReceptionItems for navigation

const ReceptionPage = () => {
  const [activeItem, setActiveItem] = useState(ReceptionItems[0]?.name); // Initialize state for active item
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Initialize state for sidebar open/close
  const isMobile = window.innerWidth <= 768; // Determine if the device is mobile based on window width

  const location = useLocation(); // Use useLocation hook to get route state
  const user = location.state?.user; // Access user data passed via route state

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close state
    console.log("Toggling sidebar", isSidebarOpen ? "Closed" : "Opened"); // Log sidebar toggle state
  };

  const handleClick = (item, isMainNav) => {
    console.log("Handle click:", item); // Log clicked item
    setActiveItem(item !== activeItem ? item : ""); // Toggle active item
    if (isMainNav && isMobile) {
      setIsSidebarOpen(false); // Close sidebar when a main nav button is clicked on mobile
    }
  };

  const handleSubItemClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false); // Close sidebar when a subnav item is clicked on mobile
    }
  };

  return (
    <div>
      <div className="headerScroll">
        <NavHeader
          user={user} // Pass user data to NavHeader
          fixed="top" // Set NavHeader to be fixed at the top
          handleToggle={handleToggle} // Pass handleToggle function to NavHeader
          isSidebarOpen={isSidebarOpen} // Pass sidebar open/close state to NavHeader
        />
        <div className="pos d-flex">
          <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}> {/* Sidebar with dynamic class based on state */}
            {ReceptionItems.map((item) => (
              <div key={item.name}> {/* Map through ReceptionItems and render NavButton and SubMenu */}
                <NavButton
                  onClick={() => handleClick(item.name, !item.items)} // Handle click on NavButton
                  name={item.name} // Pass item name to NavButton
                  icon={item.icon} // Pass item icon to NavButton
                  isActive={activeItem === item.name} // Check if the item is active
                  hasSubNav={!!item.items} // Check if the item has a sub-navigation
                />
                {item.items && (
                  <SubMenu
                    activeItem={activeItem} // Pass active item to SubMenu
                    handleClick={(itemName) => {
                      handleSubItemClick(); // Handle sub-item click
                      handleClick(itemName, false); // Handle main item click
                    }}
                    item={item} // Pass item to SubMenu
                  />
                )}
              </div>
            ))}
          </aside>
          <div
            className={`content ${
              isSidebarOpen ? "shift-right" : "shift-left"
            }`} // Content area with dynamic class based on sidebar state
          >
            <div className="main-content">
              <div className="content-wrapper">
                {/* Conditionally render content based on activeItem */}
                {ReceptionItems.map(
                  (item) =>
                    activeItem === item.name && (
                      <div key={item.path}>
                        {/* Render content for the active item here */}
                        {/* <h2>{item.name} </h2> */}
                        {/* Render the icon */}
                        <div className="pt-2">
                          {/* Render the content */}
                          {item.path}
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionPage; // Export ReceptionPage component

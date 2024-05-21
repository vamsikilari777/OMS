import React, { useState } from "react"; // Import React and useState hook
import "../../assets/css/MainPage.css"; // Import CSS for styling
import { useLocation } from "react-router-dom"; // Import useLocation hook from react-router-dom
import NavButton from "../../components/NavButton"; // Import NavButton component
import NavHeader from "../../components/NavHeader"; // Import NavHeader component
import SubMenu from "../../components/SubMenu"; // Import SubMenu component
import menuItems from "../../utils/SuperAdminItems"; // Import menu items

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(menuItems[0]?.name); // State to track active item, defaulting to the first item
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to track sidebar open/close status
  const isMobile = window.innerWidth <= 768; // Check if the viewport width is 768px or less

  const location = useLocation(); // Get current location from react-router-dom
  const user = location.state?.user; // Access user data passed via route state

  // Function to toggle sidebar open/close status
  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log("Toggling sidebar", isSidebarOpen ? "Closed" : "Opened");
  };

  // Function to handle main navigation button clicks
  const handleClick = (item, isMainNav) => {
    console.log("Handle click:", item);
    setActiveItem(item !== activeItem ? item : ""); // Toggle active item
    if (isMainNav && isMobile) {
      setIsSidebarOpen(false); // Close sidebar when a main nav button is clicked on mobile
    }
  };

  // Function to handle sub-navigation item clicks
  const handleSubItemClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false); // Close sidebar when a subnav item is clicked on mobile
    }
  };

  return (
    <div>
      <div className="headerScroll"> {/* Header section with toggle button */}
        <NavHeader
          user={user} // Pass user data to NavHeader
          fixed="top" // Fix the header at the top
          handleToggle={handleToggle} // Pass handleToggle function to NavHeader
          isSidebarOpen={isSidebarOpen} // Pass sidebar open status to NavHeader
        />
        <div className="pos d-flex"> {/* Main container with flexbox */}
          <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}> {/* Sidebar container */}
            {menuItems.map((item) => (
              <div key={item.name}> {/* Unique key for each menu item */}
                <NavButton
                  onClick={() => handleClick(item.name, !item.items)} // Handle main nav button click
                  name={item.name} // Pass item name to NavButton
                  icon={item.icon} // Pass item icon to NavButton
                  isActive={activeItem === item.name} // Pass active status to NavButton
                  hasSubNav={!!item.items} // Pass sub-navigation status to NavButton
                />
                {item.items && ( // If the item has sub-navigation items, render SubMenu
                  <SubMenu
                    activeItem={activeItem} // Pass active item to SubMenu
                    handleClick={(itemName) => { // Handle sub-navigation item click
                      handleSubItemClick();
                      handleClick(itemName, false);
                    }}
                    item={item} // Pass the item to SubMenu
                  />
                )}
              </div>
            ))}
          </aside>
          <div
            className={`content ${
              isSidebarOpen ? "shift-right" : "shift-left"
            }`} // Adjust content position based on sidebar open status
          >
            <div className="main-content">
              {menuItems.map(
                (item) =>
                  activeItem === item.name && ( // Render content for the active item
                    <div key={item.path}> {/* Unique key for each content item */}
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
  );
};

export default Sidebar; // Export Sidebar component

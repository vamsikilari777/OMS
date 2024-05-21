import React, { useState } from "react";//Import React and useState hook
import "../../assets/css/MainPage.css";//Import CSS for styling
import { useLocation } from "react-router-dom";//Import useLocation hook from react-router-dom for route state
import NavButton from "../../components/NavButton";//Import NavButton component
import NavHeader from "../../components/NavHeader";//import NavHeader component
import SubMenu from "../../components/SubMenu";//Import SubMenu component
import DoctorItems from "../../utils/DoctorItems";//Import DoctorItems which presumably contains the sidebar item

const DoctorDashboard = () => {
  const [activeItem, setActiveItem] = useState(DoctorItems[0]?.name);//Initialize activeItem state with the name of the first DoctorItem
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);//Initialize isSidebarOpen state to control the sidebar visibility
  const isMobile = window.innerWidth <= 768;//Import DoctorItems which presumably contains the sidebar items

  const location = useLocation();// Get the current location object from react-router
  const user = location.state?.user; // Access user data passed via route state

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);// Toggle the sidebar open/close state
    console.log("Toggling sidebar", isSidebarOpen ? "Closed" : "Opened"); // Log the new state of the sidebar
  };

  const handleClick = (item, isMainNav) => {
    console.log("Handle click:", item);// Log the clicked item
    setActiveItem(item !== activeItem ? item : ""); // Toggle the active item or set it to empty if clicked again
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
          user={user}// Pass user data to NavHeader component
          fixed="top" // Fix NavHeader at the top

          handleToggle={handleToggle}// Pass handleToggle function to NavHeader
          isSidebarOpen={isSidebarOpen}// Pass sidebar open state to NavHeader
        />
        <div className="pos d-flex">
          <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            {DoctorItems.map((item) => (
              <div key={item.name}>
                <NavButton
                  onClick={() => handleClick(item.name, !item.items)}// Handle click on NavButton
                  name={item.name}
                  icon={item.icon}
                  isActive={activeItem === item.name}// Check if the item is active
                  hasSubNav={!!item.items}// Check if the item has a sub-navigation
                />
                {item.items && (
                  <SubMenu
                    activeItem={activeItem}// Pass activeItem state to SubMenu
                    handleClick={(itemName) => {
                      handleSubItemClick();// Handle sub item click
                      handleClick(itemName, false);// Handle click on sub item
                    }}
                    item={item}
                  />
                )}
              </div>
            ))}
          </aside>
          <div
            className={`content ${
              isSidebarOpen ? "shift-right" : "shift-left"
            }`}
          >
            <div className="main-content">
              <div className="content-wrapper"> 
                {DoctorItems.map(
                  (item) =>
                    activeItem === item.name && (// Check if the item is active
                      <div key={item.path}>
                        <div className="pt-2">{item.path}</div>  {/**// Render the item's path as content*/}
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

export default DoctorDashboard;// Export the DoctorDashboard component

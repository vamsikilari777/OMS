import React, { useState } from "react";
import "../../assets/css/MainPage.css";
import { useLocation } from "react-router-dom";
import NavButton from "../../components/NavButton";
import NavHeader from "../../components/NavHeader";
import SubMenu from "../../components/SubMenu";
import UserMenuItems from "../../utils/UserMenuItems";

const UserDashboard = () => {
  const [activeItem, setActiveItem] = useState(UserMenuItems[0]?.name);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = window.innerWidth <= 768;

  const location = useLocation();
  const user = location.state?.user; // Access user data passed via route state

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log("Toggling sidebar", isSidebarOpen ? "Closed" : "Opened");
  };

  const handleClick = (item, isMainNav) => {
    console.log("Handle click:", item);
    setActiveItem(item !== activeItem ? item : ""); // Toggle active item
    if (isMainNav && isMobile) {
      setIsSidebarOpen(false); // Close sidebar when a main nav button is clicked on mobile
    }
  };

  const handleSubItemClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false); // Close sidebar when a main nav button is clicked on mobile
    } // Close sidebar when a subnav item is clicked
  };

  return (
    <div>
      <div className="headerScroll">
        <NavHeader
          user={user}
          fixed="top"
          handleToggle={handleToggle}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="pos d-flex">
          <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            {UserMenuItems.map((item) => (
              <div key={item.name}>
                <NavButton
                  onClick={() => handleClick(item.name, !item.items)}
                  name={item.name}
                  icon={item.icon}
                  isActive={activeItem === item.name}
                  hasSubNav={!!item.items}
                />
                {item.items && (
                  <SubMenu
                    activeItem={activeItem}
                    handleClick={(itemName) => {
                      handleSubItemClick();
                      handleClick(itemName, false);
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
                {/* Conditionally render content based on activeItem */}
                {UserMenuItems.map(
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

export default UserDashboard;

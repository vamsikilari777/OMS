import React, { useState, useEffect } from "react";
import "../../assets/css/MainPage.css";
import { useLocation } from "react-router-dom";
import NavButton from "../../components/NavButton";
import NavHeader from "../../components/NavHeader";
import SubMenu from "../../components/SubMenu";
import UserMenuItems from "../../utils/UserMenuItems";
import { useMediaQuery } from "@react-hook/media-query";

const UserDashboard = () => {
  const [activeItem, setActiveItem] = useState(UserMenuItems[0]?.name);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const location = useLocation();
  const user = location.state?.user; // Access user data passed via route state

  // Use useMediaQuery hook to detect mobile devices
  const isMobile = useMediaQuery("(max-width: 768px)");

    // Effect hook to close sidebar when mobile device is detected
    useEffect(() => {
      if (isMobile) {
        setIsSidebarOpen(false);
      }
    }, [isMobile]);

  const handleClick = (item, isMainNav) => {
    console.log("Handle click:", item);
    setActiveItem(item);
    if (isMobile) {
      setIsSidebarOpen(false); // Close sidebar when clicking any menu button on mobile
    }
  };

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log("Toggling sidebar", isSidebarOpen ? "Closed" : "Opened");
  };

  const handleSubItemClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false); // Close sidebar when a main nav button is clicked on mobile
    } 
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

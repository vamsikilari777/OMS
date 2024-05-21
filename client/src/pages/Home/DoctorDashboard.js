import React, { useState, useEffect } from "react";
import "../../assets/css/MainPage.css";
import { useLocation } from "react-router-dom";
import NavButton from "../../components/NavButton";
import NavHeader from "../../components/NavHeader";
import SubMenu from "../../components/SubMenu";
import DoctorItems from "../../utils/DoctorItems";

//Doctor dashboard component
const DoctorDashboard = () => {
  const [activeItem, setActiveItem] = useState(DoctorItems[0]?.name);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const isMobile = window.innerWidth <= 768;

  const location = useLocation();
  const user = location.state?.user; // Access user data passed via route state

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      setIsSidebarOpen(false); // Close sidebar when a subnav item is clicked
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
            {DoctorItems.map((item) => (
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
                {DoctorItems.map(
                  (item) =>
                    activeItem === item.name && (
                      <div key={item.path}>
                        <div className="pt-2">{item.path}</div>
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

export default DoctorDashboard;

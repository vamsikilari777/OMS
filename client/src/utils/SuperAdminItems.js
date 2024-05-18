import Dashboard from "../pages/SuperAdminDashboard/DashboardPage.js";
import RegisterHospital from "../pages/SuperAdminDashboard/RegisterHospital.js";
import UserDetails from "../pages/SuperAdminDashboard/UserDetails.js";
//import ProfileSettings from '../pages/SuperAdminDashboard/ProfileSettings.js';
import Notification from "../pages/SuperAdminDashboard/Notification.js";

const menuItems = [
  {
    name: "Dashboard",
    icon: "dashboard",
    path: <Dashboard />,
  },
  {
    name: "Hospital Management",
    icon: "local_hospital",
    path: <RegisterHospital />,
  },
  {
    name: "User Accounts Management",
    icon: "account_circle",
    path: <UserDetails />,
  },
  // {
  //   name: "Profile Settings",
  //   icon: "settings_circle",
  //   path:<ProfileSettings/>
  // },
  {
    name: "Notifications",
    icon: "settings",
    path: <Notification />,
  },
  // {
  //   name: "Compliance and Security",
  //   icon: "security",
  //   path: <TestPage/>
  // },
  // {
  //   name: "Support and Maintenance",
  //   icon: "build",
  //   items: ["Display" , "Editor", "Theme", "Interface"],
  // }
];

export default menuItems;

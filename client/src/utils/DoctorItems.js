import PatientManagement from "../pages/Doctor/PatientManagement.js";
import AppointmentPage from "../pages/Doctor/Appointmentpage.js";
import DoctorDashboard from "../pages/Doctor/DoctorDashboard.js";
import MedicalReports from "../pages/Doctor/MedicalReports.js";

const menuItems = [
  {
    name: "Dashboard",
    icon: "dashboard",
    path: <DoctorDashboard />,
  },
  {
    name: "Appointments",
    icon: "account_circle",
    path: <AppointmentPage />,
  },
  {
    name: "Patient List",
    icon: "local_hospital",
    path: <PatientManagement />,
  },
  {
    name: "Reports",
    icon: "settings_circle",
    path: <MedicalReports />,
  },
  // {
  //   name: "Messaging",
  //   icon: "settings_circle",
  //   path:<ProfileSettings/>
  // }
];
export default menuItems;

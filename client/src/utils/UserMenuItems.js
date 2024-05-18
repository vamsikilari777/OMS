import Dashboard from "../pages/User/Dashboard";
import MedicalRecord from "../pages/User/MedicalReport";
import Support from "../pages/User/Support";
import Appointments from "../pages/User/BookAppointment";

const menuItems = [
  {
    name: "Dashboard",
    icon: "dashboard",
    path: <Dashboard />,
  },
  {
    name: "Book Appointment",
    icon: "book_online",
    path: <Appointments />,
  },
  {
    name: "Medical Report",
    icon: "playlist_add_check_circle_outlined",
    path: <MedicalRecord />,
  },
  // {
  //   name: "Billing",
  //   icon: "currency_rupee_outlined",
  //   path: <NotificationsPage/>

  // },
  {
    name: "Support",
    icon: "forum_outlined",
    path: <Support />,
  },
];

export default menuItems;

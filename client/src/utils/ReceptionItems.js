import Appointments from "../pages/Reception/AppointmentSchedulingPage.js";
import BillingAndPaymentsPage from "../pages/Reception/BillingAndPaymentsPage .js";
import NotificationsPage from "../pages/Reception/NotificationsPage .js";
import PatientCheckInOutPage from "../pages/Reception/PatientCheckInOutPage.js";
import PatientRecordsPage from "../pages/Reception/PatientRecordsPage.js";

const ReceptionItems = [
  {
    name: "Appointment",
    icon: "book_online",
    path: <Appointments />,
  },
  {
    name: "Check-In/Out",
    icon: "check_in_out",
    path: <PatientCheckInOutPage />,
  },
  {
    name: "Patient Records",
    icon: "playlist_add_check_circle",
    path: <PatientRecordsPage />,
  },
  {
    name: "Billing and Payments",
    icon: "payments",
    path: <BillingAndPaymentsPage />,
  },
  {
    name: "Notifications",
    icon: "notification_important",
    path: <NotificationsPage />,
  },
];

export default ReceptionItems;

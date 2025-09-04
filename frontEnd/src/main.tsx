import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import Feedback from "./pages/admin/Feedback.tsx";
import ManagePatients from "./pages/admin/ManagePatients.tsx";
import ManageStaff from "./pages/admin/ManageStaff.tsx";
import Notifications from "./pages/admin/Notifications.tsx";
import Reports from "./pages/admin/Reports.tsx";
import PatientFeedback from "./pages/patient/PatientFeedback.tsx";
import MyAppointments from "./pages/patient/MyAppointments.tsx";
import PatientDashboard from "./pages/patient/PatientDashboard.tsx";
import AppointmentSchedule from "./pages/staff/AppointmentSchedule.tsx";
import StaffMessages from "./pages/staff/StaffMessages.tsx";
import PatientList from "./pages/staff/PatientList.tsx";
import StaffDashboard from "./pages/staff/StaffDashboard.tsx";
import StaffProfile from "./pages/staff/StaffProfile.tsx";
import NotFound from "./NotFound.tsx";
import StaffNotifications from "./pages/staff/StaffNotifications.tsx";
import StaffPerscriptions from "./pages/staff/StaffPerscriptions.tsx";
import AddStaffForm from "./components/forms/addStaffForm.tsx";
import EditStaffForm from "./components/forms/editStaffForm.tsx";
import AppointmentAddingForm from "./components/forms/appointmentAddingForm.tsx";
import AddPrescriptionForm from "./components/forms/addPerscriptionForm.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/feedback", element: <Feedback /> },
  { path: "/managePatients", element: <ManagePatients /> },
  { path: "/manageStaff", element: <ManageStaff /> },
  { path: "/notifications", element: <Notifications /> },
  { path: "/reports", element: <Reports /> },
  { path: "/patientFeedback", element: <PatientFeedback /> },
  { path: "/myAppointments", element: <MyAppointments /> },
  { path: "/patientDashboard", element: <PatientDashboard /> },
  { path: "/appointmentSchedule", element: <AppointmentSchedule /> },
  { path: "/staffMessages", element: <StaffMessages /> },
  { path: "/patientList", element: <PatientList /> },
  { path: "/staffDashboard", element: <StaffDashboard /> },
  { path: "/staffNotification", element: <StaffNotifications /> },
  { path: "/patientLists", element: <PatientList /> },
  { path: "/staffMessages", element: <StaffMessages /> },
  { path: "/staffPrescriptions", element: <StaffPerscriptions /> },
  { path: "/staffProfile", element: <StaffProfile /> },
  { path: "/addStaff", element: <AddStaffForm /> },
  { path: "/appointmentAddingForm", element: <AppointmentAddingForm /> },
  { path: "/addPrescriptionForm", element: <AddPrescriptionForm /> },
  { path: "/editStaffForm/:id", element: <EditStaffForm /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

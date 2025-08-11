import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./NotFound.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import Feedback from "./pages/admin/Feedback.tsx";
import ManagePatients from "./pages/admin/ManagePatients.tsx";
import ManageStaff from "./pages/admin/ManageStaff.tsx";
import ManageUsers from "./pages/admin/ManageUsers.tsx";
import Notifications from "./pages/admin/Notifications.tsx";
import Reports from "./pages/admin/Reports.tsx";
import PatientFeedback from "./pages/patient/PatientFeedback.tsx";
import LabResults from "./pages/patient/LabResults.tsx";
import MedicalHistory from "./pages/patient/MedicalHistory.tsx";
import Messages from "./pages/staff/StaffMessages.tsx";
import MyAppointments from "./pages/patient/MyAppointments.tsx";
import PatientDashboard from "./pages/patient/PatientDashboard.tsx";
import PatientNotifications from "./pages/patient/PatientNotifications.tsx";
import Prescriptions from "./pages/staff/Prescriptions.tsx";
import Profile from "./pages/patient/Profile.tsx";
import AppointmentSchedule from "./pages/staff/AppointmentSchedule.tsx";
import StaffMessages from "./pages/staff/StaffMessages.tsx";
import PatientList from "./pages/staff/PatientList.tsx";
import PatientRecords from "./pages/staff/PatientRecords.tsx";
import StaffDashboard from "./pages/staff/StaffDashboard.tsx";
import StaffProfile from "./pages/staff/StaffProfile.tsx";
import Settings from "./pages/admin/Settings.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/feedback", element: <Feedback /> },
  { path: "/managePatients", element: <ManagePatients /> },
  { path: "/manageStaff", element: <ManageStaff /> },
  { path: "/manageUsers", element: <ManageUsers /> },
  { path: "/notifications", element: <Notifications /> },
  { path: "/reports", element: <Reports /> },
  { path: "/setting", element: <Settings /> },
  { path: "/patientFeedback", element: <PatientFeedback /> },
  { path: "/labResults", element: <LabResults /> },
  { path: "/medicalHistory", element: <MedicalHistory /> },
  { path: "/messages", element: <Messages /> },
  { path: "/myAppointments", element: <MyAppointments /> },
  { path: "/patientDashboard", element: <PatientDashboard /> },
  { path: "/patientNotification", element: <PatientNotifications /> },
  { path: "/prescriptions", element: <Prescriptions /> },
  { path: "profile", element: <Profile /> },
  { path: "/appointmentSchedule", element: <AppointmentSchedule /> },
  { path: "/staffMessages", element: <StaffMessages /> },
  { path: "/patientList", element: <PatientList /> },
  { path: "/patientRecords", element: <PatientRecords /> },
  { path: "/staffDashboard", element: <StaffDashboard /> },
  { path: "/staffProfile", element: <StaffProfile /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

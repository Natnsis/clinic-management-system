import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import Admin from "./pages/dashboard/Admin.tsx";
import SearchStaff from "./pages/staff/SearchStaff.tsx";
import Search from "./pages/students/Search.tsx";
import GetTreatment from "./pages/treatments/GetTreatment.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/admin", element: <Admin /> },
  { path: "/students", element: <Search /> },
  { path: "/staff", element: <SearchStaff /> },
  { path: "/treatments", element: <GetTreatment /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

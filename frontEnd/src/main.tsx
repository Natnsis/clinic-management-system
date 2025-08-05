import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./NotFound.tsx";
import Dashboard from "./pages/Dashboard.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {path:"/dashboard/:id", element:<Dashboard/>},
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

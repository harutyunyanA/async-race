import { createBrowserRouter } from "react-router-dom";
import Garage from "../pages/garage.tsx";
import Winners from "../pages/winners.tsx";
import MainLayout from "../layout/layout.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Garage />, index: true },
      { path: "/winners", element: <Winners /> },
    ],
  },
]);

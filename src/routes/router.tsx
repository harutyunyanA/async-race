import { createBrowserRouter } from "react-router-dom";
import { Garage } from "../pages/garage";
import { Winners } from "../pages/winners";
import { MainLayout } from "../layout/layout";

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

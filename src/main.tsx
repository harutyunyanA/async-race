import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";
import "./index.css";

const element = document.getElementById("root");

if (!element) {
  throw new Error("Root element not found");
}

createRoot(element).render(<RouterProvider router={router} />);

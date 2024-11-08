import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateTrip } from "./create-trip";
import { ViewTrip } from "./view-trip/[tripId]";
import { Header } from "@/components/custom/Header";
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { MyTrips } from "./my-trips";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/view-trip/:tripId",
    element: <ViewTrip />,
  },
  {
    path: "/my-trips",
    element: <MyTrips />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="min-h-screen">
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
      >
        <Header />
        <Toaster />
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </div>
  </StrictMode>
);

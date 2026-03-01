import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { AdminPanel } from "./components/admin/AdminPanel";

export const router = createBrowserRouter([
  { path: "/", Component: LandingPage },
  { path: "/admin", Component: AdminPanel },
]);

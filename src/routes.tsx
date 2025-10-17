import { createBrowserRouter, Navigate } from "react-router-dom";

import { AppLayout } from "./pages/_layouts/app";
import { NotFound } from "./pages/404";

import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";

import { AuthLayout } from "./pages/_layouts/auth";
import { Tickets } from "./pages/tickets";
import { Dashboard } from "./pages/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/tickets",
        element: <Tickets />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Navigate to="/sign-in" replace /> },
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
    ],
  },
]);

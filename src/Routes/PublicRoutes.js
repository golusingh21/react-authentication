import React from 'react';
import { Navigate } from 'react-router';
const Register = React.lazy(() => import("../Pages/Auth/Register"));
const Login = React.lazy(() => import("../Pages/Auth/Login"));

const PublicRoutes = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "*",
      element: <MissingRoute />,
    },
]

/**
 * @NAVIGATE_TO_LOGIN
 * Below method will redirect to login page if path is missing/not defined
 */
function MissingRoute() {
  return <Navigate to={{pathname: '/'}} />
 }

export default PublicRoutes;
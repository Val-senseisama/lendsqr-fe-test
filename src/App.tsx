import React, { lazy, Suspense, useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RouteError from "./components/UI/RouteError";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/UI/ProtectedRoute";
import PageLoader from "./components/UI/PageLoader";
import AppErrorBoundary from "./components/UI/AppErrorBoundary";

const Login = lazy(() => import("./pages/Login/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const UsersPage = lazy(() => import("./pages/Users/UsersPage"));

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <Login />, errorElement: <RouteError /> },
  {
    element: <ProtectedRoute />,
    errorElement: <RouteError />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/users", element: <UsersPage /> },
      { path: "*", element: <Navigate to="/dashboard" replace /> },
    ],
  },
]);

const App: React.FC = () => {
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  return (
    <AppErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AppErrorBoundary>
  );
};

export default App;

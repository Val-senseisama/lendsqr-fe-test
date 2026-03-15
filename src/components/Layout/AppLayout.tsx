import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "../UI/ErrorBoundary";

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={`app-layout ${sidebarOpen ? "sidebar-open" : ""}`}>
      <Navbar onMenuClick={toggleSidebar} />
      <div className="layout-body">
        <Sidebar />
        <div className="sidebar-overlay" onClick={closeSidebar} />
        <main className="main-content">
          <div className="page-transition-wrapper">
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

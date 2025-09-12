// src/components/MentorDashboard/MentorDashboardLayout.jsx
import React, { useState } from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MentorDashboardLayout = () => {
const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar/Navbar */}
      <Navbar />

      {/* Content Area */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        <main className="flex-1 py-12 px-8 text-center bg-gray-50 text-gray-900 font-sans">
          {/* This is where child pages will render */}
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MentorDashboardLayout;

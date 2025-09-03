// src/components/MentorDashboard/MentorDashboardLayout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MentorDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar/Navbar */}
      <Navbar />

      {/* Content Area */}
      <div className="flex flex-col flex-1">
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

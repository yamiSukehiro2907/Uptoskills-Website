// src/components/Navbar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Users,
  Folder,
  BarChart3,
  MessageSquare,
} from "lucide-react";

const Navbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

const menuItems = [
  { name: "Dashboard", icon: <Home size={18} />, path: "/mentor-dashboard" },
  { name: "Students", icon: <Users size={18} />, path: "/mentor-dashboard/multi-student" },
  { name: "Projects", icon: <Folder size={18} />, path: "/mentor-dashboard/open-source-contributions" },
  { name: "Analytics", icon: <BarChart3 size={18} />, path: "/mentor-dashboard/projects-progress" },
  { name: "Mentor Reviews", icon: <MessageSquare size={18} />, path: "/mentor-dashboard/feedback" },
];


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-[#0D1B2A] text-white h-full transition-all duration-300 ${
          isOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <h1 className="text-xl font-bold text-green-400">UPTOSKILLS</h1>
        </div>

        {/* Menu Items */}
        <nav className="mt-4 flex flex-col space-y-2 px-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/mentor-dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition ${
                  isActive ? "bg-blue-600" : "hover:bg-blue-600"
                }`
              }
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300">
        <div className="p-6">{children}</div>
      </div>

      {/* 🔥 Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white shadow-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default Navbar;
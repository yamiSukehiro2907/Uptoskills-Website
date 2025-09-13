// Navbar.jsx - This should only contain the sidebar component
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./logo.png";


import {
  Menu,
  X,
  Home,
  Users,
  Folder,
  BarChart3,
  MessageSquare,
} from "lucide-react";

  const sidebarItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/mentor-dashboard" },
    { name: "Students", icon: <Users size={18} />, path: "/mentor-dashboard/multi-student" },
    { name: "Projects", icon: <Folder size={18} />, path: "/mentor-dashboard/open-source-contributions" },
    { name: "Analytics", icon: <BarChart3 size={18} />, path: "/mentor-dashboard/projects-progress" },
    { name: "Mentor Reviews", icon: <MessageSquare size={18} />, path: "/mentor-dashboard/feedback" },
  ];

// This component should be named Sidebar, not Navbar
const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isDesktop, setIsDesktop] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const currentItem = sidebarItems.find(item => item.path === location.pathname);
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  }, [location.pathname]);

  useEffect(() => {

    const checkScreen = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) setIsOpen(true);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [setIsOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };



  return (
    <>
      {/* Background overlay for mobile */}
      <AnimatePresence>
        {!isDesktop && isOpen && (
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <motion.aside
        className="fixed top-0 left-0 h-full w-64 shadow-2xl z-40 overflow-hidden"
        initial={{ x: -264 }}
        animate={{ x: isOpen ? 0 : -264 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button (Mobile only) */}
        <AnimatePresence>
          {isOpen && !isDesktop && (
            <motion.button
              key="close-btn"
              className="absolute top-4 right-4 z-50 p-2 text-black hover:text-gray-700"
              onClick={toggleSidebar}
              aria-label="Close Sidebar"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.button>
          )}
        </AnimatePresence>

        <div className="flex flex-col h-full pt-16">
          {/* Logo */}
<div className="flex items-center justify-center h-16 border-b border-gray-700 px-4">
  <img 
    src={logo} 
    alt="UPTOSKILLS Logo"
    className="h-10 object-contain"
  />
</div>

          {/* Navigation Items */}
          <nav className="flex-1 pt-6 px-4">
            <div className="space-y-1">
              {sidebarItems.map((item, index) => (
                <motion.button
                  key={item.name}

                  className={`
                    sidebar-item w-full flex items-center gap-4 p-4 rounded-2xl 
                    transition-all duration-200 ease-out relative overflow-hidden
                    group cursor-pointer select-none
                    ${activeItem === item.name
                      ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-xl shadow-blue-400/30"
                      : "hover:bg-gradient-to-r hover:from-gray-50/10 hover:to-gray-100/10 text-gray-300 hover:text-700"
                    }
                  `}
                  onClick={() => {
                    setActiveItem(item.name);
                    navigate(item.path);
                    if (!isDesktop) setIsOpen(false);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.03,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    x: 8,
                    scale: 1.03,
                    transition: { duration: 0.15, ease: "easeOut" },
                  }}
                  whileTap={{
                    scale: 0.97,
                    transition: { duration: 0.1, ease: "easeInOut" },
                  }}
                >
                  {/* Icon */}
                  <motion.div className="relative z-10 flex items-center justify-center">
                    {React.cloneElement(item.icon, {
                      className: `w-6 h-6 transition-all duration-200 ${activeItem === item.name
                        ? "text-white drop-shadow-md"
                        : "text-gray-700 group-hover:text-primary"
                        }`,
                    })}
                  </motion.div>


                  {/* Active indicator – left side */}
                  {activeItem === item.name && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-white rounded-r-full"
                      layoutId="activeIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        duration: 0.2,
                      }}
                    />
                  )}

                  {/* Right-side rounded end coverage for active item */}
                  {activeItem === item.name && (
                    <motion.div
                      className="absolute right-0 top-0 bottom-0 w-8 bg-white/20 rounded-l-full backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        duration: 0.3,
                      }}
                    />
                  )}

                  {/* Bold white rounded shape at the end */}
                  {activeItem === item.name && (
                    <motion.div
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white/30 rounded-full border-2 border-white/40 backdrop-blur-md"
                      initial={{ opacity: 0, x: 10, scale: 0 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                        delay: 0.1,
                        duration: 0.4,
                      }}
                    >
                      {/* Inner dot for extra emphasis */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 600,
                          damping: 15,
                        }}
                      />
                    </motion.div>
                  )}

                  {/* Text */}
                  <motion.span
                    className={`
                      font-bold relative z-10 transition-all duration-200
                      ${activeItem === item.name
                        ? "text-white drop-shadow-md tracking-wide"
                        : "text-black group-hover:text-gray-900"
                      }
                    `}
                    whileHover={{
                      x: 3,
                      transition: { duration: 0.15 },
                    }}
                  >
                    {item.name}
                  </motion.span>
                </motion.button>
              ))}
            </div>
          </nav>

        </div>
      </motion.aside>

      <div
        className={`transition-all duration-300 ${isOpen && isDesktop ? "ml-64" : "ml-0"
          }`}
      >
        {children}
      </div>
      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white shadow-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </>
  );
};


export default Navbar;


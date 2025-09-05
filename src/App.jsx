// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ===== Landing Page Components (moved inside components/AboutPage) =====
import Header from './components/AboutPage/Header';
import HeroSection from './components/AboutPage/HeroSection';
import AboutSection from './components/AboutPage/AboutSection';
import ProgramsSection from './components/AboutPage/ProgramsSection';
import Footer from './components/AboutPage/Footer';

// ===== Pages =====
import Landing from './pages/Landing';
import Student_Dashboard from "./pages/Student_Dashboard";
import EditProfilePage from './components/Student_Dashboard/EditProfile/EditProfilePage';
import UserProfilePage from './components/Student_Dashboard/UserProfilePage';
import MyProjects from './components/Student_Dashboard/myProjects/MyProjects';
import SkillBadgeForm from './components/Student_Dashboard/SkillBadges/SkillBadgeForm';
import NotificationsPage from './components/Student_Dashboard/NotificationsPage/NotificationsPage';
import LoginForm from './pages/Login';
import RegistrationForm from './pages/Register';
import CompanyDashboardHome from "./pages/Index";
import CompanyNotFound from "./pages/NotFound"; 
import ContactPage from './pages/ContactPage';
import ProjectShowcasePage from './pages/ProjectShowcasePage';
import MentorDashboardRoutes from './pages/MentorDashboardRoutes';
import AdminPanel from './pages/AdminPanel';

const queryClient = new QueryClient();

// ===== Landing Page Wrapper =====
const LandingPage = () => (
  <div>
    <Header />
    <HeroSection />
    <AboutSection />
    <ProgramsSection />
    <Footer />
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* ===== Landing Page ===== */}
          <Route path="/" element={<LandingPage />} />

          {/* ===== Student Dashboard Routes ===== */}
          <Route path="/dashboard" element={<Student_Dashboard />} />
          <Route path="/dashboard/profile" element={<UserProfilePage />} />
          <Route path="/dashboard/edit-profile" element={<EditProfilePage />} />
          <Route path="/dashboard/my-projects" element={<MyProjects />} />
          <Route path="/dashboard/skill-badges" element={<SkillBadgeForm />} />
          <Route path="/dashboard/notifications" element={<NotificationsPage />} />

          {/* ===== Auth Routes ===== */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />

          {/* ===== Company Dashboard Routes ===== */}
          <Route path="/company" element={<CompanyDashboardHome />} />
          <Route path="/company/*" element={<CompanyNotFound />} />

          {/* ===== Contact Page ===== */}
          <Route path="/contact" element={<ContactPage />} />

          {/* ===== Project Showcase ===== */}
          <Route path="/projectShowcase" element={<ProjectShowcasePage />} />

          {/* ===== Mentor Dashboard ===== */}
          <Route path="/mentor-dashboard/*" element={<MentorDashboardRoutes />} />

          {/* ===== Admin Panel ===== */}
          <Route path="/adminPanel" element={<AdminPanel />} />

          {/* ===== Catch-All ===== */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

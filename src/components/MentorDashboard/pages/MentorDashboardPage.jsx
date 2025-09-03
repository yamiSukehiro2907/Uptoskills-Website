import React from "react";
import DashboardCard from "../components/DashboardCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export const MentorDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar/Navbar */}
      <Navbar />

      {/* Right Side Content */}
      <div className="flex-1 p-8 bg-gray-50">
        {/* Centered Heading */}
        <h1 className="text-4xl font-bold mb-8 text-center">
          Mentor Dashboard
        </h1>

        <div className="flex flex-wrap justify-center gap-6">
          <DashboardCard
            icon="📈"
            title="Projects Progress"
            description="Monitor the ongoing and completed projects of your students in real-time."
            onClick={() => navigate("projects-progress")}
          />
          <DashboardCard
            icon="🌐"
            title="Open Source Contributions"
            description="Review your student’s pull requests, commits, and activity on open source platforms."
            onClick={() => navigate("open-source-contributions")}
          />
          <DashboardCard
            icon="📝"
            title="Feedback & Approvals"
            description="Give personalized feedback and approve submitted milestones with ease."
            onClick={() => navigate("feedback")}
          />
          <DashboardCard
            icon="👥"
            title="Multi-Student View"
            description="Easily toggle between multiple students to evaluate and mentor efficiently."
            onClick={() => navigate("multi-student")}
          />
        </div>
      </div>
    </div>
  );
};

export default MentorDashboardPage;

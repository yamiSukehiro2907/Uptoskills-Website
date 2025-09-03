import React from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import {
  FaBook,
  FaLaptopCode,
  FaCamera,
  FaPalette,
  FaMicrophone,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

// Dummy Data
const courseProgressData = [
  { name: "User Experience Design", value: 72, tasks: 120, color: "#8884d8" },
  { name: "Basic Fundamentals", value: 48, tasks: 32, color: "#82ca9d" },
  { name: "React Native Components", value: 15, tasks: 182, color: "#ffc658" },
  { name: "Basic of Music Theory", value: 28, tasks: 58, color: "#ff7300" },
];

const topicInterestData = [
  { name: "Development", value: 35, language: "Java", langValue: 20 },
  { name: "UI/UX Design", value: 14, language: "Material", langValue: 12 },
  { name: "React", value: 10, language: "SEO, SMM", langValue: 25 },
];

const popularInstructors = [
  { name: "Maven Analytics", courses: 33, role: "Business Intelligence" },
  { name: "Maven Analytics", courses: 22, role: "Data Analytics" },
  { name: "Maven Analytics", courses: 18, role: "React Native" },
];

const PIE_COLORS = [
  "rgba(254, 109, 53,0.5)",
  "rgba(0, 208, 181,0.5)",
  "rgba(76, 175, 80, 0.5)",
  "rgba(244, 67, 54, 0.5)",
];

const DashboardMain = () => {
  const handleDropdownChange = (e, sectionName) => {
    console.log(`Dropdown in ${sectionName} changed to:`, e.target.value);
  };

  const handleCourseItemClick = (courseName) => {
    console.log(`Course item clicked: ${courseName}`);
  };

  const handleJoinEventClick = () => {
    console.log("Join The Event button clicked!");
  };

  return (
    <main className="flex-grow p-4 sm:p-6 flex flex-col gap-6">
      {/* Stats Overview */}
      <section className="mb-8">
        <motion.h2
          className="text-2xl font-bold text-foreground mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Platform Overview
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Students", value: "563k", icon: FaUserGraduate, color: "primary", delay: 0.1 },
            { title: "Total Teachers", value: "469", icon: FaChalkboardTeacher, color: "secondary", delay: 0.2 },
            { title: "Total Earning", value: "$563k", icon: FaMoneyBillWave, color: "accent", delay: 0.3 },
            { title: "Total Cost", value: "$264k", icon: FaMoneyCheckAlt, color: "success", delay: 0.4 },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              className="stat-card p-6 flex items-center gap-4 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: stat.delay, duration: 0.5 }}
            >
              <motion.div 
                className={`p-3 rounded-2xl bg-gradient-${stat.color}`}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-muted-foreground">{stat.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Top Courses & Assignment Progress */}
      <section className="flex flex-col lg:flex-row gap-6">
        {/* Top Courses */}
        <div className="flex-1 stat-card p-6">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">
              Top Courses
            </h3>
            <motion.select
              className="px-3 py-2 rounded-xl border-2 border-border bg-card text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
              onChange={(e) => handleDropdownChange(e, "Top Courses")}
              whileHover={{ scale: 1.02 }}
            >
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
            </motion.select>
          </div>

          <ul className="space-y-3">
            {[
              {
                name: "Videography Basic Design Course",
                views: "1.2K Views",
                icon: <FaBook />,
                color: "rgba(106, 98, 255, 0.9)",
                bg: "rgba(106, 98, 255, 0.4)",
              },
              {
                name: "Basic Front-end Development Course",
                views: "1.5K Views",
                icon: <FaLaptopCode />,
                color: "rgba(255, 187, 40, 0.8)",
                bg: "rgba(255, 187, 40, 0.2)",
              },
              {
                name: "Basic Fundamentals of Photography",
                views: "978 Views",
                icon: <FaCamera />,
                color: "rgba(76, 175, 80, 0.8)",
                bg: "rgba(76, 175, 80, 0.2)",
              },
              {
                name: "Advance Dribble Base Visual Design",
                views: "765 Views",
                icon: <FaPalette />,
                color: "rgba(244, 67, 54, 0.8)",
                bg: "rgba(244, 67, 54, 0.2)",
              },
              {
                name: "Your First Singing Lesson",
                views: "3.4K Views",
                icon: <FaMicrophone />,
                color: "rgba(0, 255, 255, 1)",
                bg: "rgba(0, 255, 255, 0.2)",
              },
            ].map((course, index) => (
              <motion.li
                key={index}
                className="flex justify-between items-center p-4 border-b border-border cursor-pointer rounded-xl group"
                onClick={() => handleCourseItemClick(course.name)}
                whileHover={{ 
                  backgroundColor: "hsl(var(--muted))",
                  x: 4,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2.5 font-medium text-base">
                  <span
                    className="flex justify-center items-center text-xl rounded-md"
                    style={{
                      padding: "0.5rem",
                      width: "2.5rem",
                      color: course.color,
                      backgroundColor: course.bg,
                    }}
                  >
                    {course.icon}
                  </span>
                  <span>{course.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {course.views}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Assignment Progress */}
        <div className="flex-1 stat-card p-6">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">
              Assignment Progress
            </h3>
            <motion.select
              className="px-3 py-2 rounded-xl border-2 border-border bg-card text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
              onChange={(e) => handleDropdownChange(e, "Assignment Progress")}
              whileHover={{ scale: 1.02 }}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
            </motion.select>
          </div>

          <div className="flex flex-col gap-4">
            {courseProgressData.map((data, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex justify-between mb-1 font-medium text-foreground">
                  <span>{data.name}</span>
                  <span>{data.tasks} Tasks</span>
                </div>

                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.value}%` }}
                    transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                  />
                </div>

                <div className="text-right text-xs text-gray-600 mt-1">
                  {data.value}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Webinar Section */}
      <section className="stat-card flex flex-col md:flex-row p-6 gap-4 md:gap-6">
        <img
          className="w-full md:w-[200px] h-40 md:h-32 object-cover rounded-xl shadow-md"
          src="https://img.freepik.com/free-vector/webinar-concept-with-laughing-man_23-2147759429.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Webinar"
        />

        <div className="flex flex-col justify-center flex-1">
          <h3 className="text-lg font-semibold mb-1">Upcoming Webinar</h3>
          <p className="text-base font-medium text-gray-800 leading-relaxed mb-3">
            Next Generation Frontend Architecture Using Layout Engine and React
            Native
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
            <span>📅 17 Nov 23</span>
            <span>👨‍💻 32 minutes</span>
          </div>
          <button
            className="bg-[#00bda5] text-white px-5 py-2 rounded-lg font-semibold text-sm shadow-md hover:bg-[#fe6d35] transition-colors w-full sm:w-auto"
            onClick={handleJoinEventClick}
          >
            🗓️ Join The Event
          </button>
        </div>
      </section>

      {/* Graphs Section: Topic Interest & Popular Instructors */}
      <section className="flex flex-col lg:flex-row gap-6 lg:gap-8 p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
        {/* Topic Interest */}
        <div className="flex-1 stat-card p-6">
          <h3 className="text-lg font-semibold mb-4">
            Topics You Are Interested In
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={topicInterestData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                labelLine={false}
              >
                {topicInterestData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-col gap-3 mt-4">
            {topicInterestData.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap items-center gap-2 p-2 shadow-[0_2px_6px_rgba(0,0,0,0.05)] rounded"
              >
                <span
                  className="w-5 h-3 rounded"
                  style={{
                    backgroundColor: PIE_COLORS[index % PIE_COLORS.length],
                  }}
                />
                <span className="font-semibold">{item.name}</span>
                <span className="font-medium text-zinc-700">{item.value}%</span>
                {item.language && (
                  <span className="text-xs text-gray-600 opacity-70">
                    ({item.language} {item.langValue}%)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Popular Instructors */}
        <div className="flex-1 stat-card p-6 overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Popular Instructors</h3>
            <select
              className="px-2 py-1.5 rounded border border-gray-300 text-sm"
              onChange={(e) => handleDropdownChange(e, "Popular Instructors")}
            >
              <option value="all">All</option>
              <option value="new">New</option>
            </select>
          </div>

          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left pb-2 border-b border-gray-200">
                  INSTRUCTORS
                </th>
                <th className="text-left pb-2 border-b border-gray-200">
                  COURSES
                </th>
              </tr>
            </thead>
            <tbody>
              {popularInstructors.map((instructor, index) => (
                <tr
                  key={index}
                  className="hover:bg-[rgba(254,109,53,0.1)] transition-colors"
                >
                  <td className="py-2 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <FaChalkboardTeacher className="text-[#00d0b5] text-2xl" />
                      <div>
                        <p className="font-medium m-0">{instructor.name}</p>
                        <small className="text-gray-500 text-xs">
                          {instructor.role}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 border-b border-gray-200">
                    {instructor.courses}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default DashboardMain;

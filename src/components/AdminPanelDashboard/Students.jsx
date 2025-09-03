import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Clock, TrendingUp, CheckCircle, XCircle, Search } from "lucide-react";

function Students() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Amit Kumar",
      status: "pending",
      activity: "Logged in 2 days ago",
      progress: 75,
      lastLogin: "2025-07-19",
    },
    {
      id: 2,
      name: "Sneha Patel",
      status: "approved",
      activity: "Completed task 3",
      progress: 90,
      lastLogin: "2025-07-20",
    },
    {
      id: 3,
      name: "Rahul Mehta",
      status: "rejected",
      activity: "No recent activity",
      progress: 10,
      lastLogin: "2025-07-10",
    },
    {
      id: 4,
      name: "Priya Singh",
      status: "approved",
      activity: "Submitted final project",
      progress: 95,
      lastLogin: "2025-07-21",
    },
    {
      id: 5,
      name: "Mohit Sharma",
      status: "pending",
      activity: "Started new course",
      progress: 30,
      lastLogin: "2025-07-18",
    },
  ]);
  const handleStudentApproval = (id, action) => {
    const updated = students.map((student) =>
      student.id === id ? { ...student, status: action } : student
    );
    setStudents(updated);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const getActivityDetails = (student) => (
    <ul className="list-none p-0 mt-2 mb-4 text-[0.95rem]">
      <li className="mb-1 text-gray-500">Activity: {student.activity}</li>
      <li className="mb-1 text-gray-500">Last Login: {student.lastLogin}</li>
      <li className="mb-1 text-gray-500">
        Progress: <strong>{student.progress}%</strong>
      </li>
    </ul>
  );
  return (
    <main className="p-4 sm:p-6 flex flex-col gap-6">
      <motion.h2
        className="text-2xl font-bold text-foreground mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        Manage Students
      </motion.h2>

      {/* Search Bar */}
      <motion.div
        className="stat-card p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search students..."
            className="input-field pl-12 w-full"
          />
        </div>
      </motion.div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students
          .filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((student, index) => (
            <motion.div
              key={student.id}
              className="stat-card p-6 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-gradient-primary">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{student.name}</h3>
                  <span className={`px-2 py-1 rounded-xl text-xs font-medium ${
                    student.status === "approved" ? "bg-success/20 text-success" :
                    student.status === "rejected" ? "bg-destructive/20 text-destructive" :
                    "bg-warning/20 text-warning"
                  }`}>
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{student.activity}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span>Progress: {student.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${student.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <motion.button
                  onClick={() => handleStudentApproval(student.id, "approved")}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </motion.button>
                <motion.button
                  onClick={() => handleStudentApproval(student.id, "rejected")}
                  className="flex-1 btn-secondary flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </motion.button>
              </div>
            </motion.div>
          ))}
      </div>
    </main>
  );
}

export default Students;

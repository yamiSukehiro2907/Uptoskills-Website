import React, { useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen, User, Users, Plus, Trash2, Award } from "lucide-react";

function Project() {
  const [projects, setProjects] = useState([
    { id: 1, title: "AI Chatbot", mentor: "Dr. Reddy", students: 15 },
    { id: 2, title: "Resume Builder", mentor: "Ms. Sharma", students: 25 },
    { id: 3, title: "Data Analysis Tool", mentor: "Dr. Singh", students: 10 },
  ]);

  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectMentor, setNewProjectMentor] = useState("");
  const [newProjectStudents, setNewProjectStudents] = useState("");
  const addProject = () => {
    if (
      newProjectTitle.trim() &&
      newProjectMentor.trim() &&
      newProjectStudents.trim()
    ) {
      const newId =
        projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
      setProjects([
        ...projects,
        {
          id: newId,
          title: newProjectTitle,
          mentor: newProjectMentor,
          students: parseInt(newProjectStudents, 10) || 0, // Parse as int, default to 0
        },
      ]);
      setNewProjectTitle("");
      setNewProjectMentor("");
      setNewProjectStudents("");
    }
  };
  const updateProjectStudents = (id, newStudentCount) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, students: parseInt(newStudentCount, 10) || 0 }
          : project
      )
    );
  };
  const removeProject = (id) => {
    const filtered = projects.filter((proj) => proj.id !== id);
    setProjects(filtered);
  };
  return (
    <main className="p-4 sm:p-6 flex flex-col gap-6">
      <motion.h2
        className="text-2xl font-bold text-foreground mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        Manage Projects
      </motion.h2>

      {/* Add Project Form */}
      <motion.div
        className="stat-card p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-bold text-foreground mb-4">Add New Project</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Project Title
            </label>
            <input
              type="text"
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
              placeholder="Enter project title..."
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Mentor Name
            </label>
            <input
              type="text"
              value={newProjectMentor}
              onChange={(e) => setNewProjectMentor(e.target.value)}
              placeholder="Enter mentor name..."
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Number of Students
            </label>
            <input
              type="number"
              value={newProjectStudents}
              onChange={(e) => setNewProjectStudents(e.target.value)}
              placeholder="Enter number..."
              min="0"
              className="input-field"
            />
          </div>
        </div>
        <motion.button
          onClick={addProject}
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          Add Project
        </motion.button>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="stat-card p-6 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-accent">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Mentor: {project.mentor}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{project.students} Students</span>
              </div>
            </div>

            <div className="flex gap-2">
              <motion.button
                onClick={() => removeProject(project.id)}
                className="flex-1 btn-secondary flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </motion.button>
              <motion.button
                className="flex-1 btn-primary flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Award className="w-4 h-4" />
                Upskill
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}

export default Project;

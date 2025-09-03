import React, { useState } from 'react';
import Sidebar from '../components/Project_Showcase/Sidebar';
import ProjectShowcase from '../components/Project_Showcase/ProjectShowcase';
import Footer from '../components/Project_Showcase/Footer';
import { Menu } from 'lucide-react';
function ProjectShowcasePage() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <>
      {/* Sidebar */}
      <Sidebar isSidebarVisible={isSidebarVisible} setIsSidebarVisible={setIsSidebarVisible} />

      {/* Main Content */}
      <div className={`${isSidebarVisible ? "ml-[240px]" : "ml-0"} flex flex-col min-h-screen transition-all duration-300`}>
        {/* Header fixed */}
        <header className="sticky top-0 z-30 bg-slate-50 text-3xl sm:text-4xl md:text-5xl font-extrabold text-center py-6 sm:py-8 tracking-wide shadow-md border-b-4 border-[#00b2a9] flex items-center justify-center relative">
          
          {/* Hamburger Button */}
          <button
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            className="absolute left-4 p-2 rounded-lg hover:bg-gray-200"
          >
            <Menu size={28} />
          </button>

          <span className="text-[#f26c3d]">Project</span>
          &nbsp;
          <span className="text-[#00b2a9]">ShowCase</span>
        </header>

        {/* Scrollable Section */}
        <div className="flex-1 overflow-y-auto">
          <ProjectShowcase />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default ProjectShowcasePage;


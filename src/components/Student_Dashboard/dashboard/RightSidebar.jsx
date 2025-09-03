import React from 'react';
import CalendarWidget from './CalendarWidget';

function RightSidebar({ className = '' }) {
  return (
    <div className={`right-sidebar ${className}`}>
      {/* Attendance Section */}
      <div className="attendance-section">
        {/* Attendance Chart */}
        <div className="attendance-widget bg-white rounded-xl shadow p-4 mb-4">
          <div className="widget-header flex justify-between items-center mb-3">
            <h4 className="text-lg font-semibold">Attendance</h4>
            <button className="widget-menu">⋯</button>
          </div>
          <div className="attendance-chart flex items-center justify-between">
            <div className="circular-progress relative">
              <svg width="120" height="120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset="62.8"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="progress-text absolute inset-0 flex items-center justify-center font-semibold text-lg">
                80%
              </div>
            </div>
            <div className="attendance-legend ml-4">
              <div className="legend-item flex items-center gap-2">
                <span className="legend-dot present w-3 h-3 bg-purple-500 rounded-full"></span>
                <span>Present</span>
              </div>
              <div className="legend-item flex items-center gap-2 mt-2">
                <span className="legend-dot absent w-3 h-3 bg-orange-400 rounded-full"></span>
                <span>Absent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar (Dynamic Widget imported) */}
        <CalendarWidget />

        {/* Resources */}
        <div className="resources-widget bg-white rounded-xl shadow p-4 mt-4">
          <div className="widget-header flex justify-between items-center mb-3">
            <h4 className="text-lg font-semibold">Resources</h4>
            <button className="view-all text-blue-500">View All</button>
          </div>
          <div className="resources-grid grid grid-cols-3 gap-4 text-center">
            <div className="resource-item flex flex-col items-center">
              <div className="resource-icon text-2xl">📚</div>
              <span>Books</span>
            </div>
            <div className="resource-item flex flex-col items-center">
              <div className="resource-icon text-2xl">🎥</div>
              <span>Videos</span>
            </div>
            <div className="resource-item flex flex-col items-center">
              <div className="resource-icon text-2xl">📄</div>
              <span>Papers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;

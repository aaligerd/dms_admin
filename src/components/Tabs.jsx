import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Tabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { label: "Send Email", path: "/send-email" },
    // { label: "Add Candidate", path: "/add-newcandidate" },
    // { label: "Set Interview", path: "/set-interview" },
    { label: "Candidate Table", path: "/candidate-table" },
    { label: "Interview Details", path: "/interview-details" },
  ];

  return (
    <div className="ml-3 lg:ml-0 md:ml-0 mt-4 border-b border-gray-300 dark:border-gray-700">
      <div className="overflow-x-auto">
        <div className="ml-8 lg:ml-0 flex gap-6 lg:gap-8 text-sm font-semibold whitespace-nowrap">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;

            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`pb-3 border-b-2 transition-all duration-200 ${isActive
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-indigo-600"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
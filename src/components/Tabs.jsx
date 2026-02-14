import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Tabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { label: "Add Employee", path: "/add-newemployee" },
    { label: "Set Interview", path: "/set-interview" },
    { label: "Employee Table", path: "/employee-table" },
  ];

  return (
    <div className="mt-4 border-b border-gray-300 dark:border-gray-700">
      <div className="flex gap-8 text-sm font-semibold">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;

          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`pb-3 border-b-2 transition-all duration-200 ${
                isActive
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
  );
};

export default Tabs;

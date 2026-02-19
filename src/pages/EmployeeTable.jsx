import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Tabs from "../components/Tabs";
import Modal from "../components/Modal";
import SetInterview from "./SetInterview";

const EmployeeTable = () => {
    const [search, setSearch] = useState("");
    const [actions, setActions] = useState({});
    const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [appliedSearch, setAppliedSearch] = useState("");

    const [employees] = useState([
        {
            id: 1,
            name: "Arka Roy",
            code: "EMP001",
            position: "Frontend Developer",
            company: "Organization One",
            department: "IT",
            status: "Ongoing",
            email: "arka@gmail.com",
            phone_no: "9876543210"
        },
        {
            id: 2,
            name: "Deep Goswami",
            code: "EMP002",
            position: "Backend Developer",
            company: "Organization Two",
            department: "Finance",
            status: "Ongoing",
            email: "deep@gmail.com",
            phone_no: "9632587410"
        },
    ]);

    const handleAction = (id, emp, action) => {
        setActions((prev) => ({
            ...prev,
            [id]: action,
        }));
        if (action === "Interview Scheduled") {
            setSelectedEmployee(emp);
            setIsInterviewModalOpen(true);
        } else {
            alert(`Employee ${emp.id} marked as ${action}`);
        }
    };

    const filteredEmployees = employees.filter(
        (emp) =>
            emp.name.toLowerCase().includes(appliedSearch.toLowerCase()) ||
            emp.code.toLowerCase().includes(appliedSearch.toLowerCase())
    );

    const handleSearch = () => {
        setAppliedSearch(search);
    };

    const handleClearFilters = () => {
        setSearch("");
        setAppliedSearch("");
    };

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">

                <header className="py-4 px-6 bg-white dark:bg-gray-800 border-b shadow-sm">
                    <Tabs />
                </header>

                <main className="flex justify-center p-6">
                    {/* flex-1 overflow-y-auto */}
                    <div className="w-full max-w-7xl lg:max-w-7xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">

                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white lg:-ml-19">
                            Candidate List
                        </h2>

                        <div className="w-full flex justify-center px-4 mb-6">
                            <div className="w-full max-w-3xl rounded-xl p-4 sm:p-6">

                                <div className="flex flex-col lg:flex-row gap-3">

                                    <input
                                        type="text"
                                        placeholder="Search Candidate by Name or Code"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    />

                                   <div className="flex flex-col lg:flex-row gap-3 w-full lg:w-auto">
                                        <button
                                            onClick={handleSearch}
                                            className="w-full lg:w-auto bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                                        >
                                            🔍 Search
                                        </button>

                                        <button
                                            onClick={handleClearFilters}
                                            className="w-full lg:w-auto bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
                                        >
                                            🔄 Clear
                                        </button>

                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="overflow-x-auto border border-black">
                            <table className="min-w-full text-sm text-left">
                                <thead className="bg-indigo-600 text-white">
                                    <tr>
                                        <th className="px-6 py-3">Name</th>
                                        <th className="px-6 py-3">Code</th>
                                        <th className="px-6 py-3">Position</th>
                                        <th className="px-6 py-3">Company</th>
                                        <th className="px-6 py-3">Department</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3">Email</th>
                                        <th className="px-6 py-3">Phone No</th>
                                        <th className="px-6 py-3 text-center">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredEmployees.map((emp) => (
                                        <tr key={emp.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                            <td className="px-6 py-4">{emp.name}</td>
                                            <td className="px-6 py-4">{emp.code}</td>
                                            <td className="px-6 py-4">{emp.position}</td>
                                            <td className="px-6 py-4">{emp.company}</td>
                                            <td className="px-6 py-4">{emp.department}</td>
                                            <td className="px-6 py-4">{emp.status}</td>
                                            <td className="px-6 py-4">{emp.email}</td>
                                            <td className="px-6 py-4">{emp.phone_no}</td>

                                            <td className="px-6 py-4 text-center">
                                                <select
                                                    value={actions[emp.id] || ""}
                                                    onChange={(e) => {
                                                        if (e.target.value) {
                                                            handleAction(emp.id, emp, e.target.value);
                                                        }
                                                    }}
                                                    className="px-3 py-1 text-sm border rounded-md focus:ring focus:ring-indigo-300"
                                                >
                                                    <option value="" disabled>
                                                        Select Action
                                                    </option>
                                                    <option value="Interview Scheduled">
                                                        Schedule Interview
                                                    </option>
                                                    <option value="Accepted">Accept</option>
                                                    <option value="Rejected">Reject</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {filteredEmployees.length === 0 && (
                                <p className="text-center py-6 text-gray-500">
                                    No employees found
                                </p>
                            )}
                        </div>

                    </div>
                </main>
            </div>
            <Modal
                isOpen={isInterviewModalOpen}
                onClose={() => setIsInterviewModalOpen(false)}
                title="Schedule 1st Round Interview"
                maxWidth="max-w-2xl"
            >
                <SetInterview
                    employeeCode={selectedEmployee?.code}
                    onClose={() => setIsInterviewModalOpen(false)}
                />
            </Modal>
        </div>
    )
}

export default EmployeeTable
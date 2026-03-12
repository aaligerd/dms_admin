import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Tabs from "../components/Tabs";
import Modal from "../components/Modal";
import SetInterview from "./SetInterview";
import axios from "axios";
import CandidateDetails from "./CandidateDetails";
import { IoMdArrowDroprightCircle, IoMdArrowDropleftCircle } from "react-icons/io";

const EmployeeTable = () => {
    const [search, setSearch] = useState("");
    const [actions, setActions] = useState({});
    const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [appliedSearch, setAppliedSearch] = useState("");
    const [employees, setEmployees] = useState([]);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/candidate/`
            );

            const candidates = Array.isArray(response.data)
                ? response.data
                : response.data.data || [];

            setEmployees(candidates);

        } catch (error) {
            console.error("Error fetching candidates:", error);
            setEmployees([]);
        }
    };

    const handleAction = (id, emp, action) => {

        if (action === "See Details") {
            setSelectedCandidate(emp);
            setIsDetailsModalOpen(true);
        }

        else if (action === "Interview Scheduled") {
            setSelectedEmployee(emp);
            setIsInterviewModalOpen(true);
        }

        else {
            alert(`Candidate ${emp.candidate_id} marked as ${action}`);
        }

        setActions((prev) => ({
            ...prev,
            [id]: ""
        }));
    };

    const filteredEmployees = Array.isArray(employees)
        ? employees.filter(
            (emp) =>
                (emp.name || "").toLowerCase().includes(appliedSearch.toLowerCase()) ||
                (emp.candidate_id || "").toLowerCase().includes(appliedSearch.toLowerCase())
        )
        : [];

    // Pagination Logic
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentEmployees = filteredEmployees.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const handleSearch = () => {
        setAppliedSearch(search);
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setSearch("");
        setAppliedSearch("");
        setCurrentPage(1);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">

                <header className="py-4 px-6 bg-white dark:bg-gray-800 border-b shadow-sm">
                    <Tabs />
                </header>

                <main className="flex-1 flex flex-col p-4 overflow-hidden lg:ml-12">
                    <div className="w-full max-w-7xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col h-full overflow-hidden">

                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white lg:-ml-19">
                            Candidate List
                        </h2>

                        <div className="w-full flex justify-center mb-6">
                            <div className="w-full max-w-3xl rounded-xl">

                                <div className="flex flex-col lg:flex-row gap-3">

                                    <input
                                        type="text"
                                        placeholder="Search Candidate by Name or Code"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    />

                                    <div className="flex flex-row lg:flex-row gap-3 w-full lg:w-auto">

                                        <button
                                            onClick={handleSearch}
                                            className="flex-1 lg:w-auto bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 
                                            transition duration-200 lg:flex lg:items-center lg:justify-center lg:gap-2"
                                        >
                                            <span>🔍</span>
                                            <span>Search</span>
                                        </button>

                                        <button
                                            onClick={handleClearFilters}
                                            className="flex-1 lg:w-auto bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
                                        >
                                            🔄 Clear
                                        </button>

                                    </div>

                                </div>

                            </div>
                        </div>


                        <div className="overflow-y-auto">
                            <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg">
                                <table className="min-w-full text-sm text-left border-collapse">

                                    <thead className="bg-indigo-600 text-white">
                                        <tr>
                                            <th className="px-6 py-3 border-r border-indigo-500">ID</th>
                                            <th className="px-6 py-3 border-r border-indigo-500">Name</th>
                                            <th className="px-6 py-3 border-r border-indigo-500">Email</th>
                                            <th className="px-6 py-3 border-r border-indigo-500">Phone</th>
                                            <th className="px-6 py-3 border-r border-indigo-500">Status</th>
                                            <th className="px-6 py-3 text-center">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {currentEmployees.map((emp, index) => (
                                            <tr
                                                key={index}
                                                className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                            >
                                                <td className="px-6 py-4 border-r border-gray-300 dark:border-gray-700">
                                                    {emp.candidate_id}
                                                </td>

                                                <td className="px-6 py-4 border-r border-gray-300 dark:border-gray-700">
                                                    {emp.name || "-"}
                                                </td>

                                                <td className="px-6 py-4 border-r border-gray-300 dark:border-gray-700">
                                                    {emp.email}
                                                </td>

                                                <td className="px-6 py-4 border-r border-gray-300 dark:border-gray-700">
                                                    {emp.phone || "-"}
                                                </td>

                                                <td className="px-6 py-4 border-r border-gray-300 dark:border-gray-700">
                                                    <span
                                                        className={`font-semibold
                                                            ${emp.status === "DATA UPDATED BY CANDIDATE"
                                                                ? "text-green-600"
                                                                : emp.status === "MAIL SEND TO CANDIDATE FOR CV UPLOAD"
                                                                    ? "text-yellow-500"
                                                                    : "text-gray-700 dark:text-gray-300"
                                                            }`}
                                                    >
                                                        {emp.status}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-center">
                                                    <select
                                                        value={actions[emp.candidate_id] || ""}
                                                        onChange={(e) => {
                                                            if (e.target.value) {
                                                                handleAction(emp.candidate_id, emp, e.target.value);
                                                            }
                                                        }}
                                                        className="px-3 py-1 text-sm border rounded-md focus:ring focus:ring-indigo-300"
                                                    >
                                                        <option value="" disabled>
                                                            Select Action
                                                        </option>

                                                        {/* {emp.status === "DATA UPDATED BY CANDIDATE" || emp.status === "ACCEPTED" && (
                                                            <option value="See Details">See Details</option>
                                                        )} */}

                                                        <option value="See Details">See Details</option>

                                                        {emp.status === "DATA UPDATED BY CANDIDATE" || emp.status === "ACCEPTED" && (
                                                            <option value="Interview Scheduled">
                                                                Schedule Interview
                                                            </option>
                                                        )}

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

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 rounded disabled:opacity-50"
                                >
                                    <IoMdArrowDropleftCircle size={21} />
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 rounded ${currentPage === i + 1
                                            ? "bg-indigo-600 text-white"
                                            : "bg-gray-200"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(prev + 1, totalPages)
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 rounded disabled:opacity-50"
                                >
                                    <IoMdArrowDroprightCircle size={21} />
                                </button>

                            </div>
                        )}

                    </div>
                </main>
            </div>

            {/* Interview Modal */}
            <Modal
                isOpen={isInterviewModalOpen}
                onClose={() => {
                    setIsInterviewModalOpen(false);
                    if (selectedEmployee) {
                        setActions((prev) => ({
                            ...prev,
                            [selectedEmployee.candidate_id]: ""
                        }));
                    }
                }}
                title="Schedule Interview"
                maxWidth="max-w-2xl"
            >
                {selectedEmployee && (
                    <SetInterview
                        employeeName={selectedEmployee.name}
                        employeeCode={selectedEmployee.candidate_id}
                        onClose={() => setIsInterviewModalOpen(false)}
                    />
                )}
            </Modal>

            {/* Details Modal */}
            <Modal
                isOpen={isDetailsModalOpen}
                onClose={() => {
                    setIsDetailsModalOpen(false);
                    if (selectedCandidate) {
                        setActions((prev) => ({
                            ...prev,
                            [selectedCandidate.candidate_id]: ""
                        }));
                    }
                }}
                title="Candidate Details"
                maxWidth="max-w-2xl"
            >
                {selectedCandidate && (
                    <CandidateDetails
                        candidate={selectedCandidate}
                    />
                )}
            </Modal>
        </div>
    )
}

export default EmployeeTable;


















// <div className="overflow-x-auto border border-black">
//                             <table className="min-w-full text-sm text-left">
//                                 <thead className="bg-indigo-600 text-white">
//                                     <tr>
//                                         <th className="px-6 py-3">ID</th>
//                                         <th className="px-6 py-3">Name</th>
//                                         <th className="px-6 py-3">Email</th>
//                                         <th className="px-6 py-3">Phone</th>
//                                         <th className="px-6 py-3">Status</th>
//                                         <th className="px-6 py-3 text-center">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {currentEmployees.map((emp, index) => (
//                                         <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition">

//                                             <td className="px-6 py-4">{emp.candidate_id}</td>
//                                             <td className="px-6 py-4">{emp.name || "-"}</td>
//                                             <td className="px-6 py-4">{emp.email}</td>
//                                             <td className="px-6 py-4">{emp.phone || "-"}</td>

//                                             <td className="px-6 py-4">
//                                                 <span
//                                                     className={`font-semibold
//                                                     ${emp.status === "DATA UPDATED BY CANDIDATE"
//                                                             ? "text-green-600"
//                                                             : emp.status === "MAIL SEND TO CANDIDATE FOR CV UPLOAD"
//                                                                 ? "text-yellow-500"
//                                                                 : "text-gray-700 dark:text-gray-300"
//                                                         }`}
//                                                 >
//                                                     {emp.status}
//                                                 </span>
//                                             </td>

//                                             <td className="px-6 py-4 text-center">
//                                                 <select
//                                                     value={actions[emp.candidate_id] || ""}
//                                                     onChange={(e) => {
//                                                         if (e.target.value) {
//                                                             handleAction(emp.candidate_id, emp, e.target.value);
//                                                         }
//                                                     }}
//                                                     className="px-3 py-1 text-sm border rounded-md focus:ring focus:ring-indigo-300"
//                                                 >
//                                                     <option value="" disabled>
//                                                         Select Action
//                                                     </option>

//                                                     {emp.status === "DATA UPDATED BY CANDIDATE" && (
//                                                         <option value="See Details">
//                                                             See Details
//                                                         </option>
//                                                     )}

//                                                     <option value="Interview Scheduled">
//                                                         Schedule Interview
//                                                     </option>

//                                                     <option value="Accepted">Accept</option>
//                                                     <option value="Rejected">Reject</option>

//                                                 </select>
//                                             </td>

//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>

//                             {filteredEmployees.length === 0 && (
//                                 <p className="text-center py-6 text-gray-500">
//                                     No employees found
//                                 </p>
//                             )}
//                         </div>
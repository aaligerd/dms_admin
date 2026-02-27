import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Tabs from "../components/Tabs";
import Modal from "../components/Modal";
import axios from "axios";
import { IoMdArrowDroprightCircle, IoMdArrowDropleftCircle } from "react-icons/io";
import InterviewDetailsModal from "./InterviewDetailsModal";

const InterviewDetailsTable = () => {
    const [search, setSearch] = useState("");
    const [actions, setActions] = useState({});
    const [appliedSearch, setAppliedSearch] = useState("");
    const [employees, setEmployees] = useState([]);
    const [isRemarksModalOpen, setIsRemarksModalOpen] = useState(false);
    const [selectedEmpCode, setSelectedEmpCode] = useState(null);
    const [remarks, setRemarks] = useState("");
    const [isInterviewDetailsOpen, setIsInterviewDetailsOpen] = useState(false);
    const [selectedInterviewData, setSelectedInterviewData] = useState(null);
    const [selectedInterviewStatus, setSelectedInterviewStatus] = useState("");
    const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
    const [rescheduleDate, setRescheduleDate] = useState("");
    const [selectedRescheduleId, setSelectedRescheduleId] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        fetchInterviews();
    }, []);

    const fetchInterviews = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/interview/`
            );

            const interviews = Array.isArray(response.data)
                ? response.data
                : response.data.data || [];

            setEmployees(interviews);

        } catch (error) {
            console.error("Error fetching interviews:", error);
            setEmployees([]);
        }
    };

    const handleAction = async (id, emp, action) => {

        if (action === "ACCEPTED") {
            setSelectedEmpCode(emp.interview_id);
            setSelectedInterviewStatus(action);
            setIsRemarksModalOpen(true);
        }

        else if (action === "RESCHEDULE") {
            setSelectedRescheduleId(emp.interview_id);
            setIsRescheduleModalOpen(true);
        }

        else if (action === "View") {

            try {
                const response = await axios.post(
                    `${API_BASE_URL}/interview/get/byid`,
                    {
                        interview_id: emp.interview_id
                    }
                );

                const data = response.data?.data?.[0];

                setSelectedInterviewData(data);
                setIsInterviewDetailsOpen(true);

            } catch (error) {
                console.error("Error fetching interview details:", error);
                alert("Failed to fetch interview details");
            }
        }

        else {
            alert(`Candidate ${emp.candidate_id} marked as ${action}`);
        }

        setActions((prev) => ({
            ...prev,
            [id]: ""
        }));
    };

    const handleSubmitRemarks = async () => {

        if (!remarks.trim()) {
            alert("Please enter remarks");
            return;
        }

        try {
            await axios.put(`${API_BASE_URL}/interview/update`, {
                interview_id: selectedEmpCode,
                interview_status: selectedInterviewStatus,
                interview_remarks: remarks
            });

            alert("Interview updated successfully!");

            setIsRemarksModalOpen(false);
            setRemarks("");
            setSelectedEmpCode(null);
            setSelectedInterviewStatus("");

            fetchInterviews();

        } catch (error) {
            console.error("Error updating interview:", error);
            alert("Failed to update interview");
        }
    };

    const handleRescheduleSubmit = async () => {

        if (!rescheduleDate) {
            alert("Please select new date & time");
            return;
        }

        try {
            await axios.put(`${API_BASE_URL}/interview/reschedule`, {
                interview_id: selectedRescheduleId,
                new_date: rescheduleDate
            });

            alert("Interview rescheduled successfully!");

            setIsRescheduleModalOpen(false);
            setRescheduleDate("");
            setSelectedRescheduleId(null);

            fetchInterviews();

        } catch (error) {
            console.error("Error rescheduling interview:", error);
            alert("Failed to reschedule interview");
        }
    };

    const filteredEmployees = employees.filter(
        (emp) =>
            (emp.name || "").toLowerCase().includes(appliedSearch.toLowerCase()) ||
            (emp.interview_id || "").toLowerCase().includes(appliedSearch.toLowerCase())
    );

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
                            All Interview Details
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
                                            <th className="px-6 py-3 border-r border-indigo-500">Name</th>
                                            <th className="px-6 py-3 border-r border-indigo-500">Date & Time</th>
                                            <th className="px-6 py-3 border-r border-indigo-500">Status</th>
                                            <th className="px-6 py-3 text-center">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {currentEmployees.map((emp, index) => (
                                            <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition">

                                                {/* Candidate Name */}
                                                <td className="px-6 py-4 border-r">
                                                    {emp.name}
                                                </td>

                                                {/* Interview Date */}
                                                <td className="px-6 py-4 border-r">
                                                    {new Date(emp.interview_date).toLocaleString()}
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-4 border-r">
                                                    <span className={`font-semibold
                                                        ${emp.interview_status === "SCHEDULED"
                                                            ? "text-yellow-500"
                                                            : emp.interview_status === "ACCEPTED"
                                                                ? "text-green-600"
                                                                : emp.interview_status === "REJECTED"
                                                                    ? "text-red-600"
                                                                    : "text-gray-600"
                                                        }`}>
                                                        {emp.interview_status}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4 text-center">
                                                    <select
                                                        value={actions[emp.interview_id] || ""}
                                                        onChange={(e) => {
                                                            if (e.target.value) {
                                                                handleAction(emp.interview_id, emp, e.target.value);
                                                            }
                                                        }}
                                                        className="px-3 py-1 text-sm border rounded-md"
                                                    >
                                                        <option value="" disabled>Select Action</option>
                                                        <option value="View">Interview Details</option>

                                                        {emp.interview_status === "ACCEPTED" && (
                                                            <option value="Send Mail">Send BGV Mail</option>
                                                        )}

                                                        {emp.interview_status === "SCHEDULED" && (
                                                            <>
                                                                <option value="ACCEPTED">Accept</option>
                                                                <option value="REJECTED">Reject</option>
                                                                <option value="RESCHEDULE">Reschedule Interview</option>
                                                            </>
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

            {/* Remarks Modal */}
            <Modal
                isOpen={isRemarksModalOpen}
                onClose={() => {
                    setIsRemarksModalOpen(false);
                    setRemarks("");
                    setSelectedEmpCode(null);
                }}
                title="HR Remarks"
                maxWidth="max-w-lg"
            >
                <div className="flex flex-col gap-4">

                    <div>
                        <label className="text-sm text-gray-600 dark:text-gray-300">
                            Remarks
                        </label>

                        <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            rows={4}
                            placeholder="Enter HR remarks..."
                            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-300 dark:bg-gray-700"
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            onClick={() => {
                                setIsRemarksModalOpen(false);
                                setRemarks("");
                                setSelectedEmpCode(null);
                            }}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSubmitRemarks}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Submit
                        </button>
                    </div>

                </div>
            </Modal>

            {/* Reschedule Interview Modal */}
            <Modal
                isOpen={isRescheduleModalOpen}
                onClose={() => {
                    setIsRescheduleModalOpen(false);
                    setRescheduleDate("");
                    setSelectedRescheduleId(null);
                }}
                title="Reschedule Interview"
                maxWidth="max-w-lg"
            >
                <div className="flex flex-col gap-4">

                    <div>
                        <label className="text-sm text-gray-600 dark:text-gray-300">
                            New Interview Date & Time
                        </label>

                        <input
                            type="datetime-local"
                            value={rescheduleDate}
                            onChange={(e) => setRescheduleDate(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-300 dark:bg-gray-700"
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            onClick={() => {
                                setIsRescheduleModalOpen(false);
                                setRescheduleDate("");
                                setSelectedRescheduleId(null);
                            }}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleRescheduleSubmit}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Submit
                        </button>
                    </div>

                </div>
            </Modal>

            {/* Interview Details Modal */}
            <Modal
                isOpen={isInterviewDetailsOpen}
                onClose={() => {
                    setIsInterviewDetailsOpen(false);
                    setSelectedInterviewData(null);
                }}
                title="Interview Details"
                maxWidth="max-w-3xl"
            >
                <InterviewDetailsModal data={selectedInterviewData} />
            </Modal>

        </div>
    )
}

export default InterviewDetailsTable;
// import React, { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import Tabs from "../components/Tabs";

// const API_BASE_URL =
//   process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

// const EmployeeTable = () => {
//   const [search, setSearch] = useState("");
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/employee`);
//       const data = await response.json();
//       setEmployees(data.data || data || []);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAction = async (id, status) => {
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/employee/update-status/${id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ status }),
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         alert("Status Updated Successfully");
//         fetchEmployees();
//       } else {
//         alert(result.message || "Failed to update status");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Server error");
//     }
//   };

//   const filteredEmployees = employees.filter(
//     (emp) =>
//       emp.name?.toLowerCase().includes(search.toLowerCase()) ||
//       emp.code?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
//       <Sidebar />

//       <div className="flex-1 flex flex-col overflow-hidden">

//         {/* Header */}
//         <header className="py-4 px-6 bg-white dark:bg-gray-800 border-b shadow-sm">
//           <div className="flex justify-center">
//             <Tabs />
//           </div>
//         </header>

//         {/* Main */}
//         <main className="flex justify-center p-6">
//          {/* flex-1 overflow-y-auto */}
//           <div className="w-full max-w-6xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">

//             <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
//               Employee List
//             </h2>

//             {/* Search */}
//             <div className="mb-6 flex justify-center">
//               <input
//                 type="text"
//                 placeholder="Search by Name or Code"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full max-w-md px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
//               />
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm text-left">
//                 <thead className="bg-indigo-600 text-white">
//                   <tr>
//                     <th className="px-6 py-3">Name</th>
//                     <th className="px-6 py-3">Code</th>
//                     <th className="px-6 py-3">Position</th>
//                     <th className="px-6 py-3">Company</th>
//                     <th className="px-6 py-3 text-center">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {filteredEmployees.map((emp) => (
//                     <tr key={emp.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition">

//                       <td className="px-6 py-4">{emp.name}</td>
//                       <td className="px-6 py-4">{emp.code}</td>
//                       <td className="px-6 py-4">{emp.position}</td>
//                       <td className="px-6 py-4">{emp.company}</td>

//                       <td className="px-6 py-4">
//                         <div className="flex gap-2 justify-center flex-wrap">

//                           {/* Accept */}
//                           <button
//                             onClick={() => handleAction(emp.id, "Accepted")}
//                             className="px-3 py-1 text-white bg-green-500 rounded-md hover:bg-green-600 transition text-xs font-semibold"
//                           >
//                             Accept
//                           </button>

//                           {/* Reject */}
//                           <button
//                             onClick={() => handleAction(emp.id, "Rejected")}
//                             className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 transition text-xs font-semibold"
//                           >
//                             Reject
//                           </button>

//                           {/* 2nd Round */}
//                           <button
//                             onClick={() =>
//                               handleAction(emp.id, "2nd Round Scheduled")
//                             }
//                             className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition text-xs font-semibold"
//                           >
//                             2nd Round
//                           </button>

//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {loading && (
//                 <p className="text-center py-6 text-gray-500">
//                   Loading employees...
//                 </p>
//               )}

//               {!loading && filteredEmployees.length === 0 && (
//                 <p className="text-center py-6 text-gray-500">
//                   No employees found
//                 </p>
//               )}
//             </div>

//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default EmployeeTable;













import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Tabs from "../components/Tabs";

const EmployeeTable = () => {
    const [search, setSearch] = useState("");

    const [employees] = useState([
        {
            id: 1,
            name: "John Doe",
            code: "EMP001",
            position: "Frontend Developer",
            company: "Organization 1",
        },
        {
            id: 2,
            name: "Jane Smith",
            code: "EMP002",
            position: "Backend Developer",
            company: "Organization 2",
        },
    ]);

    const handleAction = (id, action) => {
        alert(`Employee ${id} marked as ${action}`);
    };

    const filteredEmployees = employees.filter(
        (emp) =>
            emp.name.toLowerCase().includes(search.toLowerCase()) ||
            emp.code.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">

                <header className="py-4 px-6 bg-white dark:bg-gray-800 border-b shadow-sm">
                    <Tabs />
                </header>

                <main className="flex justify-center p-6">
                    {/* flex-1 overflow-y-auto */}
                    <div className="w-full max-w-7xl lg:max-w-6xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">

                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
                            Candidate List
                        </h2>

                        <div className="mb-6 flex justify-center">
                            <input
                                type="text"
                                placeholder="Search Candidate by Name or Code"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full max-w-md px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                            />
                        </div>

                        <div className="overflow-x-auto border border-black">
                            <table className="min-w-full text-sm text-left">
                                <thead className="bg-indigo-600 text-white">
                                    <tr>
                                        <th className="px-6 py-3">Name</th>
                                        <th className="px-6 py-3">Code</th>
                                        <th className="px-6 py-3">Position</th>
                                        <th className="px-6 py-3">Company</th>
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

                                            <td className="px-6 py-4 flex gap-2 justify-center">

                                                <button
                                                    onClick={() => handleAction(emp.id, "Accepted")}
                                                    className="px-3 py-1 text-xs font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition"
                                                >
                                                    Accept
                                                </button>

                                                <button
                                                    onClick={() => handleAction(emp.id, "Rejected")}
                                                    className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition"
                                                >
                                                    Reject
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleAction(emp.id, "2nd Round Interview Scheduled")
                                                    }
                                                    className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                                                >
                                                    2nd Round
                                                </button>

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
        </div>
    )
}

export default EmployeeTable
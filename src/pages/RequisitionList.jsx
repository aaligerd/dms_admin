import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const RequisitionList = () => {
  const [requisitions, setRequisitions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  /* ================= GET ALL ================= */
  const fetchRequisitions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/requisition`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setRequisitions(data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchRequisitions();
  }, []);

  /* ================= SEARCH (POST) ================= */
  const handleSearch = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchQuery,
        }),
      });

      const data = await res.json();
      setRequisitions(data.data || []);
    } catch (err) {
      console.error("Search Error:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="bg-white px-6 py-4 border-b flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-700 ml-9 lg:ml-0">
            Requisition List
          </h1>

          <button
            onClick={() => navigate("/add-requisition")}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            + Add Requisition
          </button>
        </header>

        <main className="p-6 flex-1 overflow-y-auto">

          <div className="bg-white rounded-xl shadow-sm">

            {/* Gradient */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
              <h2 className="text-white text-xl font-semibold">
                Manage Requisitions
              </h2>
            </div>

            {/* SEARCH */}
            <div className="p-6 flex gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search requisition..."
                className="border px-4 py-2 rounded-lg w-72 focus:ring-2 focus:ring-indigo-400 outline-none"
              />

              <button
                onClick={handleSearch}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
                Search
              </button>
            </div>

            {/* TABLE */}
            <div className="px-6 pb-6 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-sm text-gray-600 uppercase text-left">
                    <th className="px-4 py-3">Position</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Requested By</th>
                    <th className="px-4 py-3">Persons</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {requisitions.map((item) => (
                    <tr
                      key={item.req_id}
                      className="border-t text-sm hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">{item.req_pos_title}</td>
                      <td className="px-4 py-3">{item.dept_name}</td>
                      <td className="px-4 py-3">{item.req_reqst_by}</td>
                      <td className="px-4 py-3">{item.req_person_need}</td>

                      <td className="px-4 py-3">
                        <button
                          onClick={() =>
                            navigate(`/requisition/update/${item.req_id}`)
                          }
                          className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default RequisitionList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const RequisitionList = () => {
  const [requisitions, setRequisitions] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [departments, setDepartments] = useState([]);

  // 🔥 NEW STATES
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedDept, setSelectedDept] = useState("");

  const navigate = useNavigate();

  /* ================= GET ALL REQUISITIONS ================= */
  const fetchRequisitions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/requisition`);
      const data = await res.json();
      setRequisitions(data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  /* ================= FETCH ORG + DEPT ================= */
  const fetchMasterData = async () => {
    try {
      const [orgRes, deptRes] = await Promise.all([
        fetch(`${API_BASE_URL}/org`),
        fetch(`${API_BASE_URL}/dept`),
      ]);

      const orgData = await orgRes.json();
      const deptData = await deptRes.json();

      setOrganisations(orgData.data || []);
      setDepartments(deptData.data || []);
    } catch (err) {
      console.error("Master Data Error:", err);
    }
  };

  useEffect(() => {
    fetchRequisitions();
    fetchMasterData();
  }, []);

  /* ================= FILTER SEARCH ================= */
  const handleSearch = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/requisition/search?org_id=${selectedOrg}&dept_id=${selectedDept}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   org_id: selectedOrg || null,
        //   dept_id: selectedDept || null,
        // }),
      });

      const data = await res.json();
      setRequisitions(data.data || []);
    } catch (err) {
      console.error("Search Error:", err);
    }
  };

  /* ================= HELPERS ================= */
  const getOrgName = (orgId) => {
    const org = organisations.find((o) => o.org_id === orgId);
    return org ? org.org_name : "Undefined";
  };

  const getDeptName = (deptId) => {
    const dept = departments.find((d) => d.dept_id === deptId);
    return dept ? dept.dept_name : "Undefined";
  };

  const handleClearFilters = () => {
    setSelectedOrg("");
    setSelectedDept("");
    fetchRequisitions(); // reload all data
  };


  /* ================= UI ================= */

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

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
              <h2 className="text-white text-xl font-semibold">
                Manage Requisitions
              </h2>
            </div>

            {/* 🔥 NEW FILTER SECTION */}
            <div className="p-6 flex gap-4 items-end">

              {/* ORG DROPDOWN */}
              <div>
                <label className="block text-sm mb-1 text-gray-600">
                  Organisation
                </label>
                <select
                  value={selectedOrg}
                  onChange={(e) => setSelectedOrg(e.target.value)}
                  className="border px-4 py-2 rounded-lg w-60"
                >
                  <option value="">All Organisations</option>
                  {organisations.map((org) => (
                    <option key={org.org_id} value={org.org_id}>
                      {org.org_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* DEPT DROPDOWN */}
              <div>
                <label className="block text-sm mb-1 text-gray-600">
                  Department
                </label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="border px-4 py-2 rounded-lg w-60"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept.dept_id} value={dept.dept_id}>
                      {dept.dept_name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSearch}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
              🔍Search
              </button>

              {/* CLEAR BUTTON */}
              <button
                onClick={handleClearFilters}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
              >
              🔄️Clear
              </button>
            </div>

            {/* TABLE */}
            <div className="px-6 pb-6 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-sm text-gray-600 uppercase text-left">
                    <th className="px-4 py-3">Organisation</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Position</th>
                    <th className="px-4 py-3">Requested By</th>
                    <th className="px-4 py-3">Persons</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {requisitions.length > 0 ? (
                    requisitions.map((item) => (
                      <tr
                        key={item.req_id}
                        className="border-t text-sm hover:bg-gray-50 text-left"
                      >
                        <td className="px-4 py-3">
                          {getOrgName(item.req_org)}
                        </td>
                        <td className="px-4 py-3">
                          {getDeptName(item.req_dept)}
                        </td>
                        <td className="px-4 py-3">
                          {item.req_pos_title}
                        </td>
                        <td className="px-4 py-3">
                          {item.req_reqst_by}
                        </td>
                        <td className="px-4 py-3">
                          {item.req_person_need}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() =>
                              navigate(`/requisition/update/${item.req_id}`)
                            }
                            className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
                          >
                            📝Update
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-6 text-gray-400">
                        No Requisitions Found
                      </td>
                    </tr>
                  )}
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

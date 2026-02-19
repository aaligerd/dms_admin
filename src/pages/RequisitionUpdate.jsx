import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const RequisitionUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [organisations, setOrganisations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  /* ================= FETCH MASTER DATA ================= */
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

  /* ================= FETCH BY ID ================= */
  const fetchById = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/requisition/get/byid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ req_id: id }),
      });

      const data = await res.json();
      console.log("Edit Data:", data);

      if (Array.isArray(data.data) && data.data.length > 0) {
        setFormData(data.data[0]);   // ✅ THIS FIXES EVERYTHING
      }

    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchMasterData();
    fetchById();
  }, [id]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= HANDLE UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const res = await fetch(`${API_BASE_URL}/requisition/update/byid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          req_id: id
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅Requisition Updated Successfully!");
        navigate("/requisition");
      } else {
        alert(result.message || "⚠️Update failed");
      }
    } catch (err) {
      console.error("Update Error:", err);
      alert("⚠️Server Error");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        <header className="bg-white px-6 py-4 border-b flex justify-between items-center">
          <h1 className="text-xl font-semibold ml-9 lg:ml-0">
            Update Requisition
          </h1>

          <button
            onClick={() => navigate("/requisition")}
            className="ml-1 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
          >
           ⬅️ <span className="hidden lg:inline md:inline">Back to List</span>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-xl shadow-sm max-w-4xl mx-auto">

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 rounded-t-xl">
              <h2 className="text-white text-lg font-semibold">
                Edit Requisition Details
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Position */}
                <div>
                  <label className="label">Position</label>
                  <input
                    type="text"
                    name="req_pos_title"
                    value={formData.req_pos_title || ""}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                {/* req_pos_title, req_org, req_dept, req_reqst_by, req_person_need, req_reason, req_brif, req_status, req_id */}

                {/* Organisation */}
                <div>
                  <label className="label">Organisation</label>
                  <select
                    name="req_org"
                    value={formData.req_org || ""}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="">Select Organisation</option>
                    {organisations.map((org) => (
                      <option key={org.org_id} value={org.org_id}>
                        {org.org_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Department */}
                <div>
                  <label className="label">Department</label>
                  <select
                    name="req_dept"
                    value={formData.req_dept || ""}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.dept_id} value={dept.dept_id}>
                        {dept.dept_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Requested By */}
                <div>
                  <label className="label">Requested By</label>
                  <input
                    type="text"
                    name="req_reqst_by"
                    value={formData.req_reqst_by || ""}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                {/* Persons Needed */}
                <div>
                  <label className="label">Number of Persons</label>
                  <input
                    type="number"
                    name="req_person_need"
                    value={formData.req_person_need || ""}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

              </div>

              {/* req_pos_title, req_org, req_dept, req_reqst_by, req_person_need, req_reason, req_brif, req_status, req_id */}

              {/* Reason */}
              <div className="mt-6">
                <label className="label">Reason</label>
                <textarea
                  name="req_reason"
                  value={formData.req_reason || ""}
                  onChange={handleChange}
                  rows="3"
                  className="input"
                />
              </div>

              {/* Brief */}
              <div className="mt-6">
                <label className="label">Brief Description</label>
                <textarea
                  name="req_brif"
                  value={formData.req_brif || ""}
                  onChange={handleChange}
                  rows="4"
                  className="input"
                />
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={updating}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {updating ? "Updating..." : "Update Requisition"}
                </button>
              </div>

            </form>

          </div>
        </main>
      </div>

      <style>{`
        .label {
          display:block;
          font-size:14px;
          color:#4b5563;
          margin-bottom:6px;
          font-weight:500;
          text-align:left;
        }
        .input {
          width:100%;
          padding:8px 12px;
          border:1px solid #e5e7eb;
          border-radius:6px;
          background:#f9fafb;
          font-size:14px;
        }
        .input:focus {
          outline:none;
          border-color:#6366f1;
          background:white;
          box-shadow:0 0 0 1px #6366f1;
        }
      `}</style>
    </div>
  );
};

export default RequisitionUpdate;

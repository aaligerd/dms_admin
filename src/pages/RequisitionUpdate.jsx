import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const RequisitionUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  /* ================= FETCH BY ID (POST) ================= */
  useEffect(() => {
    const fetchById = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/get/byid`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        const data = await res.json();
        setFormData(data.data || {});
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

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

  /* ================= UPDATE (POST) ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const res = await fetch(`${API_BASE_URL}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          ...formData,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Requisition Updated Successfully!");
        navigate("/requisition");
      } else {
        alert(result.message || "Update failed");
      }
    } catch (err) {
      console.error("Update Error:", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-y-auto p-6">

        <div className="bg-white rounded-xl shadow-sm max-w-4xl">

          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 rounded-t-xl">
            <h2 className="text-white text-xl font-semibold">
              Update Requisition
            </h2>
          </div>

          <div className="p-8">

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-6"
            >

              <div>
                <label className="block text-sm mb-1">
                  Position
                </label>
                <input
                  type="text"
                  name="req_pos_title"
                  value={formData.req_pos_title || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Department
                </label>
                <input
                  type="text"
                  name="dept_name"
                  value={formData.dept_name || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Requested By
                </label>
                <input
                  type="text"
                  name="req_reqst_by"
                  value={formData.req_reqst_by || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Persons Needed
                </label>
                <input
                  type="number"
                  name="req_person_need"
                  value={formData.req_person_need || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

              {/* Add more fields if your API returns more */}

              <div className="col-span-2 flex justify-end">
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
        </div>

      </div>
    </div>
  );
};

export default RequisitionUpdate;

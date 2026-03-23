import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const RequisitionForm = () => {
  const [formData, setFormData] = useState({});
  const [organisations, setOrganisations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]); // ✅ NEW
  const navigate = useNavigate();

  /* ================= FETCH MASTER DATA ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Organisations
        const orgRes = await fetch(`${API_BASE_URL}/org`);
        const orgData = await orgRes.json();   // ✅ define first
        console.log(orgData);                  // ✅ then use

        if (Array.isArray(orgData.data)) {
          setOrganisations(orgData.data);
        }

        // Departments
        const deptRes = await fetch(`${API_BASE_URL}/dept`);
        const deptData = await deptRes.json();
        console.log(deptData);

        if (Array.isArray(deptData.data)) {
          setDepartments(deptData.data);
        }

        // Positions
        const posRes = await fetch(`${API_BASE_URL}/requisition/get/position`);
        const posData = await posRes.json();
        console.log('position:'+posData);

        if (Array.isArray(posData.data)) {
          setPositions(posData.data);
        } else if (Array.isArray(posData)) {
          setPositions(posData);
        }

      } catch (err) {
        console.error("Error fetching master data:", err);
      }
    };

    fetchData();
  }, []);


  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= HANDLE SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/requisition/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅Requisition submitted successfully");
        setFormData({});
      } else {
        alert("⚠️Submission failed");
      }
    } catch (err) {
      alert("⚠️Server Error");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ===== PAGE HEADER ===== */}
        <header className="bg-white px-6 py-4 border-b flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-700 ml-9 lg:ml-0">
            Requisition Management
          </h1>
          <button
            onClick={() => navigate("/requisition")}
            className="flex items-center justify-center gap-2 
             bg-indigo-600 text-white 
             px-3 sm:px-4 md:px-5 py-2 
             rounded-lg shadow hover:bg-indigo-700 
             transition duration-200 text-sm sm:text-base"
          >
            <span className="text-lg">📃</span>

            <span className="hidden lg:inline md:hidden">
              Requisition List
            </span>
          </button>
        </header>

        {/* ===== CONTENT AREA ===== */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
              <h2 className="text-xl font-semibold text-white">
                Create New Requisition
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8">


              <div className="grid grid-cols-1 md:grid-cols-1 my-2">
                <label className="label-2">1. Requisition Details</label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                

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


                {/* Approval Authority */}
                <div>
                  <label className="label">Approval Authority</label>
                  <input
                    type="text"
                    name="aproval_authority"
                    value={formData.aproval_authority || ""}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 my-2">
                <label className="label-2">2. Position Details</label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* ✅ POSITION */}
                <div>
                  <label className="label">Job Title or Position</label>
                  <input
                    type="text"
                    name="req_pos_title"
                    value={formData.req_pos_title || ""}
                    onChange={handleChange}
                    className="input"
                    required
                  />

                </div>

                {/* Persons Needed */}
                <div>
                  <label className="label">Number of Positions Required</label>
                  <input
                    type="number"
                    min="1"
                    name="req_person_need"
                    value={formData.req_person_need || ""}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>


                {/* Employee Type - Permanent / Contractual / Consultant / Freelancer / Contributor / News Agency / Internship / FE / FB*/}
                <div>
                  <label className="label">Employee Type</label>
                  <select
                    name="emp_type"
                    value={formData.emp_type || ""}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="">Select Employee Type</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Contractual">Contractual</option>
                    <option value="Consultant">Consultant</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Contributor">Contributor</option>
                    <option value="News Agency">News Agency</option>
                    <option value="Internship">Internship</option>
                    <option value="FE">FE</option>
                    <option value="FB">FB</option>
                  
                  </select>
                </div>

                {/* Organisation */}
                {/* <div>
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
                </div> */}

                


                {/* ✅ Location */}
                <div>
                  <label className="label">Location</label>
                  <input
                    type="text"
                    name="req_location"
                    value={formData.req_location || ""}
                    onChange={handleChange}
                    className="input"
                    required
                  />

                </div>


                {/* ✅ Reporting Manager: */}
                <div>
                  <label className="label">Reporting Manager</label>
                  <input
                    type="text"
                    name="reporting_manager"
                    value={formData.reporting_manager || ""}
                    onChange={handleChange}
                    className="input"
                    required
                  />

                </div>

              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 my-2">
                <label className="label-2">3. Justification for Recruitment</label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              

                {/* Reason */}
                <div className="mt-6">
                  <label className="label">Reason for Hiring</label>
                  <textarea
                    name="req_reason"
                    value={formData.req_reason || ""}
                    onChange={handleChange}
                    rows="3"
                    className="input"
                    required
                  />
                </div>

                {/* Brief */}
                <div className="mt-6">
                  <label className="label">Brief Justification</label>
                  <textarea
                    name="req_brif"
                    value={formData.req_brif || ""}
                    onChange={handleChange}
                    rows="3"
                    className="input"
                    required
                  />
                </div>   
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 my-2">
                <label className="label-2">4. Job Details</label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* ✅ Job Description Attached: */}
                <div>
                  <label className="label">Job Description Attached</label>
                  <select
                    name="job_desc_attachment"
                    value={formData.job_desc_attachment || ""}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  
                  </select>

                </div>
                {/* ✅  Key Skills Required: */}
                <div>
                  <label className="label">Key Skills Required</label>
                  <input
                    type="text"
                    name="skills_req"
                    value={formData.skills_req || ""}
                    onChange={handleChange}
                    className="input"
                    required
                  />

                </div>
                {/* ✅ Experience Level:: */}
                <div>
                  <label className="label">Experience Level</label>
                  <input
                    type="text"
                    name="exp_level"
                    value={formData.exp_level || ""}
                    onChange={handleChange}
                    className="input"
                    required
                  />

                </div>
                {/* ✅ Educational Qualifications: */}
                <div>
                  <label className="label">Educational Qualifications</label>
                  <input
                    type="text"
                    name="edu_qualification"
                    value={formData.edu_qualification || ""}
                    onChange={handleChange}
                    className="input"
                    required
                  />

                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 my-2">
                <label className="label-2">5. Compensation and Budget </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* ✅ Salary Range (CTC): */}
                <div>
                  <label className="label">Salary Range (CTC):</label>
                  <input
                    type="text"
                    name="sallery_range"
                    value={formData.sallery_range || ""}
                    onChange={handleChange}
                    className="input"
                    required
                  />

                </div>
                {/* ✅ Budget Approval: */}
                <div>
                  <label className="label">Budget Approval</label>
                  <select
                    name="budget_approval"
                    value={formData.budget_approval || ""}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                  
                  </select>

                </div>
                
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 my-2">
                <label className="label-2">6. Approval and Signatures</label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {/* ✅ Salary Range (CTC): */}
                <div>
                  <label className="label">Approver (Add Approver):</label>
                  <input
                    type="text"
                    name="approver"
                    value={formData.approver || ""}
                    onChange={handleChange}
                    className="input"
                    required
                  />

                </div>
              </div>

              {/* Submit */}
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md shadow-sm transition"
                  >
                    Submit Requisition
                  </button>
                </div>

            </form>
          </div>
        </main>
      </div>

      {/* Reusable Styles */}
      <style>{`
        .label {
          display:block;
          font-size:14px;
          color:#4b5563;
          margin-bottom:6px;
          font-weight:500;
          text-align:left;
        }
          .label-2 {
          display:block;
          font-size:16px;
          color:#000;
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
          transition:all .2s;
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

export default RequisitionForm;

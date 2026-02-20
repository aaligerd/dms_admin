import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function RequestDetails() {
    const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  

  useEffect(() => {
    const fetchData = async () => {
        try {
        const res = await fetch(
            `${API_BASE_URL}/requisition/get/byid`,
            {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ req_id: id }),
            }
        );

        if (!res.ok) throw new Error("Failed to fetch data");

        const result = await res.json();

        // ✅ FIX: Extract first object from array
        if (Array.isArray(result.data) && result.data.length > 0) {
            setData(result.data[0]);
        } else {
            throw new Error("No data found");
        }

        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    fetchData();
    }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-red-500 mt-5 text-center">{error}</div>;
  if (!data) return null;

  return (
  <div className="flex h-screen bg-gray-100">
    <Sidebar />

    <div className="flex-1 flex flex-col">

      {/* ===== Header ===== */}
      <header className="bg-white px-8 py-5 border-b flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800 ml-9 lg:ml-0">
          Requisition Details
        </h1>

        <button
          onClick={() => navigate("/requisition")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition print:hidden"
        >
          ⬅ Back to List
        </button>
      </header>

      {/* ===== Main Content ===== */}
      <main className="flex-1 overflow-y-auto p-8">

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200">

          {/* ===== Top Section ===== */}
          <div className="px-8 py-6 border-b flex justify-between items-start">

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {data.req_pos_title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Request ID: #{data.req_id}
              </p>
            </div>
            <div>
                <span
                className={`px-4 py-2 mx-1 my-1 rounded-lg text-sm font-medium border border-gray-300 ${
                    data.req_status?.toLowerCase() === "closed"
                    ? "bg-red-500 text-red-00"
                    : "bg-green-500 text-green-00"
                }`}
                >
                {data.req_status?.toUpperCase()}
                </span>

                {/* 🖨 Print Button */}
                    <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 transition print:hidden"
                    >
                    🖨 Print
                </button>
            </div>

          </div>

          {/* ===== Details Grid ===== */}
          <div className="p-8 grid md:grid-cols-2 gap-10">

            <div className="space-y-6">
              <DetailItem label="Organization" value={data.req_org} />
              <DetailItem label="Department" value={data.req_dept} />
              <DetailItem label="Requested By" value={data.req_reqst_by} />
              <DetailItem label="Persons Needed" value={data.req_person_need} />
            </div>

            <div className="space-y-6">
              <DetailItem label="Created Date" value={formatDate(data.req_date)} />
              <DetailItem label="Last Modified" value={formatDate(data.req_last_mod)} />
            </div>

          </div>

          {/* ===== Description Section ===== */}
          <div className="px-8 pb-8 border-t space-y-6">

            <div>
              <h3 className="text-md text-left font-semibold text-gray-700 mb-2">
                Reason
              </h3>
              <div className="bg-gray-50 text-left border rounded-xl p-4 text-gray-700">
                {data.req_reason || "—"}
              </div>
            </div>

            <div>
              <h3 className="text-md text-left font-semibold text-gray-700 mb-2">
                Brief Description
              </h3>
              <div className="bg-gray-50 text-left border rounded-xl p-4 text-gray-700">
                {data.req_brif || "—"}
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  </div>
);
}

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-left text-gray-500">{label}</p>
    <p className="text-gray-800 text-left font-medium mt-1">
      {value || "—"}
    </p>
  </div>
);

export default RequestDetails;
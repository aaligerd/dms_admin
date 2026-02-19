import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Tabs from "../components/Tabs";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SendEmail = () => {
  const [formData, setFormData] = useState({
    email: "",
    position: "", // this will store req_id
  });

  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch positions
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/requisition/get/position`
        );
        const data = await res.json();

        if (res.ok) {
          setPositions(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    fetchPositions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // POST API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.position) {
      alert("Please select a position");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/candidate/gen/temp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            position_id: parseInt(formData.position),
            email: formData.email,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Email sent successfully!");
        setFormData({ email: "", position: "" });
      } else {
        alert(data.msg || "Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="py-4 px-4 sm:px-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
          <Tabs />
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="w-full max-w-lg mx-auto mt-6 sm:mt-10">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">

              <div className="p-5 sm:p-6 bg-indigo-600">
                <h2 className="text-xl sm:text-2xl font-bold text-white text-center">
                  Send Email to Candidate
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-5 sm:p-8">

                <div className="mb-6">
                  <label className="block mb-2 text-sm text-left font-medium text-gray-600 dark:text-gray-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter email address"
                    className="block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-sm text-left font-medium text-gray-600 dark:text-gray-200">
                    Position
                  </label>

                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                  >
                    <option value="">Select Position</option>

                    {positions.map((pos) => (
                      <option key={pos.req_id} value={pos.req_id}>
                        {pos.req_pos_title} - {pos.org_name} - {pos.dept_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-8 flex justify-center sm:justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 font-semibold shadow-md transition disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SendEmail;

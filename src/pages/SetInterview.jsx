import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SetInterview = ({ employeeName, employeeCode, onClose }) => {
  const [formData, setFormData] = useState({
    interview_link: "",
    interview_desc: "",
    interview_datetime: "",
  });

  const [interviewers, setInterviewers] = useState([
    { name: "", email: "" },
  ]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInterviewerChange = (index, field, value) => {
    const updated = [...interviewers];
    updated[index][field] = value;
    setInterviewers(updated);
  };

  const handleInterviewerAdd = () => {
    setInterviewers([...interviewers, { name: "", email: "" }]);
  };

  const handleInterviewerRemove = (index) => {
    const updated = interviewers.filter((_, i) => i !== index);
    setInterviewers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      candidate_id: employeeCode,
      interview_link: formData.interview_link,
      interview_desc: formData.interview_desc,
      interview_datetime: formData.interview_datetime,
      interviewer_details: interviewers,
    };

    try {
      setLoading(true);

      await axios.post(
        `${API_BASE_URL}/interview/schedule`,
        payload
      );

      alert("Interview Scheduled Successfully");

      onClose();
    } catch (error) {
      console.error("Schedule failed:", error);
      alert("Failed to schedule interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-h-[70vh] overflow-y-auto pr-2"
    >
      <div>
        <label className="block font-semibold mb-2">Candidate Name</label>
        <input
          type="text"
          value={employeeName || ""}
          readOnly
          className="w-full px-4 py-2 border rounded-md bg-gray-100"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Meeting Link</label>
        <input
          type="url"
          name="interview_link"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Interview Description
        </label>
        <textarea
          name="interview_desc"
          rows="3"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
        />
      </div>

      <div>
        <h3 className="font-semibold mb-4">Interviewers</h3>

        {interviewers.map((person, index) => (
          <div
            key={index}
            className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3"
          >
            <input
              type="text"
              placeholder="Interviewer Name"
              required
              value={person.name}
              onChange={(e) =>
                handleInterviewerChange(index, "name", e.target.value)
              }
              className="w-full px-4 py-2 border rounded-md"
            />

            <input
              type="email"
              placeholder="Interviewer Email"
              required
              value={person.email}
              onChange={(e) =>
                handleInterviewerChange(index, "email", e.target.value)
              }
              className="w-full px-4 py-2 border rounded-md"
            />

            {interviewers.length > 1 && (
              <button
                type="button"
                onClick={() => handleInterviewerRemove(index)}
                className="px-4 py-1 bg-red-500 text-white rounded-md"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleInterviewerAdd}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          + Add Interviewer
        </button>
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Interview Date & Time
        </label>
        <input
          type="datetime-local"
          name="interview_datetime"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-md text-white ${
          loading
            ? "bg-gray-400"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Scheduling..." : "Save Interview"}
      </button>
    </form>
  );
};

export default SetInterview;
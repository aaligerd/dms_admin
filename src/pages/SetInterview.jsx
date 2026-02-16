import React, { useState, useEffect } from "react";

const SetInterview = ({ employeeCode, onClose }) => {
  const [formData, setFormData] = useState({
    employee_code: "",
    meeting_link: "",
  });

  const [interviewers, setInterviewers] = useState([
    { name: "", email: "" },
  ]);

  useEffect(() => {
    if (employeeCode) {
      setFormData((prev) => ({
        ...prev,
        employee_code: employeeCode,
      }));
    }
  }, [employeeCode]);

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
    setInterviewers(interviewers.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, interviewers });

    alert("Interview Scheduled Successfully");
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-h-[70vh] overflow-y-auto pr-2"
    >

      <input
        type="text"
        name="employee_code"
        value={formData.employee_code}
        readOnly
        className="w-full px-4 py-2 border rounded-md bg-gray-100"
      />

      <input
        type="text"
        name="meeting_link"
        placeholder="Interview Meeting Link"
        required
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
      />

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
              value={person.name}
              onChange={(e) =>
                handleInterviewerChange(index, "name", e.target.value)
              }
              className="w-full px-4 py-2 border rounded-md"
            />

            <input
              type="email"
              placeholder="Interviewer Email"
              value={person.email}
              onChange={(e) =>
                handleInterviewerChange(index, "email", e.target.value)
              }
              className="w-full px-4 py-2 border rounded-md"
            />

            <button
              type="button"
              onClick={() => handleInterviewerRemove(index)}
              className="px-4 py-1 bg-red-500 text-white rounded-md"
            >
              Remove
            </button>
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

      <button className="w-full py-2 bg-indigo-600 text-white rounded-md">
        Save Interview
      </button>

    </form>
  );
};

export default SetInterview;

import React from "react";

const InterviewDetailsModal = ({ data }) => {
  if (!data) return null;

  // Parse interviewer_list (because backend sends string)
  let interviewerDetails = [];
  try {
    interviewerDetails = data.interviewer_list
      ? JSON.parse(data.interviewer_list)
      : [];
  } catch (error) {
    interviewerDetails = [];
  }

  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">

      {/* Candidate Name */}
      <div>
        <h3 className="font-semibold text-gray-700 dark:text-gray-300">
          Candidate Name
        </h3>
        <p className="mt-1 text-gray-900 dark:text-white">
          {data.name || "-"}
        </p>
      </div>

      {/* Interview Description */}
      <div>
        <h3 className="font-semibold text-gray-700 dark:text-gray-300">
          Interview Description
        </h3>
        <p className="mt-1 text-gray-900 dark:text-white">
          {data.interview_desc || "-"}
        </p>
      </div>

      {/* Interview Date & Time */}
      <div>
        <h3 className="font-semibold text-gray-700 dark:text-gray-300">
          Interview Date & Time
        </h3>
        <p className="mt-1 text-gray-900 dark:text-white">
          {data.interview_date
            ? new Date(data.interview_date).toLocaleString()
            : "-"}
        </p>
      </div>

      {/* Interviewers Table */}
      <div>
        <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">
          Interviewer Details
        </h3>

        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-2 border-r">Name</th>
                <th className="px-4 py-2">Email</th>
              </tr>
            </thead>

            <tbody>
              {interviewerDetails.length > 0 ? (
                interviewerDetails.map((person, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-2 border-r">
                      {person.name}
                    </td>
                    <td className="px-4 py-2">
                      {person.email}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="text-center py-4 text-gray-500"
                  >
                    No interviewers added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default InterviewDetailsModal;
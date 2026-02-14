// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Tabs from "../components/Tabs";

// const API_BASE_URL =
//   process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

// const SetInterview = () => {
//   const [formData, setFormData] = useState({
//     employee_code: "",
//     position: "",
//   });

//   const [interviewers, setInterviewers] = useState([
//     { name: "", email: "" },
//   ]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleInterviewerChange = (index, field, value) => {
//     const updated = [...interviewers];
//     updated[index][field] = value;
//     setInterviewers(updated);
//   };

//   const handleInterviewerAdd = () => {
//     setInterviewers([...interviewers, { name: "", email: "" }]);
//   };

//   const handleInterviewerRemove = (index) => {
//     setInterviewers(interviewers.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = {
//       ...formData,
//       interviewers,
//     };

//     try {
//       const response = await fetch(`${API_BASE_URL}/interview/set`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         alert("Interview Scheduled Successfully!");
//       } else {
//         alert(result.message || "Error scheduling interview");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
//       <Sidebar />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="py-4 px-6 bg-white dark:bg-gray-800 border-b shadow-sm">
//           <div className="flex justify-center">
//             <Tabs />
//           </div>
//         </header>

//         {/* Main */}
//         <main className="flex-1 overflow-y-auto flex justify-center items-center p-6">
//           <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-xl">

//             <div className="p-6 bg-indigo-600 rounded-t-xl">
//               <h2 className="text-2xl font-bold text-white text-center">
//                 Set Interview
//               </h2>
//             </div>

//             <form onSubmit={handleSubmit} className="p-8 space-y-6">

//               <input
//                 type="text"
//                 name="employee_code"
//                 placeholder="Employee Code"
//                 required
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
//               />

//               <input
//                 type="text"
//                 name="position"
//                 placeholder="Position"
//                 required
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
//               />

//               <div>
//                 <h3 className="font-semibold mb-4">Interviewers</h3>

//                 {interviewers.map((person, index) => (
//                   <div
//                     key={index}
//                     className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3"
//                   >
//                     <input
//                       type="text"
//                       placeholder="Interviewer Name"
//                       value={person.name}
//                       onChange={(e) =>
//                         handleInterviewerChange(index, "name", e.target.value)
//                       }
//                       className="w-full px-4 py-2 border rounded-md"
//                     />

//                     <input
//                       type="email"
//                       placeholder="Interviewer Email"
//                       value={person.email}
//                       onChange={(e) =>
//                         handleInterviewerChange(index, "email", e.target.value)
//                       }
//                       className="w-full px-4 py-2 border rounded-md"
//                     />

//                     <button
//                       type="button"
//                       onClick={() => handleInterviewerRemove(index)}
//                       className="px-4 py-1 bg-red-500 text-white rounded-md"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}

//                 <button
//                   type="button"
//                   onClick={handleInterviewerAdd}
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-md"
//                 >
//                   + Add Interviewer
//                 </button>
//               </div>

//               <button className="w-full py-2 bg-indigo-600 text-white rounded-md">
//                 Schedule Interview
//               </button>

//             </form>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default SetInterview;















import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Tabs from "../components/Tabs";

const SetInterview = () => {
  const [formData, setFormData] = useState({
    employee_code: "",
    position: "",
  });

  const [interviewers, setInterviewers] = useState([
    { name: "", email: "" },
  ]);

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
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <header className="py-4 px-6 bg-white dark:bg-gray-800 border-b shadow-sm">
            <Tabs />
        </header>

        <main className="flex-1 overflow-y-auto flex justify-center items-center p-6">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-xl">

            <div className="p-6 bg-indigo-600 rounded-t-xl">
              <h2 className="text-2xl font-bold text-white text-center">
                Set Interview
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">

              <input
                type="text"
                name="employee_code"
                placeholder="Employee Code"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
              />

              <input
                type="text"
                name="position"
                placeholder="Position"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
              />

              <div>
                <h3 className="font-semibold mb-4">Interviewers</h3>

                {interviewers.map((person, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3"
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default SetInterview;

// import React, { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";

// const API_BASE_URL =
//   process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

// const AddNewEmployee = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     position: "",
//     organization: "",
//     cv: null,
//   });

//   const [organizations, setOrganizations] = useState([]);

//   useEffect(() => {
//     const fetchOrganizations = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/org`);
//         const data = await res.json();
//         setOrganizations(data.data || data || []);
//       } catch (err) {
//         console.error("Error fetching organizations:", err);
//       }
//     };

//     fetchOrganizations();
//   }, []);

//   const handleChange = (e) => {
//     if (e.target.name === "cv") {
//       setFormData({ ...formData, cv: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const submitData = new FormData();
//     Object.keys(formData).forEach((key) => {
//       submitData.append(key, formData[key]);
//     });

//     try {
//       const response = await fetch(`${API_BASE_URL}/employee/add`, {
//         method: "POST",
//         body: submitData,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Employee added successfully!");
//         setFormData({
//           name: "",
//           phone: "",
//           email: "",
//           position: "",
//           organization: "",
//           cv: null,
//         });
//       } else {
//         alert(data.msg || "Error adding employee");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
//       <Sidebar />

//       <div className="flex-1 flex items-center justify-center p-8">
//         <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">

//           {/* Card Header */}
//           <div className="p-6 bg-indigo-600">
//             <h2 className="text-2xl font-bold text-white text-center">
//               Create New Employee
//             </h2>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="p-8">

//             {/* Full Name */}
//             <div className="mb-6">
//               <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter full name"
//                 className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md 
//                 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
//                 focus:border-indigo-500 dark:focus:border-indigo-500 
//                 focus:outline-none focus:ring"
//               />
//             </div>

//             {/* Phone */}
//             <div className="mb-6">
//               <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter phone number"
//                 className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md 
//                 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
//                 focus:border-indigo-500 dark:focus:border-indigo-500 
//                 focus:outline-none focus:ring"
//               />
//             </div>

//             {/* Email */}
//             <div className="mb-6">
//               <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter email address"
//                 className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md 
//                 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
//                 focus:border-indigo-500 dark:focus:border-indigo-500 
//                 focus:outline-none focus:ring"
//               />
//             </div>

//             {/* Position */}
//             <div className="mb-6">
//               <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
//                 Position
//               </label>
//               <input
//                 type="text"
//                 name="position"
//                 value={formData.position}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter position"
//                 className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md 
//                 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
//                 focus:border-indigo-500 dark:focus:border-indigo-500 
//                 focus:outline-none focus:ring"
//               />
//             </div>

//             {/* Organization */}
//             <div className="mb-6">
//               <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
//                 Organization
//               </label>

//               <select
//                 name="organization"
//                 value={formData.organization}
//                 onChange={handleChange}
//                 required
//                 className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md 
//                 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
//                 focus:border-indigo-500 dark:focus:border-indigo-500 
//                 focus:outline-none focus:ring"
//               >
//                 <option value="">Select Organization</option>
//                 {organizations.map((org) => (
//                   <option key={org.id} value={org.id}>
//                     {org.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* CV Upload */}
//             <div className="mb-6">
//               <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
//                 Upload CV
//               </label>

//               <input
//                 type="file"
//                 name="cv"
//                 accept=".pdf,.doc,.docx"
//                 required
//                 onChange={handleChange}
//                 className="block w-full text-sm text-gray-700 
//                 file:mr-4 file:py-2 file:px-4 
//                 file:rounded-md file:border-0 
//                 file:text-sm file:font-semibold 
//                 file:bg-indigo-600 file:text-white 
//                 hover:file:bg-indigo-500"
//               />
//             </div>

//             {/* Button */}
//             <div className="mt-8 flex justify-center lg:justify-end">
//               <button
//                 type="submit"
//                 className="px-8 py-2.5 text-white transition-colors duration-300 transform 
//                 bg-indigo-600 rounded-md hover:bg-indigo-500 
//                 focus:outline-none focus:bg-indigo-500 
//                 font-semibold shadow-md"
//               >
//                 Create Employee
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddNewEmployee;












import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Tabs from "../components/Tabs";

const AddNewEmployee = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        position: "",
        organization: "",
        cv: null,
    });

    const organizations = [
        { id: 1, name: "Organization A" },
        { id: 2, name: "Organization B" },
    ];

    const handleChange = (e) => {
        if (e.target.name === "cv") {
            setFormData({ ...formData, cv: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="py-4 px-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
                    <Tabs />
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        Add Candidate
                    </h1>
                    <div className="w-full max-w-lg mx-auto mt-10">
                        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">

                            <div className="p-6 bg-indigo-600">
                                <h2 className="text-2xl font-bold text-white text-center">
                                    Add New Candidate
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8">

                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter full name"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md 
                                        dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                                        focus:border-indigo-500 dark:focus:border-indigo-500 
                                        focus:outline-none focus:ring"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter phone number"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md 
                                        dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                                        focus:border-indigo-500 dark:focus:border-indigo-500 
                                        focus:outline-none focus:ring"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter email address"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md 
                                        dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                                        focus:border-indigo-500 dark:focus:border-indigo-500 
                                        focus:outline-none focus:ring"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                                        Position
                                    </label>
                                    <input
                                        type="text"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter position"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md 
                                        dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                                        focus:border-indigo-500 dark:focus:border-indigo-500 
                                        focus:outline-none focus:ring"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                                        Organization
                                    </label>

                                    <select
                                        name="organization"
                                        value={formData.organization}
                                        onChange={handleChange}
                                        required
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md 
                                        dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                                        focus:border-indigo-500 dark:focus:border-indigo-500 
                                        focus:outline-none focus:ring"
                                    >
                                        <option value="">Select Organization</option>
                                        {organizations.map((org) => (
                                            <option key={org.id} value={org.id}>
                                                {org.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                                        Upload CV
                                    </label>

                                    <input
                                        type="file"
                                        name="cv"
                                        accept=".pdf,.doc,.docx"
                                        required
                                        onChange={handleChange}
                                        className="block w-full text-sm text-gray-700 
                                        file:mr-4 file:py-2 file:px-4 
                                        file:rounded-md file:border-0 
                                        file:text-sm file:font-semibold 
                                        file:bg-indigo-600 file:text-white 
                                        hover:file:bg-indigo-500"
                                    />
                                </div>

                                <div className="mt-8 flex justify-center lg:justify-end">
                                    <button
                                        type="submit"
                                        className="px-8 py-2.5 text-white transition-colors duration-300 transform 
                                        bg-indigo-600 rounded-md hover:bg-indigo-500 
                                        focus:outline-none focus:bg-indigo-500 
                                        font-semibold shadow-md"
                                    >
                                        Create Employee
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

export default AddNewEmployee;


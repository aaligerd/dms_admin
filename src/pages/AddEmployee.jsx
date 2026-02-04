import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const AddEmployee = () => {
    const [formData, setFormData] = useState({});
    const [files, setFiles] = useState({});
    const [certificates, setCertificates] = useState([{ name: '', file: null }]);
    const [organisations, setOrganisations] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [marksheets, setMarksheets] = useState([{ name: '', file: null }]);


    const handleMarksheetChange = (index, field, value) => {
        const newMarksheets = [...marksheets];
        const newMarksheet = { ...newMarksheets[index] };
        if (field === 'file') {
            newMarksheet[field] = value;
        } else {
            newMarksheet[field] = value;
        }
        newMarksheets[index] = newMarksheet;
        setMarksheets(newMarksheets);
    };



    const handleMarksheetAdd = () => {
        setMarksheets([...marksheets, { name: '', file: null }]);
    };



    const handleMarksheetRemove = (index) => {
        const newMarksheets = marksheets.filter((_, i) => i !== index);
        setMarksheets(newMarksheets);
    };



    useEffect(() => {
        const fetchMasterData = async () => {
            try {
                const orgRes = await fetch(`${API_BASE_URL}/org`);
                const orgData = await orgRes.json();
                if (Array.isArray(orgData.data)) setOrganisations(orgData.data);
                else setOrganisations([]);

                const deptRes = await fetch(`${API_BASE_URL}/dept`);
                const deptData = await deptRes.json();
                if (Array.isArray(deptData.data)) setDepartments(deptData.data);
                else setDepartments([]);
            } catch (error) {
                console.error('Error fetching master data:', error);
            }
        };
        fetchMasterData();
    }, []);

    const masterArray = [
        { name: 'emp_name', label: 'Employee Name', type: 'text', required: true },
        { name: 'emp_org_id', label: 'Employee Org ID', type: 'text', required: true },
        { name: 'org_id', label: 'Organisation', type: 'select', options: organisations, valueKey: 'org_id', labelKey: 'org_name', required: true },
        { name: 'dept_id', label: 'Department', type: 'select', options: departments, valueKey: 'dept_id', labelKey: 'dept_name', required: true },
        { name: 'contact_number', label: 'Contact Number', type: 'number', required: true },
        { name: 'emergency_contact_number', label: 'Emergency Contact Number', type: 'number', required: true },
        { name: 'emergency_contact_person_name', label: 'Emergency Contact Person Name', type: 'text', required: true },
        { name: 'address', label: 'Address', type: 'text', required: true },
        { name: 'designation', label: 'Designation', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'pan_card_number', label: 'PAN Card Number', type: 'text', required: true },
        { name: 'pan_card_pic', label: 'PAN Card Image', type: 'file', required: true },
        { name: 'aadhar_card_number', label: 'Aadhar Card Number', type: 'text', required: true },
        { name: 'aadhaar_card_pic', label: 'Aadhar Card Image', type: 'file', required: true },
        { name: 'marksheets', label: 'Marksheets', type: 'array', required: false },
        { name: 'uan_number', label: 'UAN Number', type: 'text', required: false },
        { name: 'offer_letter', label: 'Offer Letter', type: 'file', required: false },
        { name: 'old_org_name', label: 'Old Org Name', type: 'text', required: false },
        { name: 'old_comapny_release_letter', label: 'Old Company Release Letter', type: 'file', required: false },
        { name: 'old_pay_slip', label: 'Old Pay Slip', type: 'file', required: false },
        { name: 'joining_letter', label: 'Joining Letter', type: 'file', required: false },
        { name: 'confirmation_letter', label: 'Confirmation Letter', type: 'file', required: false },
        { name: 'join_date', label: 'Join Date', type: 'date', required: true },
        { name: 'release_date', label: 'Release Date', type: 'date', required: false },
        { name: 'release_letter', label: 'Release Letter', type: 'file', required: false },
        { name: 'bank_name', label: 'Bank Name', type: 'text', required: false },
        { name: 'ifsc_code', label: 'IFSC Code', type: 'text', required: false },
        { name: 'bank_account_number', label: 'Bank Account Number', type: 'text', required: false },

    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };

    const handleCertificateChange = (index, field, value) => {
        const newCertificates = [...certificates];
        if (field === 'file') {
            newCertificates[index][field] = value.files[0];
        } else {
            newCertificates[index][field] = value;
        }
        setCertificates(newCertificates);
    };

    const addCertificate = () => {
        setCertificates([...certificates, { name: '', file: null }]);
    };

    const removeCertificate = (index) => {
        const newCertificates = certificates.filter((_, i) => i !== index);
        setCertificates(newCertificates);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        // Debug: Log the form data
        for (let [key, value] of data.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            const response = await fetch(`${API_BASE_URL}/employee/add`, {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message || 'Employee added successfully');
                e.target.reset();
                setFormData({});
                setFiles({});
                setMarksheets([{ name: '', file: null }]);
                setCertificates([{ name: '', file: null }]);
            } else {
                const result = await response.json();
                alert(result.message || 'Failed to add employee');
            }
        } catch (error) {
            console.error('Error adding employee:', error);
            alert('Error adding employee');
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white ml-9 lg:ml-0 md:ml-0">Add Employee</h1>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
                    <div className="w-full max-w-3xl mx-auto mt-10">
                        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
                            <div className="p-6 bg-indigo-600">
                                <h2 className="text-2xl font-bold text-white text-center">Employee Details</h2>
                            </div>
                            <form onSubmit={handleSubmit} className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {masterArray.map((field, index) => {
                                        if (field.type === 'text') {
                                            // Validation patterns
                                            let pattern, maxLength, title;
                                            if (field.name === 'pan_card_number') {
                                                pattern = "[A-Z]{5}[0-9]{4}[A-Z]{1}";
                                                maxLength = 10;
                                                title = "PAN must be 10 characters (e.g., ABCDE1234F)";
                                            } else if (field.name === 'aadhar_card_number') {
                                                pattern = "[0-9]{12}";
                                                maxLength = 12;
                                                title = "Aadhaar must be exactly 12 digits";
                                            } else if (field.name === 'uan_number') {
                                                pattern = "[0-9]{12}";
                                                maxLength = 12;
                                                title = "UAN must be exactly 12 digits";
                                            }
                                            return (
                                                <div key={index}>
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">{field.label}</label>
                                                    <input
                                                        type="text"
                                                        name={field.name}
                                                        onChange={handleChange}
                                                        required={field.required}
                                                        pattern={pattern}
                                                        maxLength={maxLength}
                                                        title={title}
                                                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring"
                                                    />
                                                </div>
                                            );
                                        } else if (field.type === 'number' || field.type === 'email') {
                                            // Validation for number fields
                                            let pattern, maxLength, title, inputType;
                                            if (field.name === 'contact_number' || field.name === 'emergency_contact_number') {
                                                pattern = "[0-9]{10}";
                                                maxLength = 10;
                                                title = "Contact number must be exactly 10 digits";
                                                inputType = "text"; // Use text type for pattern validation
                                            } else {
                                                inputType = field.type; // Keep original type for other fields
                                            }
                                            return (
                                                <div key={index}>
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">{field.label}</label>
                                                    <input
                                                        type={inputType}
                                                        name={field.name}
                                                        onChange={handleChange}
                                                        required={field.required}
                                                        pattern={pattern}
                                                        maxLength={maxLength}
                                                        title={title}
                                                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring"
                                                    />
                                                </div>
                                            );
                                        } else if (field.type === 'file') {
                                            return (
                                                <div key={index}>
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">{field.label}</label>
                                                    <input
                                                        type="file"
                                                        name={field.name}
                                                        onChange={handleFileChange}
                                                        required={field.required}
                                                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring"
                                                    />
                                                </div>
                                            );
                                        } else if (field.type === 'select') {
                                            return (
                                                <div key={index} className="w-full">
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                                                        {field.label}
                                                    </label>

                                                    <div className="relative">
                                                        <select
                                                            name={field.name}
                                                            onChange={handleChange}
                                                            required={field.required}
                                                            className="
                                                            block w-full
                                                            px-3 sm:px-4 py-2
                                                            text-sm sm:text-base
                                                            text-gray-700 dark:text-gray-300
                                                            bg-white dark:bg-gray-800
                                                            border border-gray-300 dark:border-gray-600
                                                            rounded-md
                                                            focus:border-indigo-500 dark:focus:border-indigo-500
                                                            focus:outline-none focus:ring
                                                            truncate
                                                        "
                                                        >
                                                            <option value="">
                                                                Select {field.label}
                                                            </option>

                                                            {field.options.map((opt) => (
                                                                <option
                                                                    key={opt[field.valueKey]}
                                                                    value={opt[field.valueKey]}
                                                                    className="truncate"
                                                                >
                                                                    {opt[field.labelKey]}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                            );
                                        } else if (field.type === 'date') {
                                            return (
                                                <div key={index}>
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">{field.label}</label>
                                                    <input
                                                        type="date"
                                                        name={field.name}
                                                        required={field.required}
                                                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring"
                                                    />
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                                {/* marksheet section */}
                                <div className="mt-8">
                                    <h3 className="text-lg font-medium text-gray-700 dark:text-white mb-4">
                                        Marksheets
                                    </h3>

                                    {marksheets.length > 0 && marksheets.map((mark, index) => (
                                        <div
                                            key={index}
                                            className="
                                            mb-4 p-4 rounded-lg border
                                            bg-gray-50 dark:bg-gray-700
                                            flex flex-col gap-4
                                            md:flex-row md:items-end
                                        "
                                        >
                                            {/* Marksheet Name */}
                                            <div className="w-full md:flex-1">
                                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                                                    Marksheet Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name={`marksheet_name_${index}`}
                                                    value={mark.name}
                                                    onChange={(e) =>
                                                        handleMarksheetChange(index, 'name', e.target.value)
                                                    }
                                                    className="block w-full px-4 py-2 text-sm sm:text-base
                                                    text-gray-700 bg-white border border-gray-300 rounded-md
                                                    dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600
                                                    focus:border-indigo-500 focus:outline-none focus:ring"
                                                />
                                            </div>

                                            {/* Marksheet File */}
                                            <div className="w-full md:flex-1">
                                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                                                    Marksheet File
                                                </label>
                                                <input
                                                    type="file"
                                                    name={`marksheet_file_${index}`}
                                                    onChange={(e) =>
                                                        handleMarksheetChange(index, 'file', e.target.files[0])
                                                    }
                                                    className="block w-full px-4 py-2 text-sm sm:text-base
                                                    text-gray-700 bg-white border border-gray-300 rounded-md
                                                    dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600
                                                    focus:border-indigo-500 focus:outline-none focus:ring"
                                                />
                                            </div>

                                            {/* Remove Button */}
                                            <div className="w-full md:w-auto flex lg:justify-end justify-center md:justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => handleMarksheetRemove(index)}
                                                    className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={handleMarksheetAdd}
                                        className="mt-4 px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md"
                                    >
                                        + Add Marksheet
                                    </button>
                                </div>


                                {/* Certificates Section */}
                                <div className="mt-8">
                                    <h3 className="text-lg font-medium text-gray-700 dark:text-white mb-4">
                                        Certificates
                                    </h3>

                                    {certificates.map((cert, index) => (
                                        <div
                                            key={index}
                                            className="
                                            mb-4 p-4 rounded-lg border
                                            bg-gray-50 dark:bg-gray-700
                                            flex flex-col gap-4
                                            md:flex-row md:items-end
                                        "
                                        >
                                            {/* Certificate Name */}
                                            <div className="w-full md:flex-1">
                                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                                                    Certificate Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name={`certificate_name_${index}`}
                                                    value={cert.name}
                                                    onChange={(e) =>
                                                        handleCertificateChange(index, 'name', e.target.value)
                                                    }
                                                    className="block w-full px-4 py-2 text-sm sm:text-base
                                                    text-gray-700 bg-white border border-gray-300 rounded-md
                                                    dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600
                                                    focus:border-indigo-500 focus:outline-none focus:ring"
                                                />
                                            </div>

                                            {/* Certificate File */}
                                            <div className="w-full md:flex-1">
                                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                                                    Upload File
                                                </label>
                                                <input
                                                    type="file"
                                                    name={`certificate_file_${index}`}
                                                    onChange={(e) =>
                                                        handleCertificateChange(index, 'file', e.target)
                                                    }
                                                    className="block w-full px-4 py-2 text-sm sm:text-base
                                                    text-gray-700 bg-white border border-gray-300 rounded-md
                                                    dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600
                                                    focus:border-indigo-500 focus:outline-none focus:ring"
                                                />
                                            </div>

                                            {/* Remove Button */}
                                            <div className="w-full md:w-auto flex lg:justify-end justify-center md:justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => removeCertificate(index)}
                                                    className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={addCertificate}
                                        className="mt-2 px-4 py-2 text-sm text-indigo-600 bg-indigo-100 rounded hover:bg-indigo-200"
                                    >
                                        + Add Certificate
                                    </button>
                                </div>

                                <div className="mt-8 flex lg:justify-end justify-center">
                                    <button type="submit" className="px-8 py-2.5 text-white transition-colors duration-300 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 font-semibold shadow-md">
                                        Submit Employee Details
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main >
            </div >
        </div >
    );
};

export default AddEmployee;

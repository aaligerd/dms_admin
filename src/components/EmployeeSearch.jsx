import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const EmployeeSearch = () => {

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [organisations, setOrganisations] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [selectedOrg, setSelectedOrg] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [empOrgId, setEmpOrgId] = useState('');

    const [searchResults, setSearchResults] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [loading, setLoading] = useState(false);

    // Update modal states
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [updateFormData, setUpdateFormData] = useState({});
    const [updateFiles, setUpdateFiles] = useState({});
    const [updateMarksheets, setUpdateMarksheets] = useState([{ name: '', file: null }]);
    const [updateCertificates, setUpdateCertificates] = useState([{ name: '', file: null }]);

    const fetchOrganisations = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/org`);
            const data = await response.json();
            if (Array.isArray(data.data)) {
                setOrganisations(data.data);
            } else {
                console.warn('Expected array for organisations but got:', data);
                setOrganisations([]);
            }
        } catch (error) {
            console.error('Error fetching organisations:', error);
            setOrganisations([]);
        }
    };

    const fetchDepartments = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/dept`);
            const data = await response.json();
            if (Array.isArray(data.data)) {
                setDepartments(data.data);
            } else {
                console.warn('Expected array for departments but got:', data);
                setDepartments([]);
            }
        } catch (error) {
            console.error('Error fetching departments:', error);
            setDepartments([]);
        }
    };
    useEffect(() => {
        fetchOrganisations();
        fetchDepartments();
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (selectedOrg) params.append('org_id', selectedOrg);
            if (selectedDept) params.append('dept_id', selectedDept);
            if (empOrgId) params.append('emp_org_id', empOrgId);

            const queryString = params.toString();
            // Assuming the search endpoint follows pattern /employee/search?query...
            const response = await fetch(`${API_BASE_URL}/employee/search?${queryString}`);
            const result = await response.json();

            if (result.success && Array.isArray(result.data)) {
                setSearchResults(result.data);
            } else {
                setSearchResults([]);
            }

        } catch (error) {
            console.error("Error searching employees:", error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleView = async (empId, org_id) => {
        try {
            // Assuming endpoint to get single employee details
            const response = await fetch(`${API_BASE_URL}/employee/${empId}/${org_id}`);
            const result = await response.json();
            if (result.success || result.data) {
                // Adjust based on actual API response structure for single employee
                setSelectedEmployee(result.data || result);
                setIsModalOpen(true);
            } else {
                alert("Could not fetch employee details");
            }
        } catch (error) {
            console.error("Error fetching employee details:", error);
            alert("Error fetching employee details");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEmployee(null);
    };

    const openUpdateModal = () => {
        if (!selectedEmployee) return;

        // Pre-fill form data
        setUpdateFormData({
            emp_name: selectedEmployee.emp_name || '',
            emp_org_id: selectedEmployee.emp_org_id || '',
            org_id: selectedEmployee.org_id || '',
            dept_id: selectedEmployee.dept_id || '',
            contact_number: selectedEmployee.contact_number || '',
            emergency_contact_number: selectedEmployee.emergency_contact_number || '',
            emergency_contact_person_name: selectedEmployee.emergency_contact_person_name || '',
            address: selectedEmployee.address || '',
            designation: selectedEmployee.designation || '',
            email: selectedEmployee.email || '',
            pan_number: selectedEmployee.pan_number || '',
            aadhaar_number: selectedEmployee.aadhaar_number || '',
            uan: selectedEmployee.uan || '',
            old_org_name: selectedEmployee.old_org_name || '',
            bank_name: selectedEmployee.bank_name || '',
            ifsc_code: selectedEmployee.ifsc_code || selectedEmployee.ifsc || '',
            bank_account_number: selectedEmployee.bank_account_number || selectedEmployee.account_number || '',
            join_date: selectedEmployee.join_date ? selectedEmployee.join_date.split('T')[0] : '',
        });

        // Convert marksheets object to array
        let marksheetsArray = [{ name: '', file: null }];
        try {
            const marksheets = typeof selectedEmployee.marksheets === 'string'
                ? JSON.parse(selectedEmployee.marksheets)
                : selectedEmployee.marksheets || {};
            if (Object.keys(marksheets).length > 0) {
                marksheetsArray = Object.entries(marksheets).map(([name, file]) => ({ name, file: null, existingFile: file }));
            }
        } catch (e) {
            console.error('Error parsing marksheets:', e);
        }
        setUpdateMarksheets(marksheetsArray);

        // Convert certificates object to array
        let certificatesArray = [{ name: '', file: null }];
        try {
            const certificates = typeof selectedEmployee.certificates === 'string'
                ? JSON.parse(selectedEmployee.certificates)
                : selectedEmployee.certificates || {};
            if (Object.keys(certificates).length > 0) {
                certificatesArray = Object.entries(certificates).map(([name, file]) => ({ name, file: null, existingFile: file }));
            }
        } catch (e) {
            console.error('Error parsing certificates:', e);
        }
        setUpdateCertificates(certificatesArray);

        setUpdateFiles({});
        // Close view modal before opening update modal
        setIsModalOpen(false);
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setUpdateFormData({});
        setUpdateFiles({});
        setUpdateMarksheets([{ name: '', file: null }]);
        setUpdateCertificates([{ name: '', file: null }]);
    };

    const handleUpdateChange = (e) => {
        setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
    };

    const handleUpdateFileChange = (e) => {
        setUpdateFiles({ ...updateFiles, [e.target.name]: e.target.files[0] });
    };

    const handleUpdateMarksheetChange = (index, field, value) => {
        const newMarksheets = [...updateMarksheets];
        const newMarksheet = { ...newMarksheets[index] };
        if (field === 'file') {
            newMarksheet[field] = value;
        } else {
            newMarksheet[field] = value;
        }
        newMarksheets[index] = newMarksheet;
        setUpdateMarksheets(newMarksheets);
    };

    const handleUpdateMarksheetAdd = () => {
        setUpdateMarksheets([...updateMarksheets, { name: '', file: null }]);
    };

    const handleUpdateMarksheetRemove = (index) => {
        const newMarksheets = updateMarksheets.filter((_, i) => i !== index);
        setUpdateMarksheets(newMarksheets);
    };

    const handleUpdateCertificateChange = (index, field, value) => {
        const newCertificates = [...updateCertificates];
        if (field === 'file') {
            newCertificates[index][field] = value.files[0];
        } else {
            newCertificates[index][field] = value;
        }
        setUpdateCertificates(newCertificates);
    };

    const handleUpdateCertificateAdd = () => {
        setUpdateCertificates([...updateCertificates, { name: '', file: null }]);
    };

    const handleUpdateCertificateRemove = (index) => {
        const newCertificates = updateCertificates.filter((_, i) => i !== index);
        setUpdateCertificates(newCertificates);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const url = `${API_BASE_URL}/employee/update/${selectedEmployee.emp_org_id}`;
        console.log(url);
        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message || 'Employee updated successfully');
                closeUpdateModal();
                closeModal();
                // Refresh search results
                handleSearch();
            } else {
                const result = await response.json();
                alert(result.message || 'Failed to update employee');
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            alert('Error updating employee');
        }
    };

    const masterArray = [
        { name: 'emp_name', label: 'Employee Name', type: 'text' },
        { name: 'emp_org_id', label: 'Employee Org ID', type: 'text' },
        { name: 'org_id', label: 'Organisation', type: 'select', options: organisations, valueKey: 'org_id', labelKey: 'org_name' },
        { name: 'dept_id', label: 'Department', type: 'select', options: departments, valueKey: 'dept_id', labelKey: 'dept_name' },
        { name: 'contact_number', label: 'Contact Number', type: 'number' },
        { name: 'emergency_contact_number', label: 'Emergency Contact Number', type: 'number' },
        { name: 'emergency_contact_person_name', label: 'Emergency Contact Person Name', type: 'text' },
        { name: 'address', label: 'Address', type: 'text' },
        { name: 'designation', label: 'Designation', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'pan_number', label: 'PAN Card Number', type: 'text' },
        { name: 'pan_pic', label: 'PAN Card Image', type: 'file' },
        { name: 'aadhaar_number', label: 'Aadhar Card Number', type: 'text' },
        { name: 'aadhaar_pic', label: 'Aadhar Card Image', type: 'file' },
        { name: 'marksheets', label: 'Marksheets', type: 'custom' },
        { name: 'uan', label: 'UAN Number', type: 'text' },
        { name: 'offer_letter', label: 'Offer Letter', type: 'file' },
        { name: 'old_org_name', label: 'Old Org Name', type: 'text' },
        { name: 'old_company_release_letter', label: 'Old Company Release Letter', type: 'file' },
        { name: 'old_pay_slip', label: 'Old Pay Slip', type: 'file' },
        { name: 'joining_letter', label: 'Joining Letter', type: 'file' },
        { name: 'confirmation_letter', label: 'Confirmation Letter', type: 'file' },
        { name: 'join_date', label: 'Join Date', type: 'date' },
        { name: 'release_date', label: 'Release Date', type: 'date' },
        { name: 'release_letter', label: 'Release Letter', type: 'file' },
        { name: 'bank_name', label: 'Bank Name', type: 'text' },
        { name: 'ifsc_code', label: 'IFSC Code', type: 'text' },
        { name: 'bank_account_number', label: 'Bank Account Number', type: 'text' },
        { name: 'certificates', label: 'Certificates', type: 'custom' },
    ];

    const isImage = (filename) => {
        if (!filename) return false;
        return /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);
    }

    const renderFilePreview = (filename, url) => {
        if (!filename || !url) return <span className="text-gray-400 text-sm">No file uploaded</span>;

        if (isImage(filename)) {
            return (
                <div className="mt-2 flex flex-col justify-center items-center">
                    <img src={url} alt="Preview" className="h-32 object-contain border rounded p-1 bg-gray-50" onError={(e) => e.target.style.display = 'none'} />
                    <div className="mt-1 text-xs text-gray-500 break-all">{filename}</div>
                </div>
            )
        } else {
            return (
                <div className="mt-2">
                    <div className="mt-1 text-xs text-gray-500 break-all">{filename}</div>
                    <div className="flex gap-2 mt-2">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-xs text-white bg-indigo-500 rounded hover:bg-indigo-600">View File</a>
                    </div>
                </div>
            )
        }
    };

    const renderField = (field, data) => {
        // Handle field name mapping for backward compatibility
        let value = data[field.name];

        // Fallback mapping for fields with different names in API response
        if (value === undefined || value === null || value === '') {
            if (field.name === 'ifsc_code') {
                value = data['ifsc'];
            } else if (field.name === 'bank_account_number') {
                value = data['account_number'];
            }
        }

        if (field.type === 'file') {
            const url = data[`${field.name}_url`];
            return (
                <div key={field.name} className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">{field.label}</label>
                    {renderFilePreview(value, url)}
                </div>
            );
        }

        if (field.type === 'custom') { // For Marksheets and Certificates
            let items = {};
            let urls = {};
            try {
                items = typeof value === 'string' ? JSON.parse(value) : value || {};
                const urlKey = `${field.name}_urls`;
                urls = data[urlKey] || {};
                // Ensure urls is an object, if API returns string parse it
                if (typeof urls === 'string') {
                    urls = JSON.parse(urls);
                }
            } catch (e) {
                console.error(`Error parsing ${field.name}`, e);
            }

            return (
                <div key={field.name} className="mt-4 col-span-1 md:col-span-2 border-t pt-4">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-white mb-2">{field.label}</h3>
                    {Object.entries(items).map(([itemName, filename], idx) => (
                        <div key={idx} className="mb-4 border p-3 rounded">
                            <p className="font-semibold text-sm text-gray-600 dark:text-gray-300">{itemName}</p>
                            {renderFilePreview(filename, urls[itemName])}
                        </div>
                    ))}
                    {Object.keys(items).length === 0 && <p className="text-sm text-gray-500">No {field.label.toLowerCase()} found.</p>}
                </div>
            )
        }

        if (field.type === 'select') {
            return (
                <div key={field.name}>
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">{field.label}</label>
                    <select disabled value={value || ''} className="block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 cursor-not-allowed">
                        <option value="">N/A</option>
                        {field.options && field.options.map(opt => (
                            <option key={opt[field.valueKey]} value={opt[field.valueKey]}>{opt[field.labelKey]}</option>
                        ))}
                    </select>
                </div>
            )
        }

        return (
            <div key={field.name}>
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">{field.label}</label>
                <input
                    type={field.type}
                    value={field.type === 'date' && value ? value.split('T')[0] : value || ''}
                    readOnly
                    className="block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none cursor-default"
                />
            </div>
        );
    };

    return (
        <div className="w-full mx-auto mt-10">
            {/* Same Search UI as before */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
                <div className="p-6 bg-indigo-600">
                    <h2 className="text-2xl font-bold text-white text-center">Employee Search</h2>
                    <p className="text-indigo-200 text-center mt-2">Find employees by department, organisation, or ID.</p>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* Filters */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Organisation</label>
                            <select
                                value={selectedOrg}
                                onChange={(e) => setSelectedOrg(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring">
                                <option value="">Select Organisation</option>
                                {Array.isArray(organisations) && organisations.map((org) => (
                                    <option key={org.org_id} value={org.org_id}>{org.org_name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Department</label>
                            <select
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring">
                                <option value="">Select Department</option>
                                {Array.isArray(departments) && departments.map((dept) => (
                                    <option key={dept.dept_id} value={dept.dept_id}>{dept.dept_name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Employee Org ID</label>
                            <input
                                type="text"
                                placeholder="E.g. E382"
                                value={empOrgId}
                                onChange={(e) => setEmpOrgId(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="px-8 py-2.5 text-white transition-colors duration-300 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 font-semibold shadow-md disabled:opacity-50">
                            {loading ? 'Searching...' : 'Search Employees'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Table */}
            <div className="mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Search Results</h3>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Employee ID
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Join Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {searchResults.length > 0 ? (
                                            searchResults.map((emp) => (
                                                <tr key={emp.emp_id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                        {emp.emp_id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                        {emp.emp_name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                        {emp.email}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                        {new Date(emp.join_date).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() => handleView(emp.emp_id, emp.org_id)}
                                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-400">
                                                    No employees found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title="Employee Details" maxWidth="w-11/12 md:w-1/2 max-w-none">
                {selectedEmployee ? (
                    <>
                        {/* Top action button */}
                        <div className="flex lg:justify-end md:justify-center justify-center px-3 py-2 sm:px-4 sm:py-2">
                            <button
                                onClick={openUpdateModal}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none font-semibold shadow-md">
                                Update Employee
                            </button>
                        </div>

                        {/* Form fields */}
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 px-3 py-2 sm:px-4 sm:py-3 max-h-[80vh] overflow-y-auto"
                        >
                            {masterArray.map((field) => renderField(field, selectedEmployee))}
                        </div>

                    </>
                ) : (
                    <div className="p-4 text-center">Loading details...</div>
                )}
            </Modal>

            {/* Update Modal */}
            <Modal
                isOpen={isUpdateModalOpen}
                onClose={closeUpdateModal}
                title="Update Employee"
                maxWidth="w-[95vw] md:w-[90vw] lg:w-[85vw] xl:w-[80vw] max-w-none"
            >
                <form onSubmit={handleUpdateSubmit} className="flex flex-col h-[90vh]">

                    {/* 🔒 FIXED HEADER SPACER (height matches modal header) */}
                    <div className="shrink-0" />

                    {/* 🔥 SINGLE SCROLLER (ONLY ON MOBILE) */}
                    <div className="flex-1 overflow-y-auto  px-3 md:px-4 py-2 md:py-4 space-y-4">

                        {/* ================= FORM FIELDS ================= */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                            {/* Text/Number/Email/Date Fields */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Employee Name</label>
                                <input type="text" name="emp_name" value={updateFormData.emp_name || ''} onChange={handleUpdateChange} required className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Employee Org ID</label>
                                <input type="text" name="emp_org_id" value={updateFormData.emp_org_id || ''} onChange={handleUpdateChange} required className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Organisation</label>
                                <select name="org_id" value={updateFormData.org_id || ''} onChange={handleUpdateChange} required className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring">
                                    <option value="">Select Organisation</option>
                                    {organisations.map(opt => (
                                        <option key={opt.org_id} value={opt.org_id}>{opt.org_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Department</label>
                                <select name="dept_id" value={updateFormData.dept_id || ''} onChange={handleUpdateChange} required className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring">
                                    <option value="">Select Department</option>
                                    {departments.map(opt => (
                                        <option key={opt.dept_id} value={opt.dept_id}>{opt.dept_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Contact Number</label>
                                <input type="text" name="contact_number" value={updateFormData.contact_number || ''} onChange={handleUpdateChange} required pattern="[0-9]{10}" maxLength="10" title="Contact number must be exactly 10 digits" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Emergency Contact Number</label>
                                <input type="text" name="emergency_contact_number" value={updateFormData.emergency_contact_number || ''} onChange={handleUpdateChange} required pattern="[0-9]{10}" maxLength="10" title="Emergency contact number must be exactly 10 digits" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Emergency Contact Person Name</label>
                                <input type="text" name="emergency_contact_person_name" value={updateFormData.emergency_contact_person_name || ''} onChange={handleUpdateChange} required className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Address</label>
                                <input type="text" name="address" value={updateFormData.address || ''} onChange={handleUpdateChange} required className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Designation</label>
                                <input type="text" name="designation" value={updateFormData.designation || ''} onChange={handleUpdateChange} required className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Email</label>
                                <input type="email" name="email" value={updateFormData.email || ''} onChange={handleUpdateChange} required className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">PAN Number</label>
                                <input type="text" name="pan_number" value={updateFormData.pan_number || ''} onChange={handleUpdateChange} required pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" maxLength="10" title="PAN must be 10 characters (e.g., ABCDE1234F)" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">PAN Card Image</label>
                                <input type="file" name="pan_pic" onChange={handleUpdateFileChange} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                                {selectedEmployee?.pan_pic && <div className="text-xs text-gray-500 mt-1">Current: {selectedEmployee.pan_pic}</div>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Aadhaar Number</label>
                                <input type="text" name="aadhaar_number" value={updateFormData.aadhaar_number || ''} onChange={handleUpdateChange} required pattern="[0-9]{12}" maxLength="12" title="Aadhaar must be exactly 12 digits" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Aadhaar Card Image</label>
                                <input type="file" name="aadhaar_pic" onChange={handleUpdateFileChange} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                                {selectedEmployee?.aadhaar_pic && <div className="text-xs text-gray-500 mt-1">Current: {selectedEmployee.aadhaar_pic}</div>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">UAN Number</label>
                                <input type="text" name="uan" value={updateFormData.uan || ''} onChange={handleUpdateChange} pattern="[0-9]{12}" maxLength="12" title="UAN must be exactly 12 digits" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Offer Letter</label>
                                <input type="file" name="offer_letter" onChange={handleUpdateFileChange} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                                {selectedEmployee?.offer_letter && <div className="text-xs text-gray-500 mt-1">Current: {selectedEmployee.offer_letter}</div>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Old Org Name</label>
                                <input type="text" name="old_org_name" value={updateFormData.old_org_name || ''} onChange={handleUpdateChange} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Old Company Release Letter</label>
                                <input type="file" name="old_company_release_letter" onChange={handleUpdateFileChange} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                                {selectedEmployee?.old_company_release_letter && <div className="text-xs text-gray-500 mt-1">Current: {selectedEmployee.old_company_release_letter}</div>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Old Pay Slip</label>
                                <input type="file" name="old_pay_slip" onChange={handleUpdateFileChange} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                                {selectedEmployee?.old_pay_slip && <div className="text-xs text-gray-500 mt-1">Current: {selectedEmployee.old_pay_slip}</div>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Joining Letter</label>
                                <input type="file" name="joining_letter" onChange={handleUpdateFileChange} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                                {selectedEmployee?.joining_letter && <div className="text-xs text-gray-500 mt-1">Current: {selectedEmployee.joining_letter}</div>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Confirmation Letter</label>
                                <input type="file" name="confirmation_letter" onChange={handleUpdateFileChange} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                                {selectedEmployee?.confirmation_letter && <div className="text-xs text-gray-500 mt-1">Current: {selectedEmployee.confirmation_letter}</div>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Join Date</label>
                                <input type="date" name="join_date" value={updateFormData.join_date || ''} onChange={handleUpdateChange} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Release Letter</label>
                                <input type="file" name="release_letter" onChange={handleUpdateFileChange} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                                {selectedEmployee?.release_letter && <div className="text-xs text-gray-500 mt-1">Current: {selectedEmployee.release_letter}</div>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Bank Name</label>
                                <input type="text" name="bank_name" value={updateFormData.bank_name || ''} onChange={handleUpdateChange} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">IFSC Code</label>
                                <input type="text" name="ifsc_code" value={updateFormData.ifsc_code || ''} onChange={handleUpdateChange} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Bank Account Number</label>
                                <input type="text" name="bank_account_number" value={updateFormData.bank_account_number || ''} onChange={handleUpdateChange} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring" />
                            </div>
                        </div>

                        {/* ================= MARKSHEETS ================= */}
                        <section className="space-y-2">
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-white">
                                Marksheets
                            </h3>

                            {updateMarksheets.map((mark, index) => (
                                <div
                                    key={index}
                                    className="
              grid grid-cols-1 md:grid-cols-5 gap-2
              p-2 border rounded-md
              bg-gray-50 dark:bg-gray-700
            "
                                >
                                    <div className="md:col-span-2">
                                        <label className="text-xs">Name</label>
                                        <input
                                            className="w-full px-2 py-1 text-xs rounded border"
                                        />
                                    </div>

                                    <div className="md:col-span-2 flex flex-col">
                                        <label className="text-xs mb-1">File</label>
                                        <input
                                            type="file"
                                            className="text-xs h-8 file:h-8 file:px-2 file:text-xs"
                                        />
                                    </div>

                                    <div className="flex items-end justify-end">
                                        <button
                                            type="button"
                                            className="h-6 w-6 text-xs bg-red-500 text-white rounded"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded"
                            >
                                + Add Marksheet
                            </button>
                        </section>

                        {/* ================= CERTIFICATES ================= */}
                        <section className="space-y-2">
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-white">
                                Certificates
                            </h3>

                            {updateCertificates.map((cert, index) => (
                                <div
                                    key={index}
                                    className="
              grid grid-cols-1 md:grid-cols-5 gap-2
              p-2 border rounded-md
              bg-gray-50 dark:bg-gray-700
            "
                                >
                                    <div className="md:col-span-2">
                                        <label className="text-xs">Name</label>
                                        <input className="w-full px-2 py-1 text-xs rounded border" />
                                    </div>

                                    <div className="md:col-span-2 flex flex-col">
                                        <label className="text-xs mb-1">File</label>
                                        <input
                                            type="file"
                                            className="text-xs h-8 file:h-8 file:px-2 file:text-xs"
                                        />
                                    </div>

                                    <div className="flex items-end justify-end">
                                        <button
                                            type="button"
                                            className="h-6 w-6 text-xs bg-red-500 text-white rounded"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded"
                            >
                                + Add Certificate
                            </button>
                        </section>

                        {/* ================= ACTION BUTTONS ================= */}
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={closeUpdateModal}
                                className="px-4 py-2 text-sm bg-gray-200 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 text-sm bg-indigo-600 text-white rounded"
                            >
                                Update Employee
                            </button>
                        </div>

                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default EmployeeSearch;

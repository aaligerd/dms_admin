import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Tabs from "../components/Tabs";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddNewEmployee = () => {
    const { tempcode } = useParams();
    const navigate = useNavigate();

    const [isValid, setIsValid] = useState(true);
    const [loading, setLoading] = useState(true);
    const [photoUploaded, setPhotoUploaded] = useState(false);
    const [cvUploaded, setCvUploaded] = useState(false);
    const [photoPath, setPhotoPath] = useState(null);
    const [cvPath, setCvPath] = useState(null);
    const [photoLoading, setPhotoLoading] = useState(false);
    const [cvLoading, setCvLoading] = useState(false);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        photo: null,
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

    const handleChangephoto = (e) => {
        if (e.target.name === "photo") {
            setFormData({ ...formData, photo: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);
    };

    const uploadFile = async (file, type) => {
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/candidate/upload/doc`,
                formDataUpload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data?.filepath) {
                if (type === "photo") {
                    setPhotoUploaded(true);
                    setPhotoPath(response.data.filepath);
                } else {
                    setCvUploaded(true);
                    setCvPath(response.data.filepath);
                }
            }
        } catch (error) {
            console.error("Upload failed:", error);
            alert("File upload failed");
        }
    };

    useEffect(() => {
        const checkTempCode = async () => {
            try {
                const response = await axios.post(
                    `${API_BASE_URL}/candidate/check/tempcode`,
                    { temp_code: tempcode }
                );

                if (response.data?.valid) {
                    setIsValid(true);
                } else {
                    setIsValid(false);
                }

            } catch (error) {
                console.error("Invalid tempcode", error);
                setIsValid(false);
            } finally {
                setLoading(false);
            }
        };

        checkTempCode();
    }, [tempcode]);

    if (!isValid) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold">Your Time is Expired</p>
            </div>
        );
    }

    if (isValid) {
        return (
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                {/* <Sidebar /> */}

                <div className="flex-1 flex flex-col overflow-hidden mt-10">
                    {/* <header className="py-4 px-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
                    <Tabs />
                </header> */}

                    <main className="flex-1 overflow-y-auto p-6">
                        {/* <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        Add Candidate
                    </h1> */}
                        <div className="w-full max-w-lg mx-auto">
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
                                            Upload Photo
                                        </label>

                                        <div className="flex items-center gap-3">

                                            <div className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800">
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {formData.photo ? formData.photo.name : "No file chosen"}
                                                </p>
                                            </div>

                                            <input
                                                type="file"
                                                name="photo"
                                                accept=".jpg,.png,.avif"
                                                onChange={handleChangephoto}
                                                className="hidden"
                                                id="photoUpload"
                                            />

                                            <label
                                                htmlFor="photoUpload"
                                                className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md cursor-pointer hover:bg-indigo-500 transition"
                                            >
                                                Choose
                                            </label>

                                            <button
                                                type="button"
                                                disabled={!formData.photo || photoLoading}
                                                onClick={async () => {
                                                    setPhotoLoading(true);
                                                    await uploadFile(formData.photo, "photo");
                                                    setPhotoLoading(false);
                                                }}
                                                className={`px-4 py-2 text-sm font-semibold rounded-md text-white transition
                                                        ${photoUploaded ? "bg-green-600" : "bg-red-600 hover:bg-red-500"}
                                                        ${(!formData.photo || photoLoading) && "opacity-50 cursor-not-allowed"}
                                                    `}
                                            >
                                                {photoLoading ? "Uploading..." : photoUploaded ? "Uploaded" : "Add"}
                                            </button>

                                        </div>
                                    </div>


                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                                            Upload CV
                                        </label>

                                        <div className="flex items-center gap-3">

                                            <div className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800">
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {formData.cv ? formData.cv.name : "No file chosen"}
                                                </p>
                                            </div>

                                            <input
                                                type="file"
                                                name="cv"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleChange}
                                                className="hidden"
                                                id="cvUpload"
                                            />

                                            <label
                                                htmlFor="cvUpload"
                                                className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md cursor-pointer hover:bg-indigo-500 transition"
                                            >
                                                Choose
                                            </label>

                                            <button
                                                type="button"
                                                disabled={!formData.cv || cvLoading}
                                                onClick={async () => {
                                                    setCvLoading(true);
                                                    await uploadFile(formData.cv, "cv");
                                                    setCvLoading(false);
                                                }}
                                                className={`px-4 py-2 text-sm font-semibold rounded-md text-white transition
                                                        ${cvUploaded ? "bg-green-600" : "bg-red-600 hover:bg-red-500"}
                                                        ${(!formData.cv || cvLoading) && "opacity-50 cursor-not-allowed"}
                                                    `}
                                            >
                                                {cvLoading ? "Uploading..." : cvUploaded ? "Uploaded" : "Add"}
                                            </button>

                                        </div>
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
    }
};

export default AddNewEmployee;


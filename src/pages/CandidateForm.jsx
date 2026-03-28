"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

/* MOVED OUTSIDE (FIXES INPUT FOCUS ISSUE) */
const Input = ({ label, name, value, onChange, type = "text", inputStyle }) => (
    <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700 font-serif">
            {label}
        </label>
        <input
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            className={`${inputStyle} text-center`}
        />
    </div>
);

const TextArea = ({ label, name, value, onChange, inputStyle }) => (
    <div className="flex flex-col gap-1 col-span-2">
        <label className="text-sm font-semibold text-gray-700 font-serif">
            {label}
        </label>
        <textarea
            name={name}
            rows={3}
            value={value || ""}
            onChange={onChange}
            className={`${inputStyle} resize-none`}
        />
    </div>
);

export default function CandidateForm() {
    const { candidate_id } = useParams();

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const inputStyle =
        "border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none w-full";

    /* FORMAT DATE */
    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    };

    /* AGE CALCULATION */
    const calculateAge = (dob) => {
        if (!dob) return "";
        const birth = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
        return age;
    };

    /* FETCH DATA */
    useEffect(() => {
        const fetchCandidate = async () => {
            try {
                setLoading(true);

                const res = await axios.post(
                    `${process.env.REACT_APP_API_BASE_URL}/candidate/getbyid`,
                    { candidate_id }
                );

                const data = res.data?.data?.[0];

                if (data) {
                    setFormData({
                        candidateName: data.name || "",
                        position: data.position_applied || "",
                        qualification: data.highest_qualification || "",
                        contact: data.phone || "",
                        currentCompany: data.current_company || "",
                        email: data.email || "",
                        totalExperience: data.total_exp || "",
                        relevantExperience: data.relevant_exp || "",
                        dob: formatDate(data.dob),
                        location: data.work_location || "",
                        currentInHand: data.current_inhand_salary || "",
                        expectedInHand: data.expected_inhand_salary || "",
                        currentCTC: data.current_ctc || "",
                        expectedCTC: data.expected_ctc || "",
                        kra: data.detailed_kra || "",
                        achievements: data.significant_achivements || "",
                        reason: data.reason_for_leaving || "",
                        family: data.family_details || "",
                        strength: data.strength || "",
                        weakness: data.weakness || "",
                        why: data.why_eisamay || "",
                        reference: data.reference || "",
                        remarks: data.remarks || "",
                    });
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (candidate_id) fetchCandidate();
    }, [candidate_id]);

    /* HANDLE CHANGE */
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    /* SUBMIT */
    const handleSubmit = async () => {
    try {
        setSubmitting(true);

        const res = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/assessment`,
            formData
        );

        console.log("Response:", res.data);

        alert("Assessment submitted successfully");

        // CLEAR ALL INPUT FIELDS
        setFormData({});

    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    } finally {
        setSubmitting(false);
    }
};

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center px-3 sm:px-4 py-6 sm:py-10">
            <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg overflow-hidden">

                {/* HEADER */}
                <div className="px-4 sm:px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                    <div>
                        <h1 className="text-sm sm:text-lg md:text-xl font-bold">
                            Candidate Validation Form
                        </h1>
                        <p className="text-xs text-gray-500">
                            Fill candidate details carefully
                        </p>
                    </div>

                    <img src="/eisamay.png" alt="logo" className="w-16 sm:w-20" />
                </div>

                {/* FORM */}
                <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <Input label="Candidate Name" name="candidateName" value={formData.candidateName} onChange={handleChange} inputStyle={inputStyle} />
                        <Input label="Position Applied" name="position" value={formData.position} onChange={handleChange} inputStyle={inputStyle} />
                        <Input label="Highest Qualification" name="qualification" value={formData.qualification} onChange={handleChange} inputStyle={inputStyle} />
                        <Input label="Contact Number" name="contact" value={formData.contact} onChange={handleChange} inputStyle={inputStyle} />
                        <Input label="Current Company" name="currentCompany" value={formData.currentCompany} onChange={handleChange} inputStyle={inputStyle} />
                        <Input label="Email ID" name="email" type="email" value={formData.email} onChange={handleChange} inputStyle={inputStyle} />

                        <Input label="Total Experience" name="totalExperience" value={formData.totalExperience} onChange={handleChange} inputStyle={inputStyle} />
                        <Input label="Relevant Experience" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} inputStyle={inputStyle} />

                        {/* DOB */}
                        <div>
                            <label className="text-sm font-semibold">D.O.B</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob || ""}
                                onChange={handleChange}
                                className={inputStyle}
                            />
                            {formData.dob && (
                                <p className="text-xs text-gray-500">
                                    Age: {calculateAge(formData.dob)}
                                </p>
                            )}
                        </div>

                        <Input label="Work Location" name="location" value={formData.location} onChange={handleChange} inputStyle={inputStyle} />
                        <Input label="Current In-hand Salary" name="currentInHand" value={formData.currentInHand} onChange={handleChange} inputStyle={inputStyle} />
                        <Input label="Expected In-hand Salary" name="expectedInHand" value={formData.expectedInHand} onChange={handleChange} inputStyle={inputStyle} />
                        <Input label="Current CTC" name="currentCTC" value={formData.currentCTC} onChange={handleChange} inputStyle={inputStyle} />
                        <Input label="Expected CTC" name="expectedCTC" value={formData.expectedCTC} onChange={handleChange} inputStyle={inputStyle} />

                        <TextArea label="Detailed KRA" name="kra" value={formData.kra} onChange={handleChange} inputStyle={inputStyle} />
                        <TextArea label="Significant Achievements" name="achievements" value={formData.achievements} onChange={handleChange} inputStyle={inputStyle} />
                        <TextArea label="Reason For Leaving" name="reason" value={formData.reason} onChange={handleChange} inputStyle={inputStyle} />
                        <TextArea label="Family Details" name="family" value={formData.family} onChange={handleChange} inputStyle={inputStyle} />
                        <TextArea label="Strength" name="strength" value={formData.strength} onChange={handleChange} inputStyle={inputStyle} />
                        <TextArea label="Weakness" name="weakness" value={formData.weakness} onChange={handleChange} inputStyle={inputStyle} />
                        <TextArea label="Why Ei Samay?" name="why" value={formData.why} onChange={handleChange} inputStyle={inputStyle} />
                        <TextArea label="Reference" name="reference" value={formData.reference} onChange={handleChange} inputStyle={inputStyle} />
                        <TextArea label="Remarks" name="remarks" value={formData.remarks} onChange={handleChange} inputStyle={inputStyle} />

                    </div>
                </div>

                {/* BUTTON */}
                <div className="p-4 border-t flex justify-between items-center">
                    <p className="text-xs text-gray-400">
                        All fields are confidential
                    </p>

                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className={`px-6 py-2 rounded-md text-white ${
                            submitting
                                ? "bg-gray-400"
                                : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    >
                        {submitting ? "Submitting..." : "Submit"}
                    </button>
                </div>

            </div>
        </div>
    );
}
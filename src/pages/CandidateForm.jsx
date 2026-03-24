import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CandidateForm() {
    const { candidate_id } = useParams();

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    /* FORMAT DATE */
    const formatDate = (date) => {
        if (!date) return "";

        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    /* AGE CALCULATION */
    const calculateAge = (dob) => {
        if (!dob) return "";

        const birth = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

    const inputStyle =
        "border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none w-full";

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    /* INPUT COMPONENT */
    const Input = ({ label, name, type = "text" }) => (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700 font-serif">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                className={`${inputStyle} text-center`}
            />
        </div>
    );

    /* TEXTAREA COMPONENT */
    const TextArea = ({ label, name }) => (
        <div className="flex flex-col gap-1 col-span-2">
            <label className="text-sm font-semibold text-gray-700 font-serif">
                {label}
            </label>
            <textarea
                name={name}
                rows={3}
                value={formData[name] || ""}
                onChange={handleChange}
                className={`${inputStyle} resize-none`}
            />
        </div>
    );

    /* LOADING UI */
    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center px-3 sm:px-4 py-6 sm:py-10">

            {/* FORM LAYOUT */}
            <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg overflow-hidden">

                {/* HEADER */}
                <div className="px-4 sm:px-6 py-4 border-b bg-gray-50 flex items-center justify-between">

                    {/* LEFT */}
                    <div>
                        <h1 className="text-sm sm:text-lg md:text-xl font-bold text-gray-800 font-serif">
                            Candidate Validation Form
                        </h1>
                        <p className="text-[10px] sm:text-xs text-gray-500">
                            Fill candidate details carefully
                        </p>
                    </div>

                    {/* RIGHT (LOGO) */}
                    <img
                        src="/eisamay.png"
                        alt="logo"
                        className="w-16 sm:w-20 object-contain"
                    />
                </div>

                {/* FORM BODY */}
                <div className="p-4 sm:p-6">

                    {/* GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

                        <Input label="Candidate Name" name="candidateName" />
                        <Input label="Position Applied" name="position" />

                        <Input label="Highest Qualification" name="qualification" />
                        <Input label="Contact Number" name="contact" />

                        <Input label="Current Company" name="currentCompany" />
                        <Input label="Email ID" name="email" type="email" />

                        <Input label="Total Experience" name="totalExperience" />
                        <Input label="Relevant Experience" name="relevantExperience" />

                        {/* DOB */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs sm:text-sm font-semibold text-gray-700 font-serif">
                                D.O.B
                            </label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob || ""}
                                onChange={handleChange}
                                className={`${inputStyle} text-center`}
                            />
                            {formData.dob && (
                                <span className="text-[10px] sm:text-xs text-gray-500">
                                    Age: {calculateAge(formData.dob)} years
                                </span>
                            )}
                        </div>

                        <Input label="Work Location" name="location" />

                        <Input label="Current In-hand Salary" name="currentInHand" />
                        <Input label="Expected In-hand Salary" name="expectedInHand" />

                        <Input label="Current CTC" name="currentCTC" />
                        <Input label="Expected CTC" name="expectedCTC" />

                        <TextArea label="Detailed KRA" name="kra" />
                        <TextArea label="Significant Achievements" name="achievements" />
                        <TextArea label="Reason For Leaving" name="reason" />
                        <TextArea label="Family Details" name="family" />
                        <TextArea label="Strength" name="strength" />
                        <TextArea label="Weakness" name="weakness" />
                        <TextArea label="Why Ei Samay?" name="why" />
                        <TextArea label="Reference" name="reference" />

                    </div>

                    {/* REMARKS */}
                    <div className="mt-4">
                        <label className="text-xs sm:text-sm font-semibold text-gray-700 font-serif">
                            Remarks
                        </label>
                        <textarea
                            name="remarks"
                            rows={3}
                            value={formData.remarks || ""}
                            onChange={handleChange}
                            className={`${inputStyle} resize-none`}
                        />
                    </div>

                </div>

                {/* BUTTON PART */}
                <div className="px-4 sm:px-6 py-4 border-t bg-gray-50 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center">

                    <p className="text-[10px] sm:text-xs text-gray-400 text-center sm:text-left">
                        All fields are confidential and secured
                    </p>

                    <button
                        onClick={() => console.log(formData)}
                        className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2.5 rounded-md shadow hover:bg-indigo-700 transition-all"
                    >
                        Submit
                    </button>

                </div>

            </div>
        </div>
    );
}
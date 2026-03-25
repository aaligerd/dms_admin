import React, { useState } from "react";

export default function CandidateAssessmentForm() {

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const Input = ({ label, name }) => (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">{label}</label>
            <input
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
            />
        </div>
    );

    const TextArea = ({ label, name }) => (
        <div className="flex flex-col gap-1 col-span-2">
            <label className="text-sm font-semibold text-gray-700">{label}</label>
            <textarea
                name={name}
                rows={3}
                value={formData[name] || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 outline-none resize-none"
            />
        </div>
    );

    const Rating = ({ label, name }) => (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-800">{label}</label>
            <select
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500"
            >
                <option value="">Select Rating</option>
                <option>5 - Exceptional</option>
                <option>4 - Exceeds Expectation</option>
                <option>3 - Meets Expectation</option>
                <option>2 - Below Expectation</option>
                <option>1 - Not Fit</option>
            </select>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center py-6 px-3">

            <div className="w-full max-w-6xl bg-white shadow-xl rounded-xl overflow-hidden">

                {/* HEADER */}
                <div className="bg-yellow-500 px-6 py-4 flex justify-between items-center">
                    <h1 className="font-bold text-lg md:text-xl text-black">
                        Candidate Assessment Form
                    </h1>

                    <img
                        src="https://th.bing.com/th/id/OIP.KBt6CnzZHNkYNzszAeXJSwHaD5?w=189&h=99"
                        alt="logo"
                        className="w-20"
                    />
                </div>

                {/* BASIC DETAILS */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

                    <Input label="Applicant Name" name="applicantName" />
                    <Input label="Position" name="position" />

                    <Input label="Department" name="department" />
                    <Input label="HR Name" name="hrName" />

                    <Input label="Current Organisation" name="organisation" />
                    <Input label="Total Experience" name="experience" />

                    <Input label="Highest Qualification" name="qualification" />
                    <Input label="Notice Period" name="noticePeriod" />

                </div>

                {/* INSTRUCTION */}
                <div className="px-6 pb-4 text-sm text-gray-600">
                    Please evaluate the candidate using the rating scale below.
                </div>

                {/* SECTION COMPONENT */}
                {[
                    {
                        title: "1. General Background",
                        fields: [
                            { label: "Background Assessment", name: "background" }
                        ]
                    },
                    {
                        title: "2. Technical Competency",
                        fields: [
                            { label: "Technical Skills", name: "technical" },
                            { label: "Accomplishments & Expertise", name: "accomplishment" }
                        ]
                    },
                    {
                        title: "3. People & Leadership Skills",
                        fields: [
                            { label: "Communication Skills", name: "communication" },
                            { label: "Leadership Skills", name: "leadership" }
                        ]
                    },
                    {
                        title: "4. Aptitude & Planning",
                        fields: [
                            { label: "Flexibility & Planning", name: "planning" },
                            { label: "Organizational Culture Fit", name: "culture" },
                            { label: "Risk Appetite", name: "risk" }
                        ]
                    },
                    {
                        title: "5. Executive Presence",
                        fields: [
                            { label: "Confidence & Maturity", name: "presence" }
                        ]
                    }
                ].map((section, i) => (

                    <div key={i} className="px-6 pb-6">

                        {/* SECTION TITLE */}
                        <div className="bg-yellow-400 px-4 py-2 font-semibold text-sm rounded">
                            {section.title}
                        </div>

                        {/* SECTION CONTENT */}
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">

                            {section.fields.map((f, idx) => (
                                <React.Fragment key={idx}>
                                    <Rating label={f.label} name={`${f.name}_rating`} />
                                    <TextArea label="Assessment Notes" name={`${f.name}_note`} />
                                </React.Fragment>
                            ))}

                        </div>

                    </div>
                ))}

                {/* FINAL SECTION */}
                <div className="px-6 pb-6">

                    <div className="bg-yellow-400 px-4 py-2 font-semibold text-sm rounded">
                        Final Evaluation
                    </div>

                    <div className="mt-4 space-y-5">

                        {/* Cumulative Score */}
                        <div>
                            <Input label="Cumulative Score" name="score" />
                        </div>

                        {/* Remarks */}
                        <div>
                            <TextArea label="Overall Remarks" name="remarks" />
                        </div>

                        {/* DECISION */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">

                            {["Proceed", "Hold", "Reject"].map((btn, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, decision: btn })}
                                    className={`w-full sm:w-auto px-5 py-3 rounded-md font-semibold shadow text-sm transition ${btn === "Proceed"
                                        ? "bg-green-500 text-white"
                                        : btn === "Hold"
                                            ? "bg-yellow-400 text-black"
                                            : "bg-red-500 text-white"
                                        }
                                    ${formData.decision === btn ? "ring-2 ring-offset-2 ring-gray-800" : ""}
                            `}
                                >
                                    {btn}
                                </button>
                            ))}

                        </div>

                        {/* SIGNATURE SECTION */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <Input label="Signature" name="signature" />
                            <Input label="Name & Designation" name="designation" />

                        </div>

                    </div>

                </div>

                {/* SUBMIT */}
                <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
                    <button
                        onClick={() => console.log(formData)}
                        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-all"
                    >
                        Submit Form
                    </button>
                </div>

            </div>
        </div>
    );
}
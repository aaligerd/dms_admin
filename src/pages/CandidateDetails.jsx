import React from "react";
import DownloadButton from "../components/DownloadButton";

const API_ASSET_URL = process.env.REACT_APP_API_ASSET_URL;

const CandidateDetails = ({ candidate }) => {
    if (!candidate) return null;

    const photoUrl = candidate.photo
        ? `${API_ASSET_URL}/static/candidate/${candidate.photo}`
        : null;

    const cvUrl = candidate.cv
        ? `${API_ASSET_URL}/static/candidate/${candidate.cv}`
        : null;

    return (
        <div className="space-y-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-200">

                <div>
                    <p className="font-semibold">Candidate ID</p>
                    <p>{candidate.candidate_id}</p>
                </div>

                <div>
                    <p className="font-semibold">Name</p>
                    <p>{candidate.name || "-"}</p>
                </div>

                <div>
                    <p className="font-semibold">Email</p>
                    <p>{candidate.email}</p>
                </div>

                <div>
                    <p className="font-semibold">Phone</p>
                    <p>{candidate.phone || "-"}</p>
                </div>

            </div>

            {/* Photo */}
            {photoUrl && (
                <div>
                    <p className="font-semibold mb-3">Photo</p>

                    <div className="relative inline-block">
                        <img
                            src={photoUrl}
                            alt="Candidate"
                            className="w-40 h-40 object-cover rounded-lg border shadow"
                        />

                        <DownloadButton
                            url={photoUrl}
                            filename={candidate.name + "_photo"}
                        />
                    </div>
                </div>
            )}

            {/* CV */}
            {cvUrl && (
                <div>
                    <p className="font-semibold mb-3">CV Preview</p>

                    <div className="relative w-full h-[200px] border rounded-lg overflow-hidden shadow">

                        {/* PDF Preview */}
                        <iframe
                            src={cvUrl}
                            title="CV Preview"
                            className="w-full h-full"
                        />

                        <DownloadButton
                            url={cvUrl}
                            filename={candidate.name + "_CV"}
                        />
                    </div>
                </div>
            )}

        </div>
    );
};

export default CandidateDetails;
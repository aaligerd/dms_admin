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
    <div className="space-y-2 sm:space-y-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-sm sm:text-base text-gray-700 dark:text-gray-200">

        <div>
          <p className="font-semibold text-xs sm:text-sm">Candidate ID</p>
          <p className="truncate">{candidate.candidate_id}</p>
        </div>

        <div>
          <p className="font-semibold text-xs sm:text-sm">Name</p>
          <p className="truncate">{candidate.name || "-"}</p>
        </div>

        <div>
          <p className="font-semibold text-xs sm:text-sm">Email</p>
          <p className="truncate">{candidate.email}</p>
        </div>

        <div>
          <p className="font-semibold text-xs sm:text-sm">Phone</p>
          <p>{candidate.phone || "-"}</p>
        </div>

      </div>

      {/* Photo Section */}
      {photoUrl && (
        <div className="space-y-2">
          <p className="font-semibold text-sm">Photo</p>

          <div className="relative inline-block">
            
            {/* Photo Preview */}
            <img
              src={photoUrl}
              alt="Candidate"
              className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-md border shadow-sm"
            />

            <DownloadButton
              url={photoUrl}
              filename={`${candidate.name}_photo`}
            />
          </div>
        </div>
      )}

      {/* CV Section */}
      {cvUrl && (
        <div className="space-y-2">
          <p className="font-semibold text-sm">CV Preview</p>

          <div className="relative w-full h-[160px] sm:h-[200px] border rounded-md overflow-hidden shadow-sm">

            {/* CV Preview */}
            <iframe
              src={cvUrl}
              title="CV Preview"
              className="w-full h-full"
            />

            <DownloadButton
              url={cvUrl}
              filename={`${candidate.name}_CV`}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default CandidateDetails;
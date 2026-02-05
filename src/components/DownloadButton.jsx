import React from 'react'
import { MdOutlineFileDownload } from "react-icons/md";

const DownloadButton = ({ url, filename = "file" }) => {
  if (!url) return null;

  const handleDownload = async () => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="absolute top-2 right-2 flex items-center justify-center h-8 w-8 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-md"
      title="Download file"
    >
      <MdOutlineFileDownload className="text-lg" />
    </button>
  );
};

export default DownloadButton
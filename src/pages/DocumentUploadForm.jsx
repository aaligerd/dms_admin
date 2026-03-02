"use client";
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa6";

export default function DocumentUploadForm() {
  const [formData, setFormData] = useState({
    panNumber: "",
    aadhaarNumber: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    panFile: null,
    aadhaarFile: null,
    passbookFile: null,
  });

  const [marksheets, setMarksheets] = useState([
    { name: "", file: null },
  ]);

  const [certificates, setCertificates] = useState([
    { name: "", file: null },
  ]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // -------- MARKSHEETS --------
  const addMarksheet = () => {
    setMarksheets([...marksheets, { name: "", file: null }]);
  };

  const updateMarksheet = (index, field, value) => {
    const updated = [...marksheets];
    updated[index][field] = value;
    setMarksheets(updated);
  };

  const removeMarksheet = (index) => {
    const updated = marksheets.filter((_, i) => i !== index);
    setMarksheets(updated.length ? updated : [{ name: "", file: null }]);
  };

  // -------- CERTIFICATES --------
  const addCertificate = () => {
    setCertificates([...certificates, { name: "", file: null }]);
  };

  const updateCertificate = (index, field, value) => {
    const updated = [...certificates];
    updated[index][field] = value;
    setCertificates(updated);
  };

  const removeCertificate = (index) => {
    const updated = certificates.filter((_, i) => i !== index);
    setCertificates(updated.length ? updated : [{ name: "", file: null }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      marksheets,
      certificates,
    };

    console.log(payload);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 flex flex-col overflow-hidden">

        <header className="flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-800 border-b shadow-sm">
          <h1 className="flex items-center gap-2 text-2xl font-semibold text-gray-800 dark:text-white">
            <FaUserPlus className="text-indigo-600" size={25} />
            Document Upload
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="w-full max-w-4xl lg:max-w-5xl mx-auto mt-2 lg:mt-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">

              <div className="p-6 bg-indigo-600">
                <h2 className="text-2xl font-bold text-white text-center">
                  Candidate Document Details
                </h2>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-10">

                {/* PAN & Aadhaar Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                      PAN Card Image
                    </label>
                    <input
                      type="file"
                      name="panFile"
                      onChange={handleChange}
                      className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                      Aadhaar Number
                    </label>
                    <input
                      type="text"
                      name="aadhaarNumber"
                      value={formData.aadhaarNumber}
                      onChange={handleChange}
                      className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                      Aadhaar Card Image
                    </label>
                    <input
                      type="file"
                      name="aadhaarFile"
                      onChange={handleChange}
                      className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Bank Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                    Bank Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="bankName"
                      placeholder="Bank Name"
                      value={formData.bankName}
                      onChange={handleChange}
                      className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition"
                    />
                    <input
                      type="text"
                      name="accountNumber"
                      placeholder="Account Number"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition"
                    />
                    <input
                      type="text"
                      name="ifscCode"
                      placeholder="IFSC Code"
                      value={formData.ifscCode}
                      onChange={handleChange}
                      className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition"
                    />
                    <input
                      type="file"
                      name="passbookFile"
                      onChange={handleChange}
                      className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* MARKSHEETS */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                    Marksheets
                  </h3>

                  {marksheets.map((mark, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 rounded-lg border bg-gray-50 dark:bg-gray-700 flex flex-col md:flex-row gap-4 md:items-end"
                    >
                      <input
                        type="text"
                        placeholder="Marksheet Name"
                        value={mark.name}
                        onChange={(e) =>
                          updateMarksheet(index, "name", e.target.value)
                        }
                        className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition flex-1"
                      />
                      <input
                        type="file"
                        onChange={(e) =>
                          updateMarksheet(index, "file", e.target.files[0])
                        }
                        className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => removeMarksheet(index)}
                        className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addMarksheet}
                    className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                  >
                    + Add Marksheet
                  </button>
                </div>

                {/* CERTIFICATES */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                    Certificates
                  </h3>

                  {certificates.map((cert, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 rounded-lg border bg-gray-50 dark:bg-gray-700 flex flex-col md:flex-row gap-4 md:items-end"
                    >
                      <input
                        type="text"
                        placeholder="Certificate Name"
                        value={cert.name}
                        onChange={(e) =>
                          updateCertificate(index, "name", e.target.value)
                        }
                        className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition flex-1"
                      />
                      <input
                        type="file"
                        onChange={(e) =>
                          updateCertificate(index, "file", e.target.files[0])
                        }
                        className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => removeCertificate(index)}
                        className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addCertificate}
                    className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                  >
                    + Add Certificate
                  </button>
                </div>

                {/* Submit */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 font-semibold shadow-md"
                  >
                    Submit Documents
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

//candidate/docx/save
import React from "react";
import { X, CloudUpload, Check, Shield } from "lucide-react";
import { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { api } from "../../services/api";
import { ButtonLoader } from "../button/ButtonLoader";

export const ResumeModal = ({ toggleModal, fetchResume }) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Only PDF and DOCX files are allowed.");
      return;
    }

    setFile(selectedFile);
  };

  const handleInputChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const uploadResume = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", file);

      const res = await axios.post(
        api.defaults.baseURL + "resumes/upload",
        formData,
        {
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setLoading(false);
        toggleModal();
        fetchResume();
      }
    } catch (error) {
    //   console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <div
        className="absolute right-5 top-5 p-1 rounded-lg bg-red-500"
        onClick={toggleModal}
      >
        <X />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-3">Upload Resume</h3>
        <p className="mb-7">Upload Your Resume to get Started</p>
      </div>

      <div className="flex justify-between gap-10">
        <div className="w-full lg:w-1/2">
          <div
            onClick={() => inputRef.current.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-10 cursor-pointer transition
          ${
            dragActive
              ? "border-indigo-500 bg-indigo-500/10"
              : "border-slate-600 hover:border-indigo-400"
          }`}
          >
            <div className="text-center">
              <p className="text-white text-lg font-semibold">
                Drag & Drop Resume Here
              </p>

              <p className="text-slate-400 my-3">or</p>

              <button
                type="button"
                className="bg-indigo-600 px-5 py-2 rounded-lg"
              >
                Browse Files
              </button>

              <p className="text-slate-500 mt-4 text-sm">PDF or DOCX</p>

              {file && (
                <div className="mt-6 text-green-400 font-medium">
                  Selected: {file.name}
                </div>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleInputChange}
            />
          </div>

          {/* Upload Button */}
          <ButtonLoader
            loading={loading}
            onClick={uploadResume}
            text="Upload Resume"
            loadingText="Uploading..."
            className="mt-8 w-full lg:w-1/2 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-semibold"
          />
        </div>

        <div className="hidden lg:block  w-full lg:w-1/2">
          <div className="bg-[#0d1b36] border border-slate-800 rounded-2xl p-6 mb-5 ">
            <h3 className="text-lg font-semibold text-white mb-5">
              Tips for Better Analysis
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Check className="text-green-500" size={18} />
                <span className="text-slate-300">
                  Use a clean and updated resume
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Check className="text-green-500" size={18} />
                <span className="text-slate-300">
                  Focus on sections we analyze
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Check className="text-green-500" size={18} />
                <span className="text-slate-300">PDF format works best</span>
              </div>

              <div className="flex items-center gap-3">
                <Check className="text-green-500" size={18} />
                <span className="text-slate-300">Maximum file size is 5MB</span>
              </div>
            </div>
          </div>

          {/* Privacy Card */}
          <div className="bg-[#0d1b36] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <Shield className="text-indigo-500" size={24} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Your resume are secure and private
                </h3>

                <p className="text-slate-400 mt-2 leading-7">
                  We never share your data with anyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useMemo, useState } from "react";
import {
  Search,
  FileText,
  Upload,
  Calendar,
  HardDrive,
  CheckCircle2,
} from "lucide-react";

export const ResumeSelector = ({
  resumes,
  loading,
  selectedResume,
  setSelectedResume,
}) => {
  const [search, setSearch] = useState("");

  const filteredResumes = useMemo(() => {
    return resumes.filter((resume) =>
      resume.fileName.toLowerCase().includes(search.toLowerCase())
    );
  }, [resumes, search]);

  const formatFileSize = (bytes) => {
    if (!bytes) return "-";

    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-[#0d1b36] border border-slate-800 rounded-2xl p-6">
      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
              <FileText size={18} />
            </div>

            Select Resume
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Choose one of your uploaded resumes.
          </p>
        </div>

      </div>

      {/* Search */}

      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          placeholder="Search resumes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#07162d] border border-slate-700 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-indigo-500 transition"
        />
      </div>

      {/* Loading */}

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Resume List */}

          <div className="space-y-4 max-h-[470px] overflow-y-auto pr-2">
            {filteredResumes.length > 0 ? (
              filteredResumes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((resume) => (
                <div
                  key={resume._id}
                  onClick={() => setSelectedResume(resume)}
                  className={`cursor-pointer rounded-2xl border transition-all duration-300 p-4 flex justify-between items-center
                  
                  ${
                    selectedResume?._id === resume._id
                      ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                      : "border-slate-700 hover:border-indigo-400 hover:bg-slate-800/40"
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Icon */}

                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center
                      
                      ${
                        selectedResume?._id === resume._id
                          ? "bg-indigo-600"
                          : "bg-slate-800"
                      }`}
                    >
                      <FileText size={28} />
                    </div>

                    {/* Info */}

                    <div>
                      <h3 className="font-semibold break-all">
                        {resume.fileName}
                      </h3>

                      <div className="flex flex-wrap gap-5 mt-2 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(resume.createdAt)}
                        </span>

                        <span className="flex items-center gap-1">
                          <HardDrive size={14} />
                          {formatFileSize(resume.fileSize)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Selected */}

                  {selectedResume?._id === resume._id ? (
                    <CheckCircle2
                      className="text-indigo-400 shrink-0"
                      size={28}
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-500 shrink-0" />
                  )}
                </div>
              ))
            ) : (
              <div className="h-60 flex items-center justify-center text-slate-400">
                No resumes found.
              </div>
            )}
          </div>

          {/* Footer */}

          <div className="mt-6 flex justify-between items-center">
            <span className="text-slate-400 text-sm">
              {filteredResumes.length} Resume
              {filteredResumes.length !== 1 && "s"} Found
            </span>

            <button className="text-indigo-400 hover:text-indigo-300 font-medium">
              View All
            </button>
          </div>
        </>
      )}
    </div>
  );
};
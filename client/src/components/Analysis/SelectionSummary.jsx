import React from "react";
import {
  FileText,
  BriefcaseBusiness,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export const SelectionSummary = ({
  selectedResume,
  selectedJob,
}) => {
  const isReady = selectedResume && selectedJob;

  return (
    <div className="bg-[#0d1b36] border border-slate-800 rounded-2xl p-6">
      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">
            Selection Summary
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Review your selections before starting the AI analysis.
          </p>
        </div>

        {isReady ? (
          <CheckCircle2 className="text-green-400" size={30} />
        ) : (
          <AlertCircle className="text-yellow-400" size={30} />
        )}
      </div>

      {/* Resume + Job */}

      <div className="grid md:grid-cols-2 gap-5">
        {/* Resume */}

        <div className="bg-[#07162d] border border-slate-700 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center">
              <FileText size={22} />
            </div>

            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">
                Resume
              </p>

              <h3 className="font-semibold">
                {selectedResume
                  ? selectedResume.fileName
                  : "No Resume Selected"}
              </h3>
            </div>
          </div>

          {selectedResume && (
            <div className="space-y-2 text-sm text-slate-400">
              <p>
                Type :
                <span className="text-white ml-2">
                  {selectedResume.fileType}
                </span>
              </p>

              <p>
                Size :
                <span className="text-white ml-2">
                  {(selectedResume.fileSize / 1024).toFixed(1)} KB
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Job */}

        <div className="bg-[#07162d] border border-slate-700 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center">
              <BriefcaseBusiness size={22} />
            </div>

            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">
                Job Description
              </p>

              <h3 className="font-semibold">
                {selectedJob
                  ? selectedJob.title ||
                    selectedJob.parsedJobData?.title
                  : "No Job Selected"}
              </h3>
            </div>
          </div>

          {selectedJob && (
            <div className="space-y-2 text-sm text-slate-400">
              <p>
                Company :
                <span className="text-white ml-2">
                  {selectedJob.company ||
                    selectedJob.parsedJobData?.company ||
                    "N/A"}
                </span>
              </p>

              <p>
                Experience :
                <span className="text-white ml-2">
                  {selectedJob.experienceLevel ||
                    selectedJob.parsedJobData?.experienceLevel ||
                    "Not Specified"}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Status */}

      <div
        className={`mt-6 rounded-xl border p-5 flex items-center justify-between ${
          isReady
            ? "border-green-500/30 bg-green-500/10"
            : "border-yellow-500/30 bg-yellow-500/10"
        }`}
      >
        <div>
          <h3 className="font-semibold text-lg">
            {isReady
              ? "Ready for AI Analysis"
              : "Selection Required"}
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            {isReady
              ? "Everything looks good. Click Analyze to generate your ATS report."
              : "Please select both a resume and a job description."}
          </p>
        </div>

        <ArrowRight
          size={24}
          className={
            isReady ? "text-green-400" : "text-yellow-400"
          }
        />
      </div>
    </div>
  );
};
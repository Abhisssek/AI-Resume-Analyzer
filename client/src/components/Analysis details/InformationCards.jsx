import React from "react";
import {
  FileText,
  BriefcaseBusiness,
  Calendar,
  Building2,
} from "lucide-react";

export const InformationCards = ({ analysis }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6">

      {/* Resume Information */}

      <div className="bg-[#0d1b36] border border-slate-800 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-11 h-11 rounded-xl bg-indigo-600 flex justify-center items-center">
            <FileText size={20} />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Resume Information
            </h2>

            <p className="text-slate-400 text-sm">
              Resume used for this analysis
            </p>
          </div>

        </div>

        <div className="space-y-5">

          <div>
            <p className="text-slate-500 text-sm">
              Resume Name
            </p>

            <h3 className="font-semibold mt-1">
              {analysis.resumeId?.fileName}
            </h3>
          </div>

          <div>
            <p className="text-slate-500 text-sm">
              Analysis Date
            </p>

            <div className="flex items-center gap-2 mt-1">

              <Calendar size={16} className="text-indigo-400" />

              <span>
                {new Date(
                  analysis.createdAt
                ).toLocaleDateString()}
              </span>

            </div>
          </div>

          <div>
            <p className="text-slate-500 text-sm">
              ATS Score
            </p>

            <h3 className="text-2xl font-bold text-green-400 mt-1">
              {analysis.atsScore}%
            </h3>
          </div>

        </div>

      </div>

      {/* Job Information */}

      <div className="bg-[#0d1b36] border border-slate-800 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-11 h-11 rounded-xl bg-indigo-600 flex justify-center items-center">
            <BriefcaseBusiness size={20} />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Job Information
            </h2>

            <p className="text-slate-400 text-sm">
              Target job description
            </p>
          </div>

        </div>

        <div className="space-y-5">

          <div>
            <p className="text-slate-500 text-sm">
              Job Title
            </p>

            <h3 className="font-semibold mt-1">
              {analysis.jobDescId?.jobTitle}
            </h3>
          </div>

          <div>
            <p className="text-slate-500 text-sm">
              Company
            </p>

            <div className="flex items-center gap-2 mt-1">

              <Building2
                size={16}
                className="text-indigo-400"
              />

              <span>
                {analysis.jobDescId?.company}
              </span>

            </div>
          </div>

          <div>
            <p className="text-slate-500 text-sm">
              Overall Match
            </p>

            <span
              className={`inline-block mt-2 px-4 py-2 rounded-full text-sm font-medium ${
                analysis.atsScore >= 85
                  ? "bg-green-500/20 text-green-400"
                  : analysis.atsScore >= 70
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {analysis.atsScore >= 85
                ? "Strong Match"
                : analysis.atsScore >= 70
                ? "Good Match"
                : "Needs Improvement"}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
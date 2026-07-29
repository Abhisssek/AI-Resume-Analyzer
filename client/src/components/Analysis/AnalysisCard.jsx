import React from "react";
import {
  ArrowRight,
  Calendar,
  BadgeCheck,
} from "lucide-react";
import { useNavigate } from "react-router";

export const AnalysisCard = ({ analysis }) => {
  const navigate = useNavigate();


  console.log(analysis);
  


  const status =
    analysis.atsScore >= 85
      ? "Strong Match"
      : analysis.atsScore >= 70
      ? "Good Match"
      : "Needs Improvement";

  const color =
    analysis.atsScore >= 85
      ? "text-green-400"
      : analysis.atsScore >= 70
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div
      onClick={() =>
        navigate(`/analysis/${analysis._id}`)
      }
      className="cursor-pointer rounded-2xl border border-slate-800 bg-[#0d1b36] p-6 hover:border-indigo-500 transition"
    >
      <div className="flex justify-between">

        <div>

          <div className="flex items-center gap-3 mb-3">

            <div className="h-14 w-14 rounded-xl bg-indigo-600 flex justify-center items-center text-xl font-bold">
              {analysis.atsScore}%
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                {analysis.jobTitle || "Job Analysis"}
              </h2>

              <p className={color}>
                {status}
              </p>
            </div>

          </div>

          <p className="text-slate-400 line-clamp-2">
            {analysis.analysisSummary}
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            {analysis.matchedKeywords
              ?.slice(0, 4)
              .map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-sm bg-indigo-500/10 border border-indigo-500/20"
                >
                  {skill}
                </span>
              ))}
          </div>

          <div className="flex items-center gap-5 mt-5 text-slate-400 text-sm">

            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(
                analysis.createdAt
              ).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2">
              <BadgeCheck size={16} />
              ATS {analysis.atsScore}%
            </div>

          </div>

        </div>

        <ArrowRight className="text-slate-500" />

      </div>
    </div>
  );
};
import React from "react";
import { FileText, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

export const AnalysisOverview = ({
  analyses,
  loading,
}) => {
  const navigate = useNavigate();


  console.log(analyses, "ana");
  

  if (loading) {
    return (
      <div className="bg-[#0d1b36] rounded-2xl border border-slate-800 p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#0d1b36] rounded-2xl border border-slate-800 p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            Recent Analyses
          </h2>

          <p className="text-slate-400 text-sm">
            Your latest AI reports
          </p>
        </div>

        <button
          onClick={() => navigate("/analysis/all")}
          className="text-indigo-400 hover:text-indigo-300"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {analyses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5).map((analysis) => (
          <div
            key={analysis._id}
            onClick={() =>
              navigate(`/analysis/${analysis._id}`)
            }
            className="cursor-pointer rounded-xl border border-slate-700 bg-[#07162d] p-4 hover:border-indigo-500 transition"
          >
            <div className="flex justify-between">
              <div className="flex gap-3">
                {/* <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center"> */}
                  {/* <FileText size={18} /> */}
                {/* </div> */}

                <div>
                  <h3 className="font-semibold">
                    ATS Score {analysis.atsScore}%
                  </h3>

                  <p className="text-sm text-slate-400">
                    {analysis.analysisSummary?.slice(0, 60)}
                    ...
                  </p>
                </div>
              </div>

              <ChevronRight />
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {analysis.matchedKeywords
                ?.slice(0, 3)
                .map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>
        ))}

        {analyses.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            No analyses found.
          </div>
        )}
      </div>
    </div>
  );
};
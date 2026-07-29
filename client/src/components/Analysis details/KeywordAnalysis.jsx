import React from "react";
import { CheckCircle2, CircleAlert } from "lucide-react";

export const KeywordsAnalysis = ({
  matchedKeywords = [],
  missingKeywords = [],
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6">

      {/* Matched Keywords */}

      <div className="bg-[#0d1b36] border border-slate-800 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-11 h-11 rounded-xl bg-green-600 flex justify-center items-center">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Matched Keywords
            </h2>

            <p className="text-slate-400 text-sm">
              Skills successfully identified in your resume
            </p>
          </div>

        </div>

        <div className="flex flex-wrap gap-3">

          {matchedKeywords.length ? (
            matchedKeywords.map((keyword, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-sm"
              >
                {keyword}
              </span>
            ))
          ) : (
            <p className="text-slate-400">
              No matched keywords found.
            </p>
          )}

        </div>

      </div>

      {/* Missing Keywords */}

      <div className="bg-[#0d1b36] border border-slate-800 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-11 h-11 rounded-xl bg-red-600 flex justify-center items-center">
            <CircleAlert size={20} />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Missing Keywords
            </h2>

            <p className="text-slate-400 text-sm">
              Important skills missing from your resume
            </p>
          </div>

        </div>

        <div className="flex flex-wrap gap-3">

          {missingKeywords.length ? (
            missingKeywords.map((keyword, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-sm"
              >
                {keyword}
              </span>
            ))
          ) : (
            <p className="text-green-400 font-medium">
              🎉 No missing keywords!
            </p>
          )}

        </div>

      </div>

    </div>
  );
};
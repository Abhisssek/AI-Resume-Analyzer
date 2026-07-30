import React from "react";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";

export const AnalyzeButton = ({
  analyzing,
  disabled,
  onAnalyze,
}) => {
  return (
    <div className="bg-[#0d1b36] border border-slate-800 rounded-2xl p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left */}

        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 hidden lg:flex items-center justify-center">
              <Sparkles size={22} />
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                AI Resume Analysis
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Analyze your resume against the selected job description.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-2 text-sm text-slate-400">
            <p>• ATS Compatibility Score</p>
            <p>• Skills Matching</p>
            <p>• Missing Keywords</p>
            <p>• Improvement Suggestions</p>
          </div>
        </div>

        {/* Right */}

        <div className="flex flex-col items-start lg:items-end gap-4">
          <div className="text-sm text-slate-400">
            Estimated Time
            <span className="block text-white font-medium">
              5 - 10 Seconds
            </span>
          </div>

          <button
            onClick={onAnalyze}
            disabled={disabled || analyzing}
            className={`min-w-[240px] flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold transition-all duration-300

            ${
              disabled
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.02] active:scale-100"
            }`}
          >
            {analyzing ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Resume
                <ArrowRight size={20} />
              </>
            )}
          </button>

          {disabled && (
            <p className="text-xs text-red-400">
              Select both a resume and a job description.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
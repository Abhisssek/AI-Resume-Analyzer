import React from "react";
import { CheckCircle2, Lightbulb } from "lucide-react";

export const StrengthsSuggestions = ({
  strengths = [],
  suggestions = [],
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6">

      {/* Strengths */}

      <div className="bg-[#0d1b36] border border-slate-800 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-11 h-11 rounded-xl bg-green-600 flex justify-center items-center">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Strengths
            </h2>

            <p className="text-slate-400 text-sm">
              Areas where your resume performs well
            </p>
          </div>

        </div>

        <div className="space-y-4">

          {strengths.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 items-start"
            >
              <CheckCircle2
                size={18}
                className="text-green-400 mt-1 shrink-0"
              />

              <p className="text-slate-300 leading-7">
                {item}
              </p>
            </div>
          ))}

        </div>

      </div>

      {/* Suggestions */}

      <div className="bg-[#0d1b36] border border-slate-800 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-11 h-11 rounded-xl bg-yellow-500 flex justify-center items-center">
            <Lightbulb size={20} />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Suggestions
            </h2>

            <p className="text-slate-400 text-sm">
              Improve your ATS score
            </p>
          </div>

        </div>

        <div className="space-y-4">

          {suggestions.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 items-start"
            >
              <Lightbulb
                size={18}
                className="text-yellow-400 mt-1 shrink-0"
              />

              <p className="text-slate-300 leading-7">
                {item}
              </p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};
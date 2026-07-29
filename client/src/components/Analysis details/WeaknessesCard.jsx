import React from "react";
import { TriangleAlert, CircleCheckBig } from "lucide-react";

export const WeaknessesCard = ({ weaknesses = [] }) => {
  return (
    <div className="bg-[#0d1b36] border border-slate-800 rounded-2xl p-6">

      <div className="flex items-center gap-3 mb-6">

        <div className="w-11 h-11 rounded-xl bg-red-600 flex justify-center items-center">
          <TriangleAlert size={20} />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Weaknesses
          </h2>

          <p className="text-slate-400 text-sm">
            Areas that need improvement
          </p>
        </div>

      </div>

      {weaknesses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">

          <CircleCheckBig
            size={55}
            className="text-green-400 mb-4"
          />

          <h3 className="text-xl font-semibold text-green-400">
            Great Job!
          </h3>

          <p className="text-slate-400 mt-2 text-center max-w-lg">
            No major weaknesses were detected in your resume.
            Keep your resume updated as your skills and
            experience grow.
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          {weaknesses.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 items-start"
            >
              <TriangleAlert
                size={18}
                className="text-red-400 mt-1 shrink-0"
              />

              <p className="text-slate-300 leading-7">
                {item}
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};
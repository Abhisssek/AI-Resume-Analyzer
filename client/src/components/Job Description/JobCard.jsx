import React from "react";
import { Briefcase, Building2, Clock3, ChevronRight } from "lucide-react";

export const JobCard = ({ job, onClick }) => {
  const requiredSkills =
    job.parsedJobData?.requiredSkills || job.parsedData?.requiredSkills || [];

  const experience =
    job.parsedJobData?.experienceRequired ||
    job.parsedData?.experienceRequired ||
    "Not Specified";

  return (
    <div
      onClick={onClick}
      className="
    group
    cursor-pointer
    rounded-2xl
    border
    border-slate-700
    bg-[#102243]
    p-6
    flex
    flex-col
    h-full
    transition-all
    duration-300
    hover:border-indigo-500
    hover:-translate-y-1
    hover:shadow-[0_0_30px_rgba(99,102,241,.25)]
  "
    >
      {/* Job Title */}

      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center">
            <Briefcase size={22} className="text-indigo-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold line-clamp-1">
              {job.jobTitle}
            </h2>

            <div className="flex items-center gap-2 mt-1 text-slate-400 text-sm">
              <Building2 size={15} />

              <span>{job.company}</span>
            </div>
          </div>
        </div>

        <ChevronRight
          className="
            text-slate-500
            group-hover:text-indigo-400
            transition
          "
        />
      </div>

      {/* Experience */}

      <div className="mt-6 flex items-center gap-2">
        <Clock3 size={17} className="text-indigo-400" />

        <span className="text-sm text-slate-300">{experience}</span>
      </div>

      {/* Skills */}

      <div className="mt-6 flex-1 mb-5">
        <p className="text-sm text-slate-400 mb-3">Required Skills</p>

        <div className="flex flex-wrap gap-2">
          {requiredSkills.length > 0 ? (
            requiredSkills.slice(0, 6).map((skill, index) => (
              <span
                key={index}
                className="
            px-3
            py-1
            rounded-full
            bg-indigo-500/15
            border
            border-indigo-500/20
            text-indigo-300
            text-xs
          "
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-slate-500 text-sm">No skills available</span>
          )}
        </div>
      </div>

      {/* Footer */}

      <div className="mt-auto pt-5 border-t border-slate-700 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {new Date(job.createdAt).toLocaleDateString()}
        </span>

        <span className="text-indigo-400 text-sm font-medium">
          View Details
        </span>
      </div>
    </div>
  );
};

import React, { useMemo, useState } from "react";
import {
  Search,
  BriefcaseBusiness,
  Plus,
  Building2,
  Clock3,
  CheckCircle2,
} from "lucide-react";

export const JobDescriptionSelector = ({
  jobs,
  loading,
  selectedJob,
  setSelectedJob,
}) => {
  const [search, setSearch] = useState("");

  console.log(jobs);
  

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const title =
        job.jobTitle || job.parsedJobData?.title || "";

      const company =
        job.company || job.parsedJobData?.company || "";

      return (
        title.toLowerCase().includes(search.toLowerCase()) ||
        company.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [jobs, search]);

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
              <BriefcaseBusiness size={18} />
            </div>

            Select Job Description
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Choose the job description to compare with your resume.
          </p>
        </div>
{/* 
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl transition">
          <Plus size={18} />
          Create
        </button> */}
      </div>

      {/* Search */}

      <div className="relative mb-6">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          size={18}
        />

        <input
          type="text"
          placeholder="Search Job Description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#07162d] border border-slate-700 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-indigo-500 transition"
        />
      </div>

      {/* Loading */}

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Job Cards */}

          <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
            {filteredJobs.length > 0 ? (
              filteredJobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((job) => {
                const title = job.jobTitle || job.parsedJobData?.title;
                const company = job.company || job.parsedJobData?.company;
                const type =
                  job.parsedJobData?.jobType ||
                  "N/A";
                const experience =
                  job.parsedJobData?.experienceRequired ||
                  "N/A";

                return (
                  <div
                    key={job._id}
                    onClick={() => setSelectedJob(job)}
                    className={`cursor-pointer rounded-xl border p-5 transition-all duration-300

                    ${
                      selectedJob?._id === job._id
                        ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                        : "border-slate-700 hover:border-indigo-400 hover:bg-slate-800/40"
                    }`}
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-4">
                        <div
                          className={`w-14 h-14 rounded-xl flex justify-center items-center

                          ${
                            selectedJob?._id === job._id
                              ? "bg-indigo-600"
                              : "bg-slate-800"
                          }`}
                        >
                          <BriefcaseBusiness size={28} />
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg">
                            {title}
                          </h3>

                          <div className="flex items-center gap-2 text-slate-400 mt-1">
                            <Building2 size={15} />
                            {company || "Unknown Company"}
                          </div>
                        </div>
                      </div>

                      {selectedJob?._id === job._id ? (
                        <CheckCircle2
                          size={28}
                          className="text-indigo-400 shrink-0"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-slate-500 shrink-0" />
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3 mt-5">
                      {type && (
                        <span className="px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-sm">
                          {type}
                        </span>
                      )}

                      {experience && (
                        <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-sm">
                          {experience}
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex items-center gap-2 text-slate-400 text-sm">
                      <Clock3 size={15} />
                      Created {formatDate(job.createdAt)}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-60 flex items-center justify-center text-slate-400">
                No job descriptions found.
              </div>
            )}
          </div>

          {/* Footer */}

          <div className="mt-6 flex justify-between items-center">
            <span className="text-slate-400 text-sm">
              {filteredJobs.length} Job Description
              {filteredJobs.length !== 1 && "s"}
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
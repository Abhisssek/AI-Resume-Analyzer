// JobDescriptionsAll.jsx

import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { Search } from "lucide-react";
import { JobCard } from "./JobCard";
import { JobDetailsModal } from "./JobDetailsModal";
import axios from "axios";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../Home/Auth/AuthProvider";
import { useEffect } from "react";
import { useState } from "react";

export const JobDescriptionsAll = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 8;

  const { user, userLoading, fetchUser } = useAuth();

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await axios.get(api.defaults.baseURL + "jobdesc", {
        withCredentials: true,
      });
      // console.log(res);

      if (res.data.success) {
        setJobs(res.data.jobDescs);
        setFilteredJobs(res.data.jobDescs);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredJobs(jobs);
      setCurrentPage(1);
      return;
    }

    const keyword = search.toLowerCase();

    const filtered = jobs.filter((job) => {
      const title = job.jobTitle?.toLowerCase() || "";
      const company = job.company?.toLowerCase() || "";

      const skills =
        job.parsedJobData?.requiredSkills?.join(" ").toLowerCase() || "";

      return (
        title.includes(keyword) ||
        company.includes(keyword) ||
        skills.includes(keyword)
      );
    });

    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [search, jobs]);

  if (userLoading) return <div>Loading...</div>;
  if (!user && !userLoading) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-[#07162d] text-white md:flex">
      <Sidebar />

      <div className="flex-1 px-6 pt-24 pb-28 md:p-10">
        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
          <div>
            <h1 className="text-3xl font-bold">Job Descriptions</h1>

            <p className="text-slate-400 mt-2">
              {filteredJobs.length} Job Description
              {filteredJobs.length !== 1 && "s"}
            </p>
          </div>

          {/* Search */}

          <div className="relative w-full lg:w-96">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search by title, company or skill..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#102243] border border-slate-700 outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Cards */}

        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">No Job Descriptions</h2>

              <p className="text-slate-400 mt-2">Try another search.</p>
            </div>
          </div>
        ) : (
          <>
            <div
              className="
    grid
    grid-cols-1
    lg:grid-cols-2
    xl:grid-cols-3
    gap-6
    items-stretch
  "
            >
              {currentJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onClick={() => setSelectedJob(job)}
                />
              ))}
            </div>

            {/* Pagination */}

            <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`px-4 py-2 rounded-lg border transition ${
                  currentPage === 1
                    ? "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed"
                    : "bg-[#102243] border-slate-700 hover:border-indigo-500"
                }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-lg transition ${
                    currentPage === index + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-[#102243] border border-slate-700 hover:border-indigo-500"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`px-4 py-2 rounded-lg border transition ${
                  currentPage === totalPages
                    ? "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed"
                    : "bg-[#102243] border-slate-700 hover:border-indigo-500"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Modal */}

        {selectedJob && (
          <JobDetailsModal
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
          />
        )}
      </div>
    </div>
  );
};

import React, { use } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { JobDescriptionManual } from "./JobDescriptionManual";
import { useAuth } from "../Home/Auth/AuthProvider";
import { Navigate } from "react-router";
// import { JobDescriptionURL } from "./JobDescriptionURL";
import { Link } from "react-router";
import axios from "axios";
import { api } from "../../services/api";
// import { JobDescriptionResult } from "./JobDescriptionResult";
import { Loader } from "../Loader/Loader";

export const JobDescription = () => {
  // const [open, setOpen] = React.useState(false);

  const { user, userLoading, fetchUser } = useAuth();
  // const [activeTab, setActiveTab] = useState("manual");
  const [jobDescription, setJobDescription] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const steps = [
    "Add job details or paste job URL.",
    "Our AI will analyze the job description.",
    "Compare with your resume and get ATS score.",
  ];

  const fetchJobDescription = async (data) => {
    try {
      setLoading(true);
      const result = await axios.get(api.defaults.baseURL + "jobdesc", {
        withCredentials: true,
      });
      // console.log(result);

      if (result.data.success) setLoading(false);
      setJobDescription(result.data.jobDescs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDescription();
  }, []);

  //   console.log("JobDescription", {
  //   user,
  //   userLoading,
  // });
  // console.log(jobDescription);

  if (userLoading) return <Loader />;
  if (!user && !userLoading) return <Navigate to="/" replace />;

  // const toggleType = () => setOpen(!open);
  return (
    <div className="min-h-screen bg-[#07162d] text-white md:flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 pt-24 md:pt-10 mb-7">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
          <div>
            <h1 className="text-4xl font-bold">Create Job Description</h1>
            <p className="text-slate-400 mt-2">
              Enter job details manually or paste a job URL.
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="mt-10 bg-[#0d1b36] border border-slate-800 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Left Section */}
            <div className="flex-1">
              <JobDescriptionManual fetchJobDescription={fetchJobDescription} />
            </div>

            {/* Right Section */}
            <div className="xl:w-[450px] ">
              <div className="bg-[#102243] border border-slate-700 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold">
                    Parsed Job Descriptions
                  </h2>

                  <Link
                    to="/job-description/all"
                    className="text-sm text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    View All
                  </Link>
                </div>

                {loading ? (
                  <Loader />
                ) : (
                  <div className=" space-y-4 ">
                    {jobDescription
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                      )
                      .slice(0, 3)
                      .map((job, index) => (
                        <div
                          key={job._id}
                          className="flex gap-3 pb-4 border-b border-slate-700 last:border-none last:pb-0"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-semibold shrink-0">
                            {index + 1}
                          </div>

                          <div className="flex-1 overflow-hidden">
                            <h3 className="text-white font-sm line-clamp-1">
                              {job?.jobTitle || "Untitled Job"}
                            </h3>

                            <p className="text-sm text-slate-400 line-clamp-2 mt-1">
                              {job.jobDescription}
                            </p>

                            <p className="text-sm text-primary  font-bold line-clamp-2 mt-1">
                              - {job.company}
                            </p>

                            <p className="text-xs text-slate-500 mt-2">
                              {new Date(job.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}

                    {jobDescription.length === 0 && (
                      <p className="text-center text-slate-400 py-6">
                        No parsed job descriptions yet.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

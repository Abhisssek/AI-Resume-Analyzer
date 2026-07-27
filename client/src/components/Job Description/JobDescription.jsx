import React, { use } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { JobDescriptionManual } from "./JobDescriptionManual";
import { useAuth } from "../Home/Auth/AuthProvider";
import { Navigate } from "react-router";

export const JobDescription = () => {
  // const [open, setOpen] = React.useState(false);

  const { user, userLoading, fetchUser } = useAuth();
  const [activeTab, setActiveTab] = useState("manual");

  useEffect(() => {
    fetchUser();
  }, []);

  const steps = [
    "Add job details or paste job URL.",
    "Our AI will analyze the job description.",
    "Compare with your resume and get ATS score.",
  ];


//   console.log("JobDescription", {
//   user,
//   userLoading,
// });

  if (userLoading) return <div>Loading...</div>;
  if(!user && !userLoading) return <Navigate to="/" replace />

  // const toggleType = () => setOpen(!open);
  return (
    <div className="min-h-screen bg-[#07162d] text-white md:flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 pt-24 md:pt-10">
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
              {/* Tabs */}
              <div className="flex w-full max-w-md rounded-xl overflow-hidden border border-slate-700 mb-8">
                <button
                  onClick={() => setActiveTab("manual")}
                  className={`flex-1 py-3 font-medium transition ${
                    activeTab === "manual"
                      ? "bg-indigo-600 text-white"
                      : "bg-[#102243] text-slate-400 hover:bg-[#13284e]"
                  }`}
                >
                  Create Manually
                </button>

                <button
                  onClick={() => setActiveTab("url")}
                  className={`flex-1 py-3 font-medium transition ${
                    activeTab === "url"
                      ? "bg-indigo-600 text-white"
                      : "bg-[#102243] text-slate-400 hover:bg-[#13284e]"
                  }`}
                >
                  Paste Job URL
                </button>
              </div>

              {/* Forms */}
              {activeTab === "manual" ? (
                <JobDescriptionManual />
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm text-slate-300">
                      Job URL
                    </label>

                    <input
                      type="text"
                      placeholder="https://linkedin.com/jobs/..."
                      className="w-full rounded-xl border border-slate-700 bg-[#09172f] px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <button className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 transition py-3 font-semibold">
                    Analyze Job URL
                  </button>
                </div>
              )}
            </div>

            {/* Right Section */}
            <div className="xl:w-[300px]">
              <div className="bg-[#102243] border border-slate-700 rounded-2xl p-6 h-fit">
                <h2 className="text-xl font-semibold mb-8">How it works?</h2>

                <div className="space-y-8">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold shrink-0">
                        {index + 1}
                      </div>

                      <p className="text-slate-300 leading-6">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

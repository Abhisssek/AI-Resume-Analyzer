import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { useState } from "react";
import { JobDescriptionManual } from "./JobDescriptionManual";

export const JobDescription = () => {
  // const [open, setOpen] = React.useState(false);

  const [activeTab, setActiveTab] = useState("manual");

  const steps = [
    "Add job details or paste job URL.",
    "Our AI will analyze the job description.",
    "Compare with your resume and get ATS score.",
  ];

  // const toggleType = () => setOpen(!open);
  return (
    <div className="md:flex">
      <Sidebar />
      <div className="p-10 w-full">
        <div>
          <h3 className="text-4xl font-bold">Create Job Description</h3>
          <p className="text-slate-400 mt-2">
            Enter the job details manually or paste Url (LinkedIn)
          </p>
        </div>
        <div className="flex gap-3 mt-10">
          <button
            onClick={() => setActiveTab("manual")}
            className={`px-6 py-2 rounded-lg border transition-all duration-300 ${
              activeTab === "manual"
                ? "bg-indigo-600/20 border-indigo-500 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"
            }`}
          >
            Create Manually
          </button>

          <button
            onClick={() => setActiveTab("url")}
            className={`px-6 py-2 rounded-lg border transition-all duration-300 ${
              activeTab === "url"
                ? "bg-indigo-600/20 border-indigo-500 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"
            }`}
          >
            Paste Job URL
          </button>
        </div>

        <div className="flex justify-between">
          <div>
            {activeTab === "manual" && (
              <div className="mt-6">
                <JobDescriptionManual />
              </div>
            )}

            {activeTab === "url" && <div className="mt-6">URL Form</div>}
          </div>
          <div className="border border-slate-700 p-5 rounded-2xl">
            <h2 className="mb-6 text-lg font-semibold text-white">
              How it works?
            </h2>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600/20 text-indigo-400 font-semibold border border-indigo-500/30">
                    {index + 1}
                  </div>

                  <p className="text-sm leading-6 text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

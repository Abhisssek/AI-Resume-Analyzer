import React, { useEffect, useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { ResumeSelector } from "./ResumeSelector";
import { JobDescriptionSelector } from "./JobDescriptionSelector";
import { AnalysisOverview } from "./AnalysisOverview";
import { SelectionSummary } from "./SelectionSummary";
import { AnalyzeButton } from "./AnalyzeButton";
import { api } from "../../services/api";
import axios from "axios";
import { useAuth } from "../Home/Auth/AuthProvider";

export const Analysis = () => {
  const { user, userLoading, fetchUser } = useAuth();
  // Resume State
  const [resumes, setResumes] = useState([]);
  const [resumeLoading, setResumeLoading] = useState(true);

  // Analysis History
  const [analyses, setAnalyses] = useState([]);
  const [analysisLoading, setAnalysisLoading] = useState(true);

  // Job Description State
  const [jobs, setJobs] = useState([]);
  const [jobLoading, setJobLoading] = useState(true);

  // Selected Items
  const [selectedResume, setSelectedResume] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  // console.log(resumes, jobs);

  useEffect(() => {
    fetchUser();
  }, []);

  // Analysis
  const [analyzing, setAnalyzing] = useState(false);

  // Result (optional)
  const [analysisResult, setAnalysisResult] = useState(null);

  // ---------------- Resume ----------------

  const fetchResumes = async () => {
    try {
      setResumeLoading(true);

      const { data } = await axios.get(api.defaults.baseURL + "resumes", {
        withCredentials: true,
      });

      // console.log(data);

      setResumes(data.resumes);
    } catch (err) {
      console.log(err);
    } finally {
      setResumeLoading(false);
    }
  };

  // ---------------- Job ----------------

  const fetchJobs = async () => {
    try {
      setJobLoading(true);

      const { data } = await axios.get(api.defaults.baseURL + "jobdesc", {
        withCredentials: true,
      });

      // console.log(data);
      setJobs(data.jobDescs);
    } catch (err) {
      console.log(err);
    } finally {
      setJobLoading(false);
    }
  };

  const fetchAnalyses = async () => {
    try {
      setAnalysisLoading(true);

      const { data } = await axios.get(api.defaults.baseURL + "analysis", {
        withCredentials: true,
      });

      // console.log(data.analysis);

      // adjust if your backend returns data.analysis
      setAnalyses(data.analysis);
    } catch (err) {
      console.log(err);
    } finally {
      setAnalysisLoading(false);
    }
  };

  
  useEffect(() => {
    fetchResumes();
    fetchJobs();
    fetchAnalyses();
    // fetchUser();
  }, []);
  // ---------------- Analyze ----------------
  console.log(analyses);

  const analyzeResume = async () => {
    if (!selectedResume || !selectedJob) {
      alert("Please select both Resume and Job Description.");
      return;
    }

    try {
      setAnalyzing(true);

      const payload = {
        resumeId: selectedResume._id,
        jobDescId: selectedJob._id,
      };

      console.log(payload);

      const { data } = await axios.post(
        api.defaults.baseURL + "analysis",
        payload,
        {
          withCredentials: true,
        },
      );

      setAnalysisResult(data);

      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setAnalyzing(false);
    }
  };

  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (!user && !userLoading) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#07162d] text-white md:flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 pt-24 md:pt-10">
        {/* Header */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold">Resume Analysis</h1>

          <p className="text-slate-400 mt-2">
            Compare your resume with a job description and generate an
            AI-powered ATS report.
          </p>
        </div>

        {/* Resume + Overview */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <ResumeSelector
              resumes={resumes}
              loading={resumeLoading}
              selectedResume={selectedResume}
              setSelectedResume={setSelectedResume}
            />
          </div>

          <AnalysisOverview analyses={analyses} loading={analysisLoading} />
        </div>

        {/* Job Description */}

        <div className="mt-6">
          <JobDescriptionSelector
            jobs={jobs}
            loading={jobLoading}
            selectedJob={selectedJob}
            setSelectedJob={setSelectedJob}
          />
        </div>

        {/* Summary */}

        <div className="mt-6">
          <SelectionSummary
            selectedResume={selectedResume}
            selectedJob={selectedJob}
          />
        </div>

        {/* Analyze */}

        <div className="mt-6">
          <AnalyzeButton
            analyzing={analyzing}
            disabled={!selectedResume || !selectedJob}
            onAnalyze={analyzeResume}
          />
        </div>
      </main>
    </div>
  );
};

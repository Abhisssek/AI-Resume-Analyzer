import React, { useEffect, useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { api } from "../../services/api";
import { ArrowLeft } from "lucide-react";
import { AnalysisSummaryCard } from "./AnalysisSummaryCard";
import { StrengthsSuggestions } from "./StrengthsSuggestions";
import { KeywordsAnalysis } from "./KeywordAnalysis";
import { InformationCards } from "./InformationCards";
import { WeaknessesCard } from "./WeaknessesCard";

export const AnalysisDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalysis = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        api.defaults.baseURL + "analysis/" + id,
        {
          withCredentials: true,
        },
      );

      console.log(data);

      setAnalysis(data.analysis);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  console.log(analysis);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07162d] text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07162d] text-white md:flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 pt-24 md:pt-10">
        {/* Back Button */}

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Analyses
        </button>

        {/* Header */}

        <div className="flex justify-between items-start flex-wrap gap-5 mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              {analysis.jobDescId?.jobTitle}
            </h1>

            <p className="text-slate-400 mt-2">{analysis.jobDescId?.company}</p>

            <p className="text-slate-500 text-sm mt-1">
              {new Date(analysis.createdAt).toLocaleDateString()} •{" "}
              {analysis.resumeId?.fileName}
            </p>
          </div>

          
        </div>

        {/* Score Section */}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* ATS Card */}

          {/* ATS Card */}

          <div className="bg-[#0d1b36] rounded-2xl border border-slate-800 p-6">
            <h2 className="text-xl font-semibold mb-8">ATS Score</h2>

            <div className="flex justify-center">
              <div
                className={`relative h-44 w-44 rounded-full flex items-center justify-center transition-all duration-700 ease-out
        ${
          analysis.atsScore >= 85
            ? "border-[12px] border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.45)]"
            : analysis.atsScore >= 70
              ? "border-[12px] border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.45)]"
              : "border-[12px] border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.45)]"
        }
        animate-pulse`}
              >
                <div className="absolute inset-2 rounded-full bg-[#07162d]" />

                <div className="relative z-10 text-center">
                  <h1 className="text-6xl font-bold">{analysis.atsScore}</h1>

                  <p className="text-slate-400 text-sm mt-1">/100</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Match</span>
                <span>{analysis.atsScore}%</span>
              </div>

              <div className="w-full h-3 rounded-full bg-slate-700 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out
          ${
            analysis.atsScore >= 85
              ? "bg-green-500"
              : analysis.atsScore >= 70
                ? "bg-yellow-400"
                : "bg-red-500"
          }`}
                  style={{ width: `${analysis.atsScore}%` }}
                />
              </div>
            </div>

            <p
              className={`text-center font-semibold mt-6 text-lg
      ${
        analysis.atsScore >= 85
          ? "text-green-400"
          : analysis.atsScore >= 70
            ? "text-yellow-400"
            : "text-red-400"
      }`}
            >
              {analysis.atsScore >= 85
                ? "🔥 Strong Match"
                : analysis.atsScore >= 70
                  ? "👍 Good Match"
                  : "⚠️ Needs Improvement"}
            </p>
          </div>

          {/* Section Scores */}

          <div className="bg-[#0d1b36] rounded-2xl border border-slate-800 p-6">
            <h2 className="text-xl font-semibold mb-6">Section Breakdown</h2>

            {Object.entries(analysis.sectionScores).map(([key, value]) => (
              <div key={key} className="mb-5">
                <div className="flex justify-between mb-2">
                  <span className="capitalize">{key}</span>

                  <span>{value}%</span>
                </div>

                <div className="w-full h-3 rounded-full bg-slate-700">
                  <div
                    style={{ width: `${value}%` }}
                    className="h-3 rounded-full bg-green-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <AnalysisSummaryCard summary={analysis.analysisSummary} />
        </div>
        <div className="mt-6">
          <StrengthsSuggestions
            strengths={analysis.strengths}
            suggestions={analysis.suggestions}
          />
        </div>
        <div className="mt-6">
          <KeywordsAnalysis
            matchedKeywords={analysis.matchedKeywords}
            missingKeywords={analysis.missingKeywords}
          />
        </div>
        <div className="mt-6">
          <InformationCards analysis={analysis} />
        </div>
        <div className="mt-6">
          <WeaknessesCard weaknesses={analysis.weaknesses} />
        </div>
      </main>
    </div>
  );
};

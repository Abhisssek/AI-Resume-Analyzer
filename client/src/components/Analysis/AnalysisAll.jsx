import React, { useEffect, useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { api } from "../../services/api";
import axios from "axios";
import { AnalysisCard } from "./AnalysisCard";
import { Search } from "lucide-react";

export const AnalysisAll = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchAnalyses = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        api.defaults.baseURL + "analysis",
        {
          withCredentials: true,
        }
      );

      setAnalyses(data.analysis || data.analyses || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const filtered = analyses.filter((analysis) => {
    const text = `${analysis.jobTitle || ""}
                  ${analysis.company || ""}
                  ${analysis.resumeName || ""}
                  ${analysis.analysisSummary || ""}`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#07162d] text-white md:flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 pt-24 md:pt-10">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Analysis History
          </h1>

          <p className="text-slate-400 mt-2">
            View and manage all your AI-powered resume analyses.
          </p>
        </div>

        <div className="relative mb-8">
          <Search
            className="absolute left-4 top-3.5 text-slate-400"
            size={20}
          />

          <input
            placeholder="Search analyses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0d1b36] border border-slate-700 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-indigo-500"
          />
        </div>

        {loading ? (
          <div className="text-center py-20">
            Loading...
          </div>
        ) : filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).length ? (
          <div className="grid gap-6 mb-19 md:mb-0">
            {filtered.map((analysis) => (
              <AnalysisCard
                key={analysis._id}
                analysis={analysis}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            No analyses found.
          </div>
        )}
      </main>
    </div>
  );
};
import React, { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import {
  Search,
  Bell,
  FileText,
  FileUser,
  ChartColumnIncreasing,
  Trophy,
} from "lucide-react";
import { Sidebar } from "../Sidebar/Sidebar";
import { useAuth } from "../Home/Auth/AuthProvider";
import { api } from "../../services/api";
import { NoData } from "../no data/NoData";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Loader } from "../Loader/Loader";

export const Dashboard = () => {
  const { user, userLoading, fetchUser } = useAuth();

  const [resume, setResume] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("All");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    async function loadDataResume() {
      try {
        setLoading(true);
        const resumeRes = await axios.get(api.defaults.baseURL + "resumes", {
          withCredentials: true,
        });

        if (resumeRes.data.success) {
          setResume(resumeRes.data.resumes);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadDataResume();
  }, []);



  useEffect(() => {
    async function loadDataAnalysis() {
      try {
        setLoading(true);
        const analysisRes = await axios.get(api.defaults.baseURL + "analysis", {
          withCredentials: true,
        });

        if (analysisRes.data.success) {
          setAnalysis(analysisRes.data.analysis);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadDataAnalysis();
  }, []);

  if (userLoading) return <Loader />;

  if (!userLoading && !user) return <Navigate to="/" replace />;

  const averageScore =
    analysis.length > 0
      ? (
          analysis.reduce((a, b) => a + b.atsScore, 0) / analysis.length
        ).toFixed(1)
      : 0;

  const highestScore =
    analysis.length > 0 ? Math.max(...analysis.map((i) => i.atsScore)) : 0;

  const stats = [
    {
      title: "Total Resumes",
      value: resume.length,
      icon: <FileUser size={22} />,
      color: "bg-blue-500/10 text-blue-400",
    },
    {
      title: "Analyses",
      value: analysis.length,
      icon: <FileText size={22} />,
      color: "bg-purple-500/10 text-purple-400",
    },
    {
      title: "Average Score",
      value: averageScore,
      icon: <ChartColumnIncreasing size={22} />,
      color: "bg-green-500/10 text-green-400",
    },
    {
      title: "Highest Score",
      value: highestScore,
      icon: <Trophy size={22} />,
      color: "bg-yellow-500/10 text-yellow-400",
    },
  ];

  // console.log(resume);

  const chartData =
    analysis.map((item) => ({
      score: item.atsScore,
      date: `${new Date(item.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} ${new Date(item.createdAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      month: new Date(item.createdAt).toLocaleDateString("en-US", {
        month: "long",
      }),
    })) || [];

  const months = ["All", ...new Set(chartData.map((item) => item.month))];

  const filteredData =
    selectedMonth === "All"
      ? chartData
      : chartData.filter((item) => item.month === selectedMonth);

  // console.log(chartData);

  return (
    <div className="min-h-screen bg-[#07162d] text-white md:flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 pt-24 md:pt-10 pb-24">
        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>

            <p className="mt-2 text-slate-400">
              Welcome back,
              <span className="text-white font-semibold"> {user.name}</span>
            </p>
          </div>

          <div className="flex items-center gap-5">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}`}
              className="w-11 h-11 rounded-full"
            />
          </div>
        </div>

        {/* Cards */}

        {!loading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
              {stats.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl bg-[#0d1b36] border border-slate-800 p-6 hover:border-indigo-500 transition"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}
                  >
                    {card.icon}
                  </div>

                  <h4 className="mt-6 text-slate-400">{card.title}</h4>

                  <h2 className="text-4xl font-bold mt-2">{card.value}</h2>
                </div>
              ))}
            </div>

            {/* PART 2 STARTS BELOW */}
            {/* ================= Bottom Grid ================= */}

            <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6 mt-8">
              {/* Recent Analysis */}

              <div className="bg-[#0d1b36] rounded-2xl border border-slate-800 p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Recent Analysis</h2>

                    <p className="text-slate-400 text-sm mt-1">
                      Latest resume analyses
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {analysis.length === 0 ? (
                    <NoData
                      title="No Analysis Yet"
                      description="Upload your resume and analyze it against a job description to see your ATS scores."
                    />
                  ) : (
                    analysis
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                      )
                      .slice(0, 5)
                      .map((item) => (
                        <div
                          key={item._id}
                          className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 sm:items-center p-4 rounded-xl bg-[#07162d] border border-slate-800 hover:border-indigo-500 transition"
                        >
                          <div>
                            <h3 className="font-semibold truncate w-[180px]">
                              {item.resumeId?.fileName}
                            </h3>

                            <p className="text-slate-400 text-sm mt-1">
                              {new Date(item.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </p>
                          </div>

                          <div
                            className={`font-bold text-md ${
                              item.atsScore >= 80
                                ? "text-green-400"
                                : item.atsScore >= 60
                                  ? "text-yellow-400"
                                  : "text-red-400"
                            }`}
                          >
                            {item.atsScore}%
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>

              {/* Score Trend */}

              <div className="bg-[#0d1b36] rounded-2xl border border-slate-800 p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Score Trend</h2>

                    <p className="text-slate-400 text-sm mt-1">
                      ATS score over time
                    </p>
                  </div>

                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="rounded-lg border border-slate-700 bg-[#07162d] px-4 py-2 outline-none"
                  >
                    {months.map((month) => (
                      <option
                        key={month}
                        value={month}
                        className="bg-[#07162d]"
                      >
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                {filteredData.length === 0 ? (
                  <NoData
                    title="No Score Data"
                    description="Analyze at least one resume to view your ATS score trend."
                  />
                ) : (
                  <div className="h-[330px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={filteredData}>
                        <XAxis
                          dataKey="date"
                          stroke="#94A3B8"
                          axisLine={false}
                          tickLine={false}
                        />

                        <YAxis
                          domain={[0, 100]}
                          stroke="#94A3B8"
                          axisLine={false}
                          tickLine={false}
                        />

                        <Tooltip
                          contentStyle={{
                            background: "#07162d",
                            border: "1px solid #334155",
                            borderRadius: "14px",
                            color: "#fff",
                          }}
                        />

                        <Line
                          dataKey="score"
                          stroke="#6366F1"
                          strokeWidth={4}
                          dot={{
                            r: 5,
                            fill: "#6366F1",
                          }}
                          activeDot={{
                            r: 8,
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

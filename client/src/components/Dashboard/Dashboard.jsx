// import { Sidebar } from 'lucide-react'
import React, { useState } from "react";
import { useEffect } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { useAuth } from "../Home/Auth/AuthProvider";
import { Navigate } from "react-router";
import axios from "axios";
import { api } from "../../services/api";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export const Dashboard = () => {
  const { user, userLoading, fetchUser } = useAuth();
  const [resume, setResume] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("All");

  // console.log(user);

  useEffect(() => {
    fetchUser();
  }, []);

  const chartData =
    analysis?.map((item) => ({
      score: item.atsScore,
      date: new Date(item.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      month: new Date(item.createdAt).toLocaleDateString("en-US", {
        month: "long",
      }),
    })) || [];

  const months = [
    "All",
    ...new Set(
      analysis?.map((item) =>
        new Date(item.createdAt).toLocaleDateString("en-US", {
          month: "long",
        })
      )
    ),
  ];

  const filteredData =
    selectedMonth === "All"
      ? chartData
      : chartData.filter((item) => item.month === selectedMonth);

  useEffect(() => {
    async function loadResume() {
      const response = await axios.get(api.defaults.baseURL + "resumes", {
        withCredentials: true,
      });
      // console.log(response.data);
      setResume(response.data.resumes);
    }
    loadResume();
  }, []);

  useEffect(() => {
    async function loadAnalysis() {
      const response = await axios.get(api.defaults.baseURL + "analysis", {
        withCredentials: true,
      });
      // console.log(response.data);
      setAnalysis(response.data.analysis);
    }
    loadAnalysis();
  }, []);

  const stats = [
    {
      title: "Total Resumes",
      value: resume?.length || 0,
    },
    {
      title: "Total Analysis",
      value: analysis?.length || 0,
    },
    {
      title: "Average Score",
      value:
        analysis?.reduce((acc, curr) => acc + curr.atsScore, 0) /
          analysis?.length || 0,
    },
    {
      title: "Top Score",
      value:
        analysis?.reduce((acc, curr) => Math.max(acc, curr.atsScore), 0) || 0,
    },
  ];

  console.log(analysis);

  if (userLoading) return <div>Loading...</div>;
  if (!userLoading && !user) return <Navigate to="/" replace />;

  return (
    <div className="md:flex">
      <Sidebar />
      <div>
        <div>
          <h2>Dashboard</h2>
          <h4>Welcome Back, {user.name}!</h4>
          <h6>Here is what happening with your character journey</h6>
        </div>

        <div>
          {stats.map((stat, idx) => {
            return (
              <div key={idx}>
                <h3>{stat.title}</h3>
                <p>{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div>
          <div>
            <h3>Recent Analysis</h3>
            <div>
              {analysis?.slice(0, 4).map((analysis, idx) => {
                return (
                  <div key={idx}>
                    <h4>{analysis?.resumeId?.fileName}</h4>
                    <p>{analysis.atsScore}</p>
                    <p>{analysis.createdAt.split("T")[0]}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full rounded-2xl border border-slate-800 bg-[#07162d] p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Score Trend</h3>

              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="rounded-lg border border-slate-700 bg-[#0d1b36] px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
              >
                {months.map((month) => (
                  <option key={month} value={month} className="bg-[#0d1b36]">
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                  <XAxis
                    dataKey="date"
                    stroke="#94A3B8"
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    domain={[0, 100]}
                    stroke="#94A3B8"
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0d1b36",
                      border: "1px solid #334155",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#6366F1"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      fill: "#6366F1",
                      stroke: "#6366F1",
                    }}
                    activeDot={{
                      r: 7,
                      fill: "#6366F1",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

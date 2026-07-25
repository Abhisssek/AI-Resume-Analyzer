// import { Sidebar } from 'lucide-react'
import React, { use, useEffect } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { useAuth } from "../Home/Auth/AuthProvider";
import { Navigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { api } from "../../services/api";
import { Eye } from "lucide-react";

export const Resume = () => {
  const { user, userLoading, fetchUser } = useAuth();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchResume = async () => {
    try {
      const result = await axios.get(api.defaults.baseURL + "resumes", {
        withCredentials: true,
      });

      setResumes(result.data.resumes);

      // console.log(result.data.resumes   );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  // console.log(resumes);



  const downloadResume = async (resume) => {
  const response = await fetch(resume.fileUrl);
  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = resume.fileName; // Use your stored filename
  document.body.appendChild(a);
  a.click();

  a.remove();
  window.URL.revokeObjectURL(url);
};

  if (userLoading) return <div>Loading...</div>;
  if (!user && !userLoading) return <Navigate to="/" replace />;
  
  
  
  
  
  
  
  return (
    <div className="min-h-screen bg-[#07162d] text-white md:flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 pt-24 md:pt-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between  items-start lg:items-center gap-5">
          <div>
            <h1 className="text-4xl font-bold">My Resumes</h1>
            <p className="text-slate-400 mt-2">
              Manage all your uploaded resumes
            </p>
          </div>

          <button className="bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold">
            Upload Resume
          </button>
        </div>

        {/* Table */}
        <div className="mt-10 bg-[#0d1b36] border border-slate-800 rounded-2xl overflow-hidden">

  {/* Desktop Table */}
  <div className="hidden lg:block overflow-x-auto">
    <table className="w-full min-w-[700px]">
      <thead className="bg-[#102243] border-b border-slate-800">
        <tr>
          <th className="text-left px-6 py-5 text-slate-300 font-semibold">
            Resume Name
          </th>

          <th className="text-left px-6 py-5 text-slate-300 font-semibold">
            File Type
          </th>

          <th className="text-left px-6 py-5 text-slate-300 font-semibold">
            Uploaded On
          </th>

          <th className="text-center px-6 py-5 text-slate-300 font-semibold">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {resumes.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center py-16 text-slate-500">
              No resumes uploaded yet.
            </td>
          </tr>
        ) : (
          resumes.map((resume) => (
            <tr
              key={resume._id}
              className="border-b border-slate-800 hover:bg-[#102243] transition"
            >
              <td className="px-6 py-5 font-medium truncate max-w-xs">
                {resume.fileName}
              </td>

              <td className="px-6 py-5">
                <span className="px-3 py-1 rounded-lg bg-indigo-500/15 text-indigo-400 text-sm font-semibold uppercase">
                  {resume.fileType}
                </span>
              </td>

              <td className="px-6 py-5 text-slate-400">
                {new Date(resume.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>

              <td className="px-6 py-5 text-center">
                <button
                  onClick={() => downloadResume(resume)}
                  className="text-slate-400 hover:text-indigo-400 transition"
                >
                  <Eye size={20} />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>

  {/* Mobile Cards */}
  <div className="lg:hidden divide-y divide-slate-800">
    {resumes.length === 0 ? (
      <div className="text-center py-12 text-slate-500">
        No resumes uploaded yet.
      </div>
    ) : (
      resumes.map((resume) => (
        <div key={resume._id} className="p-5">
          <h3 className="font-semibold break-all">
            {resume.fileName}
          </h3>

          <div className="flex justify-between items-center mt-4">
            <span className="px-3 py-1 rounded-lg bg-indigo-500/15 text-indigo-400 text-xs uppercase">
              {resume.fileType}
            </span>

            <span className="text-sm text-slate-400">
              {new Date(resume.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <button
            onClick={() => downloadResume(resume)}
            className="mt-5 w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg py-2 font-medium"
          >
            <Eye size={18} />
            View Resume
          </button>
        </div>
      ))
    )}
  </div>

  {resumes.length > 0 && (
    <div className="px-6 py-4 text-sm text-slate-500 border-t border-slate-800">
      Showing 1 to {resumes.length} of {resumes.length} resumes
    </div>
  )}
</div>
      </main>
    </div>
  );
};

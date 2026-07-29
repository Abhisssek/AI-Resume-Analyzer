import React from "react";
import {
  Brain,
  LayoutDashboard,
  FileUser,
  FileText,
  ChartLine,
  History,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { api } from "../../services/api";
import { useAuth } from "../Home/Auth/AuthProvider";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Resumes",
      path: "/resume",
      icon: <FileUser size={20} />,
    },
    {
      name: "Job Descriptions",
      path: "/job-description",
      icon: <FileText size={20} />,
    },
    {
      name: "Analyses",
      path: "/analysis",
      icon: <ChartLine size={20} />,
    },
    {
      name: "History",
      path: "/history",
      icon: <History size={20} />,
    },
  ];

  const handleLogout = async () => {
    try {
      const res = await axios.get(api.defaults.baseURL + "users/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (err) {
      toast.error("Logout Failed");
    }
  };

  return (
    <>
      {/* ================= Desktop Sidebar ================= */}

      <aside
        className="
        hidden
        md:flex
        w-[280px]
        min-h-screen
        bg-[#08152b]
        border-r
        border-slate-800
        flex-col
        justify-between
        p-6
        sticky
        top-0
        "
      >
        <div>
          {/* Logo */}

          <div className="flex items-center gap-3 mb-12">
            <div className="p-3 rounded-xl bg-indigo-600/10">
              <Brain size={32} className="text-indigo-500" />
            </div>

            <div>
              <h2 className="font-bold text-lg">AI Resume</h2>

              <p className="text-sm text-slate-400">Analyzer</p>
            </div>
          </div>

          {/* Navigation */}

          <div className="space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-4
                  px-4
                  py-3
                  rounded-xl
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }
                  `
                }
              >
                {link.icon}

                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Bottom */}

        <div className="space-y-5">
          <div className="border-t border-slate-700"></div>

          <div className="flex items-center gap-3">
             <img
              src={`https://ui-avatars.com/api/?name=${user?.name}`}
              className="w-11 h-11 rounded-full"
            />

            <div>
              <h4 className="font-semibold">{user?.name}</h4>

              <p className="text-sm text-slate-400">Resume Builder</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            hover:bg-red-500/10
            text-red-400
            transition
            "
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= Mobile Bottom Navigation ================= */}

      {/* ================= Mobile ================= */}

      <div className="md:hidden">
        {/* Top Navbar */}

        <div className="fixed top-0 left-0 right-0 z-50 bg-[#08152b]/95 backdrop-blur-md border-b border-slate-700">
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-600/10">
                <Brain size={28} className="text-indigo-500" />
              </div>

              <div>
                <h2 className="text-sm font-bold text-white">AI Resume</h2>

                <p className="text-xs text-slate-400">Analyzer</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}

        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#08152b]/95 backdrop-blur-md border-t border-slate-700">
          <div className="flex justify-around items-center py-3">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 text-xs transition-all
            ${isActive ? "text-indigo-400" : "text-slate-400"}`
                }
              >
                {link.icon}

                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

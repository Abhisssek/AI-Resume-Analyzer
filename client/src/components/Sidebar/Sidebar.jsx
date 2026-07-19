import { Brain } from "lucide-react";
import {
  LogOut,
  LayoutDashboard,
  FileUser,
  FileText,
  ChartLine,
  History,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  // const toggleOpen = () => setOpen(!open)

  const links = [
    {
      name: "Dashboard",
      link: "/dashboard",
      element: <LayoutDashboard />,
    },
    {
      name: "Resume",
      link: "/resume",
      element: <FileUser />,
    },
    {
      name: "Job Description",
      link: "/job-description",
      element: <FileText />,
    },
    {
      name: "Analysis",
      link: "/analysis",
      element: <ChartLine />,
    },
    {
      name: "History",
      link: "/history",
      element: <History />,
    },
  ];
  return (
    <div className="w-full relative md:w-[25%] md:bg-[rgba(27,28,71,0.3)] md:shadow-[0_4px_30px_rgba(0,0,0,0.1)] md:backdrop-blur-[8.4px] p-10 flex flex-col gap-25 md:h-screen justify-between">
      <div className="flex items-center gap-5">
        <Brain className="w-9 md:w-fit" size={52} color="#6366f1" />
        <h2 className="w-25 md:w-fit text-md lg:text-2xl font-bold">
          AI Resume Analyzer
        </h2>
      </div>
      <div className="hidden md:flex md:flex-col gap-9 ">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.link}
            className={({
              isActive,
            }) => `text-lg font-light tracking-wider xl:text-2xl  hover:text-gray-300
            ${
              isActive
                ? "bg-[rgba(38,11,110,0.2)] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[9.6px] border border-[rgba(38,11,110,0.3)] px-3 py-3"
                : "px-3 "
            } `}
          >
            <div className="flex gap-2 items-center">
              {/* {link.element} */}
              {link.name}
            </div>
          </NavLink>
        ))}
      </div>

      <div className="absolute right-8 top-[-80px] md:static flex gap-2 items-center mt-35">
        <LogOut className="font-bold" size={20} color="#6366f1" />
        <span className="font-bold md:block hidden">Logout</span>
      </div>

      <div className="md:hidden fixed bottom-5 left-0 right-0 bg-[rgba(27, 28, 71, 0.3)] backdrop-blur-[8.4px] border-t border-secondary">
        <div className="flex justify-around items-center p-2">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.link}
              className={({ isActive }) =>
                `p-2 rounded-xl ${
                  isActive
                    ? "bg-[rgba(38,11,110,0.2)] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[9.6px] border border-[rgba(38,11,110,0.3)]"
                    : ""
                } `
              }
            >
              <div className="flex flex-col items-center">
                {link.element}
                {/* <span className="text-xs mt-1">{link.name}</span> */}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

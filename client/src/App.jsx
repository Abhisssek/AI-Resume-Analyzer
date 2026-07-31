// import React from 'react'
import { RouterProvider, createBrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { Home } from "./components/Home/Home";
import { use } from "react";
import { About } from "./components/About/About";
import { Login } from "./components/Home/Auth/Login/Login";
import { Signup } from "./components/Home/Auth/Signup/Signup";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Resume } from "./components/Resume/Resume";
import { JobDescription } from "./components/Job Description/JobDescription";
import { Analysis } from "./components/Analysis/Analysis";
// import { History } from "./components/History/History";
import { JobDescriptionsAll } from "./components/Job Description/JobDescriptionsAll";
import { AnalysisAll } from "./components/Analysis/AnalysisAll";
import { AnalysisCard } from "./components/Analysis/AnalysisCard";
import { AnalysisDetail } from "./components/Analysis details/AnalysisDetails";
import Features from "./components/Home/Hero/feature/Feature";
import HowItWorks from "./components/Home/Hero/working/HowItWorks";
import GetStarted from "./components/Home/Hero/get started/GetStarted";
import Demo from "./components/Home/Hero/demo/Demo";
import { NotFound } from "./components/not found/NotFound";

export const App = () => {
  const routes = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    {path: "/dashboard", element: <Dashboard />},
    {path: "/resume", element:<Resume />},
    {path: "/job-description", element:<JobDescription/>},
    {path: "/job-description/all", element:<JobDescriptionsAll/>},
    {path: "/analysis", element:<Analysis/>},
    // {path: "/history", element:<History/>},
    {path: "/analysis/all", element:<AnalysisAll/>},
    {path: "/analysis/:id", element:<AnalysisDetail/>},
    {path: "/features", element:<Features/>},
    {path: "/working", element:<HowItWorks/>},
    {path: "/get-started", element:<GetStarted/>},
    {path: "/demo", element:<Demo/>},
    {path: "*", element:<NotFound/>},
  ]);

  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #374151",
          },
        }}
      />
      <RouterProvider router={routes} />
    </div>
  );
};

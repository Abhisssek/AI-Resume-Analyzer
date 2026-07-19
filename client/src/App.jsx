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
import { History } from "./components/History/History";

export const App = () => {
  const routes = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    {path: "/dashboard", element: <Dashboard />},
    {path: "/resume", element:<Resume />},
    {path: "/job-description", element:<JobDescription/>},
    {path: "/analysis", element:<Analysis/>},
    {path: "/history", element:<History/>}


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

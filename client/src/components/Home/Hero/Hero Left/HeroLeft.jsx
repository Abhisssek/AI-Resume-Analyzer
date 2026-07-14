import React from "react";
import { Sparkles } from "lucide-react";

export const HeroLeft = () => {
  return (
    <div className=" w-full lg:px-17 lg:py-10 px-3 py-2 lg:w-[55%] mt-20 ">
      <div className="flex gap-2 items-center bg-[#0e2343] w-fit py-2 px-5 rounded-full">
        <Sparkles className="text-primary mb-1" />
        <h1 className="text-xl font-semibold text-[#c9d7f6] ">Ai Powered Career Success</h1>
      </div>
      <div className="mt-6 flex flex-col gap-5 ">
        <div>
          <h1 className="text-7xl font-semibold mb-5 ">Optimize Your Resume</h1>
          <span className="text-primary text-7xl font-semibold">Get More Interview.</span>
          <p className="text-2xl mt-7 text-[#575E6F]">
            AI-Powered ATS analysis to help you match your resume with job
            descriptions and land your dream job.
          </p>
        </div>
        <div className=" flex gap-5">
          <button className="bg-primary text-white text-lg font-bold px-7 py-3 rounded-sm hover:bg-primary/80">
            Get Started Free
          </button>
          <button className="bg-secondary border text-lg font-bold border-primary/40 hover:bg-secondary/80   text-[#acb6cf] px-7 py-3 rounded-sm">
            View Demo
          </button>
        </div>
      </div>
    </div>
  );
};

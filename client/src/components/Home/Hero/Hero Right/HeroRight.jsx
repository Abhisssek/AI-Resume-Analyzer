import React from "react";

export const HeroRight = () => {
  const skills = [
    "HTML",
    "JavaScript",
    "CSS",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Python",
    "Django",
  ];

  const score = 85;
  const radius = 70;
  const circumference = Math.PI * radius;
  const progress = circumference - (score / 100) * circumference;

  return (
    <div className="w-full xl:w-[40%] px-7 xl:px-0   mt-10  py-4">
      <div className="bg-[#041221] border border-[#232b3b] rounded-2xl p-5 py-20  sm:p-8 lg:p-10">
        <div className="flex flex-col mb-15 xl:flex-row items-center xl:items-start gap-8">
          
          {/* ATS Score */}
          <div className="flex flex-col items-center w-full xl:w-auto">
            <h3 className="text-white font-bold text-xl mb-4">ATS Score</h3>

            <div className="relative w-[180px] sm:w-[220px] h-[120px] sm:h-[140px]">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 180 100"
                className="overflow-visible"
              >
                <path
                  d="M20 90 A70 70 0 0 1 160 90"
                  fill="none"
                  stroke="#3b4a67"
                  strokeWidth="12"
                  strokeLinecap="round"
                />

                <path
                  d="M20 90 A70 70 0 0 1 160 90"
                  fill="none"
                  stroke="#38d39f"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={progress}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center mt-8 sm:mt-14">
                <span className="text-4xl sm:text-5xl font-bold text-white">
                  {score}
                </span>
                <span className="text-gray-400 text-sm">/100</span>
              </div>
            </div>
          </div>

          {/* Strong Skills */}
          <div className="w-full">
            <h3 className="text-white font-bold text-xl mb-4 text-center xl:text-left">
              Strong Skills
            </h3>

            <div className="flex flex-wrap gap-2 justify-center xl:justify-start">
              {skills.slice(0, 5).map((skill, index) => (
                <div
                  key={index}
                  className="bg-[#0A1F29] px-4 py-2 rounded-md"
                >
                  <span className="text-sm sm:text-base text-[#38D39F] font-semibold">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Missing Skills */}
        <div className="mt-8 w-full">
          <h3 className="text-white font-bold text-xl mb-4 text-center xl:text-left">
            Missing Skills
          </h3>

          <div className="flex flex-wrap gap-2 justify-center xl:justify-start">
            {skills.slice(5).map((skill, index) => (
              <div
                key={index}
                className="bg-[#bd20253b] px-4 py-2 rounded-md"
              >
                <span className="text-sm sm:text-base text-[#D03030] font-semibold">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
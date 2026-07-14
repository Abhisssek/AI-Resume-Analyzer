import React from "react";

export const HeroRight = () => {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Python",
    "Django",
  ];

  const score = 85;
  const radius = 70;
  const circumference = Math.PI * radius; // half circle
  const progress = circumference - (score / 100) * circumference;
  return (
    <div className=" w-full lg:w-[45%] mt-15 lg:px-17 lg:py-10 px-3 py-2  h-fit">
      <div className="bg-[#041221] border-[0.1px] flex flex-col items-center 2xl:items-start border-[#232b3b] rounded-[20px] lg:px-10 lg:py-20 w-full overflow-auto">
        <div className="flex flex-col lg:flex-row flex-wrap justify-center 2xl:justify-start w-full gap-3 h-fit ">
          <div className="flex flex-col items-center justify-center  p-6 rounded-xl w-[250px]">
            <h3 className="text-white font-bold text-xl ml-3">ATS Score</h3>

            <div className="relative w-[200px] h-[120px]">
              <svg
                width="200"
                height="120"
                viewBox="0 0 180 100"
                className="overflow-visible"
              >
                {/* Background Arc */}
                <path
                  d="M20 90 A70 70 0 0 1 160 90"
                  fill="none"
                  stroke="#3b4a67"
                  strokeWidth="12"
                  strokeLinecap="round"
                />

                {/* Progress Arc */}
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

              {/* Score Text */}

              <div className="absolute inset-0 flex flex-col items-center justify-center mt-10">
                <span className="text-5xl font-bold text-white">{score}</span>
                <span className="text-gray-400 text-sm">/100</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold text-xl ml-3 mb-3 mt-6">
              Strong skills
            </h3>
            <div className="flex flex-wrap w-85 gap-2 list-none">
              {skills.slice(0, 5).map((skill, index) => {
                return (
                  <div className="bg-[#0A1F29] px-6 py-2 rounded-md ">
                    <li
                      className="text-lg text-[#38D39F] font-semibold "
                      key={index}
                    >
                      {skill}
                    </li>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="">
          <h3 className="text-white font-bold text-xl ml-3 mb-3 mt-6">
            Missing skills
          </h3>
          <div className="flex flex-wrap w-85 gap-2 list-none">
            {skills.slice(5).map((skill, index) => {
              return (
                <div className="bg-[#bd20253b] px-6 py-2 rounded-md ">
                  <li
                    className="text-lg text-[#D03030] font-semibold "
                    key={index}
                  >
                    {skill}
                  </li>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import {
  X,
  Building2,
  Briefcase,
  Clock3,
  GraduationCap,
  MapPin,
  Globe,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

export const JobDetailsModal = ({ job, onClose }) => {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";

    // console.log(job.jobDescription);
    

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const parsed = job.parsedJobData || {};

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          lg:w-[80vw]
          h-[90vh]
          lg:h-[80vh]
          bg-[#102243]
          rounded-3xl
          border
          border-slate-700
          overflow-hidden
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div className="sticky top-0 bg-[#102243] border-b border-slate-700 px-8 py-6 flex justify-between items-start z-20">
          <div>
            <h1 className="text-3xl font-bold">
              {job.jobTitle}
            </h1>

            <div className="flex items-center gap-2 mt-2 text-slate-300">
              <Building2 size={18} />
              {job.company}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 rounded-full bg-[#09172f] hover:bg-red-500 transition flex items-center justify-center"
          >
            <X />
          </button>
        </div>

        {/* BODY */}

        <div className="overflow-y-auto h-[calc(80vh-95px)] px-8 py-8">

          {/* INFO GRID */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

            <div className="bg-[#09172f] rounded-xl p-5">
              <Briefcase className="text-indigo-400 mb-3" />
              <p className="text-slate-400 text-sm">Job Title</p>
              <h3 className="font-semibold mt-1">
                {job.jobTitle}
              </h3>
            </div>

            <div className="bg-[#09172f] rounded-xl p-5">
              <Clock3 className="text-indigo-400 mb-3" />
              <p className="text-slate-400 text-sm">Experience</p>
              <h3 className="font-semibold mt-1">
                {parsed.experienceRequired || "Not Mentioned"}
              </h3>
            </div>

            <div className="bg-[#09172f] rounded-xl p-5">
              <GraduationCap className="text-indigo-400 mb-3" />
              <p className="text-slate-400 text-sm">Education</p>
              <h3 className="font-semibold mt-1">
                {parsed.education || "Not Mentioned"}
              </h3>
            </div>

            <div className="bg-[#09172f] rounded-xl p-5">
              <MapPin className="text-indigo-400 mb-3" />
              <p className="text-slate-400 text-sm">Location</p>
              <h3 className="font-semibold mt-1">
                {parsed.location || "Not Mentioned"}
              </h3>
            </div>
          </div>

          {/* REQUIRED SKILLS */}

          <section className="mt-10">
            <h2 className="text-xl font-semibold mb-5">
              Required Skills
            </h2>

            <div className="flex flex-wrap gap-3">
              {(parsed.requiredSkills || []).map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* PREFERRED SKILLS */}

          {(parsed.preferredSkills?.length ?? 0) > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold mb-5">
                Preferred Skills
              </h2>

              <div className="flex flex-wrap gap-3">
                {parsed.preferredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* RESPONSIBILITIES */}

          {(parsed.responsibilities?.length ?? 0) > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold mb-5">
                Responsibilities
              </h2>

              <div className="space-y-3">
                {parsed.responsibilities.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-start"
                  >
                    <CheckCircle2
                      size={20}
                      className="text-green-400 mt-1"
                    />

                    <p className="text-slate-300 leading-7">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* QUALIFICATIONS */}

          {(parsed.qualifications?.length ?? 0) > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold mb-5">
                Qualifications
              </h2>

              <div className="space-y-3">
                {parsed.qualifications.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-start"
                  >
                    <CheckCircle2
                      size={20}
                      className="text-green-400 mt-1"
                    />

                    <p className="text-slate-300 leading-7">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* JOB DESCRIPTION */}

          <section className="mt-10">
            <h2 className="text-xl font-semibold mb-5">
              Original Job Description
            </h2>

            <div className="bg-[#09172f] rounded-2xl border border-slate-700 p-6 whitespace-pre-wrap leading-8 text-slate-300">
              {job.jobDescription}
            </div>
          </section>

          {/* FOOTER */}

          <section className="mt-10 grid md:grid-cols-2 gap-5">

            <div className="bg-[#09172f] rounded-xl p-5 flex gap-3 items-center">
              <CalendarDays className="text-indigo-400" />

              <div>
                <p className="text-slate-400 text-sm">
                  Created
                </p>

                <h3>
                  {new Date(job.createdAt).toLocaleString()}
                </h3>
              </div>
            </div>

            {job.sourceUrl && (
              <a
                href={job.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-[#09172f] overflow-hidden  rounded-xl p-5 flex gap-3 items-center hover:border-indigo-500 border border-transparent transition"
              >
                <Globe className="text-indigo-400" />

                <div>
                  <p className="text-slate-400 text-sm">
                    Source URL
                  </p>

                  <h3 className="truncate">
                    {job.sourceUrl}
                  </h3>
                </div>
              </a>
            )}

          </section>
        </div>
      </div>
    </div>
  );
};
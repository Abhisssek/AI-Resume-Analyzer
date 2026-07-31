import {
  UploadCloud,
  FileText,
  Brain,
  BarChart3,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Navbar } from "../../Navbar/Navbar";
import { useNavigate } from "react-router";
import { useAuth } from "../../Auth/AuthProvider";
import { useEffect } from "react";
import { Navigate } from "react-router";

const steps = [
  {
    icon: UploadCloud,
    step: "Step 1",
    title: "Upload Your Resume",
    description:
      "Upload your resume in PDF or DOCX format. Our AI securely extracts all the important information within seconds.",
  },
  {
    icon: FileText,
    step: "Step 2",
    title: "Paste Job Description",
    description:
      "Paste any job description or upload it to compare your resume against the employer's exact requirements.",
  },
  {
    icon: Brain,
    step: "Step 3",
    title: "AI Processes Everything",
    description:
      "Advanced AI parses your resume and the job description, identifying skills, experience, keywords, and qualifications.",
  },
  {
    icon: BarChart3,
    step: "Step 4",
    title: "Receive ATS Analysis",
    description:
      "Get a detailed ATS score, keyword match percentage, strengths, weaknesses, and missing skills.",
  },
  {
    icon: Sparkles,
    step: "Step 5",
    title: "Improve & Apply",
    description:
      "Follow AI recommendations to optimize your resume before applying for your dream job.",
  },
];

const highlights = [
  "AI-powered resume parsing",
  "ATS compatibility score",
  "Keyword matching",
  "Skill gap analysis",
  "Resume suggestions",
  "Secure cloud storage",
];

export default function HowItWorks() {


    const {user, userLoading, fetchUser} = useAuth();


  useEffect(() => {
    fetchUser();
  }, []);
  
  const navigate = useNavigate()
  
     if(userLoading) return <>Loading ...</>
      if(user && !userLoading) return <Navigate to="/dashboard" replace />
  return (
    <>
        <Navbar />
    <section className="bg-[#051224] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="text-center mb-20">
          <span className="px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm">
            How It Works
          </span>

          <h2 className="text-5xl font-bold text-white mt-6">
            Analyze Your Resume in
            <span className="text-indigo-500"> Five Simple Steps</span>
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-slate-400 text-lg">
            Our AI-powered workflow helps you understand exactly how your
            resume performs against any job description and what improvements
            are needed to maximize your interview chances.
          </p>
        </div>

        {/* Timeline */}

        <div className="relative">

          <div className="hidden lg:block absolute left-0 right-0 top-16 h-[2px] bg-slate-800"></div>

          <div className="grid lg:grid-cols-5 gap-10">

            {steps.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="relative text-center"
                >
                  <div className="mx-auto w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 relative z-10">
                    <Icon className="text-white" size={34} />
                  </div>

                  <p className="text-indigo-400 mt-6 font-semibold">
                    {item.step}
                  </p>

                  <h3 className="text-white text-xl font-semibold mt-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 mt-4 leading-7">
                    {item.description}
                  </p>

                  {index !== steps.length - 1 && (
                    <ArrowRight
                      className="hidden lg:block absolute text-slate-600 top-8 -right-8"
                      size={28}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlights */}

        <div className="mt-24 rounded-3xl border border-slate-800 bg-slate-900 p-10">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div>
              <h3 className="text-3xl font-bold text-white">
                Everything Happens Automatically
              </h3>

              <p className="text-slate-400 mt-5 leading-8">
                Our AI handles resume parsing, ATS scoring, keyword extraction,
                and job matching so you can focus on preparing for interviews
                instead of manually editing your resume.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl bg-slate-950 border border-slate-800 p-4"
                >
                  <CheckCircle
                    className="hidden lg:block text-green-500"
                    size={20}
                  />

                  <span className="text-slate-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* CTA */}

        <div className="mt-24 text-center">

          <h3 className="text-4xl font-bold text-white">
            Ready to Improve Your Resume?
          </h3>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto">
            Upload your resume today and discover how AI can help you land more
            interviews with detailed ATS insights and personalized suggestions.
          </p>

          <button onClick={()=>navigate("/login")} className="mt-10 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-white font-semibold shadow-lg shadow-indigo-500/30">
            Analyze Resume
          </button>

        </div>

      </div>
    </section>
    </>
  );
}
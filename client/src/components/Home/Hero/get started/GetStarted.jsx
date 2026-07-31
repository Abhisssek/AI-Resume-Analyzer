import { Link } from "react-router";
import {
  Brain,
  UploadCloud,
  FileSearch,
  BarChart3,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "../../Navbar/Navbar";
import { useAuth } from "../../Auth/AuthProvider";
import { useEffect } from "react";
import { Navigate } from "react-router";

const steps = [
  {
    icon: UploadCloud,
    title: "Upload Resume",
    desc: "Upload your resume in PDF or DOCX format.",
  },
  {
    icon: FileSearch,
    title: "AI Analysis",
    desc: "Our AI compares your resume with any job description.",
  },
  {
    icon: BarChart3,
    title: "Get ATS Report",
    desc: "Receive detailed ATS score and improvement suggestions.",
  },
];

const benefits = [
  "AI Resume Parsing",
  "ATS Compatibility Score",
  "Keyword Matching",
  "Skill Gap Detection",
  "Resume Suggestions",
  "Multiple Resume Support",
  "Cloud Storage",
  "Lightning Fast Analysis",
];

export default function GetStarted() {

  const {user, userLoading, fetchUser} = useAuth();


  useEffect(() => {
    fetchUser();
  }, []);

   if(userLoading) return <>Loading ...</>
    if(user && !userLoading) return <Navigate to="/dashboard" replace />
  
  return (
    <>
    <Navbar />
    <section className="min-h-screen bg-[#051224] px-6 py-16 flex items-center">
      <div className="max-w-7xl mx-auto w-full">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}

          <div>

            <div className="flex items-center gap-3 mb-8">

              <div className="w-14 h-14 rounded-xl bg-indigo-600 flex items-center justify-center">
                <Brain size={32} className="text-white" />
              </div>

              <div>

                <h2 className="text-3xl font-bold text-white">
                  AI Resume Analyzer
                </h2>

                <p className="text-slate-400">
                  Smart Resume Analysis
                </p>

              </div>

            </div>

            <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm">

              Welcome

            </span>

            <h1 className="text-5xl lg:text-6xl font-bold text-white mt-8 leading-tight">
              Start Your Journey Towards
              <span className="text-indigo-500">
                {" "}
                More Interviews
              </span>
            </h1>

            <p className="text-slate-400 mt-8 text-lg leading-8 max-w-xl">
              Upload your resume, compare it with any job description,
              receive ATS insights, discover missing skills, and improve
              your chances of landing your dream job.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/signup"
                className="bg-indigo-600 hover:bg-indigo-500 transition px-8 py-4 rounded-xl text-white font-semibold flex items-center gap-2"
              >
                Get Started
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/login"
                className="border border-slate-700 hover:border-indigo-500 hover:bg-slate-900 transition px-8 py-4 rounded-xl text-white font-semibold"
              >
                Login
              </Link>

            </div>

          </div>

          {/* Right */}

          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">

            <h2 className="text-3xl font-bold text-white text-center">
              How It Works
            </h2>

            <div className="mt-10 space-y-8">

              {steps.map((step, index) => {

                const Icon = step.icon;

                return (

                  <div
                    key={index}
                    className="flex gap-5 items-start"
                  >

                    <div className="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center">

                      <Icon
                        className="text-indigo-400"
                        size={28}
                      />

                    </div>

                    <div>

                      <h3 className="text-white text-xl font-semibold">
                        {step.title}
                      </h3>

                      <p className="text-slate-400 mt-2 leading-7">
                        {step.desc}
                      </p>

                    </div>

                  </div>

                );

              })}

            </div>

            <div className="border-t border-slate-800 mt-12 pt-10">

              <h3 className="text-white text-2xl font-semibold mb-8">
                What You'll Get
              </h3>

              <div className="grid grid-cols-2 gap-5">

                {benefits.map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >

                    <CheckCircle2
                      size={18}
                      className="text-green-500"
                    />

                    <span className="text-slate-300">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="text-center mt-20">

          <p className="text-slate-400">
            Already have an account?
          </p>

          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 font-semibold mt-2 inline-block"
          >
            Sign In →
          </Link>

          <div className="mt-8">

            <Link
              to="/"
              className="text-slate-500 hover:text-white transition"
            >
              ← Back to Home
            </Link>

          </div>

        </div>

      </div>
    </section>
    </>
  );
}
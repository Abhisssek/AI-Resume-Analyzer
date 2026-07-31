import {
  PlayCircle,
  UploadCloud,
  Brain,
  FileSearch,
  BarChart3,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";
import { Navbar } from "../../Navbar/Navbar";
import { useAuth } from "../../Auth/AuthProvider";
import { useEffect } from "react";
import { Navigate } from "react-router";

const steps = [
  {
    icon: UploadCloud,
    title: "Upload Resume",
    description: "Upload a PDF or DOCX resume.",
  },
  {
    icon: Brain,
    title: "AI Resume Parsing",
    description: "Extract skills, education, projects, and experience.",
  },
  {
    icon: FileSearch,
    title: "Job Description Analysis",
    description: "Paste or upload any job description.",
  },
  {
    icon: BarChart3,
    title: "ATS Report",
    description: "Receive ATS score and keyword analysis.",
  },
  {
    icon: Sparkles,
    title: "AI Suggestions",
    description: "Get personalized resume improvements.",
  },
];

const highlights = [
  "AI Powered Resume Parsing",
  "ATS Compatibility Analysis",
  "Keyword Matching",
  "Skill Gap Detection",
  "Resume Improvement Suggestions",
  "Cloud Storage",
];

export default function Demo() {

    const {user, userLoading, fetchUser} = useAuth()

    useEffect(() => {
        fetchUser()
    }, [])



    if(userLoading) return <>Loading ...</>
    if(user && !userLoading) return <Navigate to="/dashboard" replace />
  return (
    <>
      <Navbar />
      <section className="bg-[#051224] min-h-screen py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}

          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-indigo-400 text-sm">
              <PlayCircle size={16} />
              Product Demo
            </span>

            <h1 className="mt-6 text-5xl font-bold text-white">
              Watch AI Resume Analyzer
              <span className="text-indigo-500"> In Action</span>
            </h1>

            <p className="mt-6 text-lg text-slate-400 leading-8">
              Discover how our AI analyzes resumes, compares them with job
              descriptions, calculates ATS scores, and provides intelligent
              recommendations in just a few seconds.
            </p>
          </div>

          {/* Video */}

          <div className="mt-16">
            <div className="aspect-video overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl">
              {/* Replace this with your video */}
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/zjY_eXsFiRk?si=bUEXDgV694bU78p-"
                title="AI Resume Analyzer Demo"
                // frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Timeline */}

          <div className="mt-24">
            <h2 className="text-center text-4xl font-bold text-white">
              What You'll See
            </h2>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-indigo-500"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500/10">
                      <Icon className="text-indigo-400" size={28} />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-slate-400 leading-7">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Highlights */}

          <div className="mt-24 rounded-3xl border border-slate-800 bg-slate-900 p-10">
            <h2 className="text-center text-3xl font-bold text-white">
              Key Highlights
            </h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4"
                >
                  <CheckCircle2 className="text-green-500" size={20} />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}

          <div className="mt-24 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-600/10 to-slate-900 p-12 text-center">
            <h2 className="text-4xl font-bold text-white">
              Ready to Analyze Your Resume?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              Upload your resume and receive detailed ATS insights, AI-powered
              recommendations, and job-specific analysis within seconds.
            </p>

            <Link
              to="/get-started"
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white transition hover:bg-indigo-500"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import {
  Brain,
  FileText,
  ScanSearch,
  Target,
  Sparkles,
  FolderOpen,
  ShieldCheck,
  BarChart3,
  FileStack,
  Cloud,
  Zap,
  SearchCheck,
} from "lucide-react";
import { Navbar } from "../../Navbar/Navbar";
import { useAuth } from "../../Auth/AuthProvider";
import { Navigate } from "react-router";
import { useEffect } from "react";


const features = [
  {
    icon: Brain,
    title: "AI Resume Parsing",
    description:
      "Automatically extracts personal details, skills, education, projects, certifications, and work experience using advanced AI.",
  },
  {
    icon: ScanSearch,
    title: "ATS Score Analysis",
    description:
      "Get an instant ATS compatibility score with detailed feedback on how well your resume matches the job description.",
  },
  {
    icon: Target,
    title: "Job Description Matching",
    description:
      "Compare your resume against any job description and identify exactly where you stand.",
  },
  {
    icon: SearchCheck,
    title: "Keyword Analysis",
    description:
      "Detect missing keywords, matched keywords, and optimization opportunities to improve recruiter visibility.",
  },
  {
    icon: Sparkles,
    title: "AI Resume Suggestions",
    description:
      "Receive intelligent recommendations to strengthen your resume, improve wording, and increase interview chances.",
  },
  {
    icon: FileText,
    title: "Job Description Parser",
    description:
      "Upload or paste any job description to automatically extract required skills, technologies, experience, and responsibilities.",
  },
  {
    icon: FileStack,
    title: "Multiple Resume Management",
    description:
      "Upload and organize multiple resumes for different career paths while keeping all analyses in one place.",
  },
  {
    icon: FolderOpen,
    title: "One Resume, Multiple Jobs",
    description:
      "Analyze the same resume against unlimited job descriptions without uploading it again.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description:
      "Visual dashboards display ATS scores, skill coverage, keyword matches, and improvement history.",
  },
  {
    icon: Cloud,
    title: "Secure Cloud Storage",
    description:
      "Your resumes are securely stored in the cloud and accessible whenever you need them.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Security",
    description:
      "Your files remain private and are processed securely with authenticated access and encrypted storage.",
  },
  {
    icon: Zap,
    title: "Lightning Fast AI",
    description:
      "Powered by high-performance AI models to deliver resume parsing and ATS analysis within seconds.",
  },
];

const stats = [
  {
    number: "98%",
    label: "ATS Accuracy",
  },
  {
    number: "10+",
    label: "Resumes Analyzed",
  },
  {
    number: "50+",
    label: "Job Matches",
  },
  {
    number: "<15 Sec",
    label: "Average Analysis",
  },
];

export default function Features() {

  const {user, userLoading, fetchUser} = useAuth();


  useEffect(() => {
    fetchUser();
  }, []);

   if(userLoading) return <>Loading ...</>
    if(user && !userLoading) return <Navigate to="/dashboard" replace />
  return (<>
        <Navbar />
    <section className="bg-[#051224] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}

        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
            Powerful Features
          </span>

          <h2 className="text-5xl font-bold text-white mt-6">
            Everything You Need to Build
            <span className="text-indigo-500"> a Better Resume</span>
          </h2>

          <p className="text-slate-400 mt-6 max-w-3xl mx-auto text-lg">
            Our AI-powered platform analyzes your resume, compares it against
            job descriptions, detects missing skills, and provides personalized
            recommendations to maximize your interview opportunities.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center transition duration-300 hover:border-indigo-500 hover:-translate-y-1"
            >
              <h3 className="text-4xl font-bold text-indigo-500">
                {stat.number}
              </h3>

              <p className="mt-3 text-slate-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Cards */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:border-indigo-500 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(99,102,241,0.25)]"
              >
                <div className="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:bg-indigo-500 transition">
                  <Icon
                    size={28}
                    className="text-indigo-400 group-hover:text-white"
                  />
                </div>

                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>

                <p className="text-slate-400 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}

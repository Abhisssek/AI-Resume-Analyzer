import React from "react";
import { ButtonLoader } from "../button/ButtonLoader";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../services/api";

export const JobDescriptionManual = ({fetchJobDescription}) => {
  const [form, setForm] = React.useState({
    jobTitle: "",
    company: "",
    jobDescription: "",
  });

  const [loading, setLoading] = React.useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    try {
      const payload = {
        jobTitle: form.jobTitle,
        company: form.company,
        jobDescription: form.jobDescription,
      };
      setLoading(true);
      const res = await axios.post(api.defaults.baseURL + "jobdesc", payload, {
        withCredentials: true,
      });
      // console.log(res);
      
      if (res.data.success) {
        toast.success(res.data.message);
        setLoading(false);
        setForm({
          jobTitle: "",
          company: "",
          jobDescription: "",
        })
        fetchJobDescription();
      } else {
        toast.error(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      
    }
  };

  return (
    <div>
      {/* Job Title & Company */}
      <form className="space-y-6" onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Job Title */}

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">
              Job Title
            </label>

            <input
              value={form.jobTitle}
              onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
              type="text"
              placeholder="e.g. Frontend Developer"
              className="
              w-full
              h-12
              rounded-xl
              border
              border-[#223B63]
              bg-[#09172E]
              px-4
              text-white
              placeholder:text-slate-500
              outline-none
              transition-all
              duration-300
              focus:border-indigo-500
              focus:ring-2
              focus:ring-indigo-500/20
            "
            />
          </div>

          {/* Company */}

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">
              Company
            </label>

            <input
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              type="text"
              placeholder="e.g. Google"
              className="
              w-full
              h-12
              rounded-xl
              border
              border-[#223B63]
              bg-[#09172E]
              px-4
              text-white
              placeholder:text-slate-500
              outline-none
              transition-all
              duration-300
              focus:border-indigo-500
              focus:ring-2
              focus:ring-indigo-500/20
            "
            />
          </div>
        </div>

        {/* Job Description */}

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-300">
            Job Description / Job URL
          </label>

          <textarea
            value={form.jobDescription}
            onChange={(e) =>
              setForm({ ...form, jobDescription: e.target.value })
            }
            rows={4}
            placeholder=" Paste the complete job description here..."
            className="
            no-scrollbar
            w-full
            rounded-xl
            border
            border-[#223B63]
            bg-[#09172E]
            p-4
            text-white
            placeholder:text-slate-500
            resize-none
            outline-none
            transition-all
            duration-300
            focus:border-indigo-500
            focus:ring-2
            focus:ring-indigo-500/20
          "
          ></textarea>
        </div>

        {/* Button */}

        <ButtonLoader
          loading={loading}
          type="submit"
          text="Analyze Job Description"
          loadingText="Analyzing..."
          className="w-full
          h-12
          rounded-xl
          bg-gradient-to-r
          from-indigo-600
          via-indigo-500
          to-violet-600
          font-semibold
          tracking-wide
          text-white
          transition-all
          duration-300
          hover:shadow-[0_0_25px_rgba(99,102,241,0.45)]
          hover:scale-[1.01]
          active:scale-[0.99]"
        />
      </form>
    </div>
  );
};

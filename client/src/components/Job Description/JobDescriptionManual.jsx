import React from 'react'

export const JobDescriptionManual = () => {
  return (
     
    <div className="space-y-6">

      {/* Job Title & Company */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Job Title */}

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-300">
            Job Title
          </label>

          <input
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
          Job Description
        </label>

        <textarea
          rows={8}
          placeholder="Paste the complete job description here..."
          className="
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

      <button
        className="
          w-full
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
          active:scale-[0.99]
        "
      >
        Create Job Description
      </button>

    </div>
  )
}

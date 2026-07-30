// components/NoData.jsx

import { FileSearch } from "lucide-react";

export const NoData = ({
  title = "No Data Found",
  description = "There's nothing to display yet.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[250px] text-center">
      <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
        <FileSearch className="w-8 h-8 text-slate-400" />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>

      <p className="mt-2 text-slate-400 max-w-sm">
        {description}
      </p>
    </div>
  );
};
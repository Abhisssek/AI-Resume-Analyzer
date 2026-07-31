import { Link } from "react-router";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      <h1 className="text-[18vw] md:text-[16rem] font-black tracking-tight leading-none text-[#E8D9D0] select-none">
        404
      </h1>

      <Link
        to="/"
        className="mt-6 text-[10px] md:text-xs uppercase tracking-[0.35em] text-white hover:text-[#E8D9D0] transition duration-300 group"
      >
        Back Home
        <div className="h-[1px] w-full bg-white mt-1 scale-x-100 group-hover:scale-x-75 transition-transform duration-300 origin-center"></div>
      </Link>
    </div>
  );
};


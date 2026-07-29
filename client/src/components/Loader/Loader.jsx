import React from "react";

export const Loader = ({
  size = "w-12 h-12",
  color = "border-indigo-500",
  className = "",
}) => {
  return (
    <div
      className={`flex justify-center items-center h-[60vh] ${className}`}
    >
      <div
        className={`${size} rounded-full border-4 ${color} border-t-transparent animate-spin`}
      />
    </div>
  );
};
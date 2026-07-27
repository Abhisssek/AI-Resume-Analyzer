import React from "react";

export const ButtonLoader = ({
  loading,
  onClick,
  text,
  loadingText = "Loading...",
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {loading && (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      )}

      {loading ? loadingText : text}
    </button>
  );
};

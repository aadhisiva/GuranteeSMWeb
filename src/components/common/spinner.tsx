import React from "react";

export default function Spinner({ children }: any) {
  return (
    <div
      aria-label="Loading..."
      role="status"
      className="flex justify-center items-center text-center"
    >
      <svg
        width="104"
        height="104"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin w-16 stroke-slate-500"
      >
        <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
      </svg>
    </div>
  );
}

"use client";

import React from "react";

interface ChatOptionProps {
  label: string;
  onClick: () => void;
}

export const ChatOption = ({ label, onClick }: ChatOptionProps) => {
  return (
    <div
      onClick={onClick}
      className="w-5/6 py-1 px-2 font-bold shadow-xl bg-blue-700 
                 rounded-lg text-xl text-white cursor-pointer"
    >
      {label}
    </div>
  );
};

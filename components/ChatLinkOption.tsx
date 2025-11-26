"use client";

import Link from "next/link";

interface ChatLinkOptionProps {
  label: string;
  href: string;
}

export const ChatLinkOption = ({ label, href }: ChatLinkOptionProps) => {
  return (
    <Link
      href={href}
      className="w-5/6 py-1 px-2 font-bold shadow-xl bg-blue-700 
                 rounded-lg text-xl text-white cursor-pointer"
    >
      {label}
    </Link>
  );
};

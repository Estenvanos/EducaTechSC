import { getRandomColor } from "@/utils";
import Link from "next/link";
import React from "react";

const ModulesWrapper = async () => {
  const res = await fetch("http://localhost:3000/api/modules", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const modules = await res.json();


  return (
    <div className="w-full flex flex-col gap-6 overflow-y-hidden items-center px-2">
      {modules.map((module: { _id: string; title: string }) => {
        const randomColor = getRandomColor();

        return (
          <Link
            href={`/module/${module._id}`}
            key={module._id}
            className={`${randomColor} w-full py-3 rounded-lg cursor-pointer transition-all duration-300 items-center justify-center flex`}
          >
            <p className="font-bold text-xl text-white">{module.title}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default ModulesWrapper;

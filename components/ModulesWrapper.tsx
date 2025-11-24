import { colors, shuffleColors } from "@/utils";
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

  const shuffled = shuffleColors(colors);

  return (
    <div className="w-full flex flex-col gap-6 overflow-y-hidden h-3/5 items-center">
      {modules.map((module: { _id: string; title: string }, index: number) => {
        const color = shuffled[index % shuffled.length];

        return (
          <Link
            href={`/module/${module._id}`}
            key={module._id}
            className={`${color} w-full py-3 rounded-lg cursor-pointer transition-all duration-300 items-center justify-center flex`}
          >
            <p className="font-bold text-xl text-white text-center">{module.title}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default ModulesWrapper;

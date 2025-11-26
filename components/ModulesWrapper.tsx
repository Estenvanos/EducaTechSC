import { Module } from "@/types";
import Link from "next/link";

interface Props {
  modules: Module[];
  shuffled: string[];
}

const ModulesWrapper = ({ modules, shuffled }: Props) => {
  return (
    <div className="w-full flex flex-col gap-6 overflow-y-hidden h-3/5 items-center">
      {modules.map((module, index) => {
        const color = shuffled[index % shuffled.length];

        return (
          <Link
            key={module._id}
            href={`/module/${module._id}`}
            className={`${color} w-full py-3 rounded-lg cursor-pointer transition-all duration-300 items-center justify-center flex`}
          >
            <p className="font-bold text-xl text-white text-center">
              {module.title}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default ModulesWrapper;

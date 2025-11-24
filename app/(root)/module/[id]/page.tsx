"use client";

import { Lesson } from "@/types";
import { getYoutubeThumbnail } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [moduleId, setModuleId] = useState<string>("");
  const [moduleTitle, setModuleTitle] = useState("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  console.log(lessons);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((p) => setModuleId(p.id));
  }, [params]);

  useEffect(() => {
    const fetchLessonsAndTitle = async () => {
      try {
        const moduleRes = await fetch(`/api/modules/${moduleId}`);
        const moduleData = await moduleRes.json();

        if (moduleData?.title) {
          setModuleTitle(moduleData.title);
        }

        const res = await fetch("/api/lessons");
        const allLessons = await res.json();
        console.log(allLessons[0]);

        const moduleLessons = allLessons.filter(
          (l: Lesson) => l.moduleId._id === moduleId
        );

        const sorted = moduleLessons.sort((a: Lesson, b: Lesson) => {
          const getNumber = (title: string) =>
            parseInt(title.match(/Aula\s*(\d+)/i)?.[1] || "999");

          return getNumber(a.title) - getNumber(b.title);
        });

        setLessons(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonsAndTitle();
  }, [moduleId]);

  if (loading)
    return (
      <div className="p-6 text-center text-3xl font-medium">Carregando...</div>
    );

  return (
    <div className="w-full flex flex-col items-center gap-2  text-black px-6 pb-20">
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center my-6">{moduleTitle}</h1>

      {/* FIRST LESSON (MAIN VIDEO) */}
      {lessons.length > 0 && (
        <div className="w-full max-w-2xl mb-10">
          <div className="rounded-xl overflow-hidden shadow-md">
            <iframe
              width="100%"
              height="280"
              src={lessons[0].videoUrl.replace("watch?v=", "embed/")}
              className="rounded-xl rounded-b-none"
            />
            <div className="w-full bg-gray-300/40 rounded-t-none flex items-center justify-center py-2 pb-3 rounded-xl ">
              <p className="mt-2 text-xl font-bold text-center ">
                {lessons[0].title}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* LIST OF LESSONS */}
      <div className="w-full max-w-2xl flex  h-full flex-col gap-4">
        {lessons.map(
          (lesson, index) =>
            index !== 0 && (
              <div
                key={lesson._id}
                className="bg-gray-400/80 p-4 rounded-xl flex items-center gap-4 shadow-md cursor-pointer"
              >
                <Image
                  src={getYoutubeThumbnail(lesson.videoUrl)}
                  width={140}
                  height={80}
                  className="w-12 h-12 rounded-lg object-cover"
                  alt="thumb"
                />
                <p className="font-bold  text-center text-xl">{lesson.title}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Page;

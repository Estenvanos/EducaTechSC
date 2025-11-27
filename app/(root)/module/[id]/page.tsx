"use client";

import { Lesson } from "@/types";
import { BASE_URL, getYoutubeThumbnail } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ModulePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [moduleId, setModuleId] = useState<string>("");
  const [moduleTitle, setModuleTitle] = useState("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((p) => setModuleId(p.id));
  }, [params]);

  useEffect(() => {
    const fetchLessonsAndTitle = async () => {
      if (!moduleId) return;

      try {
        const moduleRes = await fetch(`${BASE_URL}/api/modules/${moduleId}`);
        const moduleData = await moduleRes.json();

        if (moduleData?.title) {
          setModuleTitle(moduleData.title);
        }

        const res = await fetch(`${BASE_URL}/api/lessons`);
        const allLessons = await res.json();

        const moduleLessons = allLessons.filter(
          (l: Lesson) => l?.moduleId && l.moduleId === moduleId
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
    <div className="h-full overflow-y-auto w-full flex flex-col items-center gap-2 text-black px-6 pb-20 no-scrollbar">
      <h1 className="text-3xl font-bold text-center my-6">{moduleTitle}</h1>

      {lessons.length > 0 && (
        <div className="w-full max-w-2xl mb-10">
          <Link
            href={`/lesson/${lessons[0]._id}`}
            className="rounded-xl overflow-hidden shadow-md relative"
          >
            <div className="relative w-full h-[280px]">
              <Image
                src={getYoutubeThumbnail(lessons[0].videoUrl)}
                alt="thumbnail"
                width={1980}
                height={1080}
                className="rounded-xl w-full h-full object-cover rounded-b-none"
              />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 p-4 rounded-full backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="w-full bg-gray-300/40 flex items-center justify-center py-2 pb-3 rounded-xl rounded-t-none">
              <p className="mt-2 text-xl font-bold text-center">
                {lessons[0].title}
              </p>
            </div>
          </Link>
        </div>
      )}

      <div className="w-full max-w-2xl flex  h-full flex-col gap-4">
        {lessons.map(
          (lesson, index) =>
            index !== 0 && (
              <Link
                href={`/lesson/${lesson._id}`}
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
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default ModulePage;

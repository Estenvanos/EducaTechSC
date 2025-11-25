"use client";

import { useEffect, useState } from "react";

import { extractYouTubeId, getModuleId } from "@/utils";
import Link from "next/link";
import { LessonBase } from "@/types";

const LessonPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [lessonId, setLessonId] = useState("");
  const [lesson, setLesson] = useState<LessonBase | null>(null);
  const [previousLesson, setPreviousLesson] = useState<LessonBase | null>(null);
  const [nextLesson, setNextLesson] = useState<LessonBase | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(previousLesson, nextLesson);

  useEffect(() => {
    params.then((p) => setLessonId(p.id));
  }, [params]);

  useEffect(() => {
    if (!lessonId) return;

    const loadLessonPage = async () => {
      try {
        const res = await fetch(`/api/lessons/${lessonId}`);
        const currentLesson = await res.json();
        console.log(currentLesson);
        setLesson(currentLesson);
        const moduleId = getModuleId(currentLesson.moduleId);

        const allRes = await fetch("/api/lessons");
        const allLessons: LessonBase[] = await allRes.json();

        const moduleLessons = allLessons.filter((l) => {
          const lModuleId = getModuleId(l.moduleId);
          return lModuleId === moduleId;
        });

        const sorted = moduleLessons.sort((a, b) => {
          const extractNum = (title: string) =>
            parseInt(title.match(/Aula\s*(\d+)/i)?.[1] || "999");
          return extractNum(a.title) - extractNum(b.title);
        });

        const index = sorted.findIndex((l) => l._id === currentLesson._id);

        setPreviousLesson(index > 0 ? sorted[index - 1] : null);
        setNextLesson(index < sorted.length - 1 ? sorted[index + 1] : null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadLessonPage();
  }, [lessonId]);

  if (loading || !lesson)
    return (
      <div className="h-full flex items-center text-black justify-center text-2xl font-semibold">
        Carregando...
      </div>
    );

  const videoId = extractYouTubeId(lesson.videoUrl);

  if (!videoId)
    return (
      <div className="h-full flex items-center text-black justify-center text-xl font-semibold">
        Vídeo inválido ou não encontrado.
      </div>
    );

  return (
    <div className="h-full w-full flex flex-col  items-center overflow-y-auto pb-20 px-4">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-black mt-6 mb-4">
        {lesson.title}
      </h1>

      {/* REAL YouTube iframe */}
      <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg mb-4">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full max-w-2xl flex justify-between text-black font-bold text-xl gap-4 mt-2">
        {previousLesson ? (
          <Link
            href={`/lesson/${previousLesson._id}`}
            className="w-1/2 bg-gray-300 rounded-xl py-3 shadow-md text-center"
          >
            ‹ Aula Anterior
          </Link>
        ) : (
          <div className="w-1/2 bg-gray-300/40 rounded-xl py-3 shadow-md text-center opacity-50">
            ‹ Aula Anterior
          </div>
        )}

        {nextLesson ? (
          <Link
            href={`/lesson/${nextLesson._id}`}
            className="w-1/2 bg-gray-300 rounded-xl py-3 shadow-md text-center"
          >
            Próxima Aula ›
          </Link>
        ) : (
          <div className="w-1/2 bg-gray-300/40 rounded-xl py-3 shadow-md text-center opacity-50">
            Próxima Aula ›
          </div>
        )}
      </div>

      {/* Difficulty Buttons */}
      <div className="w-full max-w-2xl flex justify-between gap-6 mt-10">
        <button className="w-1/2 bg-green-600 text-white rounded-xl py-4 font-bold text-2xl shadow-md">
          Fácil
        </button>

        <button className="w-1/2 bg-red-500 text-white rounded-xl py-4 font-bold text-2xl shadow-md">
          Difícil
        </button>
      </div>
    </div>
  );
};

export default LessonPage;

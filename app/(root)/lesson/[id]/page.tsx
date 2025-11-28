"use client";

import { useEffect, useState } from "react";
import { extractYouTubeId } from "@/utils";
import Link from "next/link";
import { useLessonPage } from "@/hooks/useLessonPage";


const LessonPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [lessonId, setLessonId] = useState("");
  const [instantLikeEffect, setInstantLikeEffect] = useState<"like" | "dislike" | null>(null)

  useEffect(() => {
    params.then((p) => setLessonId(p.id));
  }, [params]);

  const {
    lesson,
    prevLesson,
    nextLesson,
    loading,
    alreadyLiked,
    sendFeedback,
  } = useLessonPage(lessonId);


  if (loading || !lesson) return <div>Carregando...</div>;

  const videoId = extractYouTubeId(lesson.videoUrl);
  if (!videoId) return <div>Vídeo inválido.</div>;

  return (
    <div className="h-full w-full flex flex-col items-center overflow-y-auto pb-20 px-4">
      <h1 className="text-3xl font-bold text-center text-black mt-6 mb-4">
        {lesson.title}
      </h1>

      <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg mb-4">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Navegação */}
      <div className="w-full max-w-2xl flex justify-between text-black font-bold text-xl gap-4 mt-2">
        {prevLesson ? (
          <Link
            href={`/lesson/${prevLesson._id}`}
            className="w-1/2 bg-gray-300 rounded-xl py-3 shadow-md text-center cursor-pointer"
          >
            ‹ Aula Anterior
          </Link>
        ) : (
          <div className="w-1/2 bg-gray-300/40 rounded-xl py-3 shadow-md text-center opacity-50 cursor-pointer">
            ‹ Aula Anterior
          </div>
        )}

        {nextLesson ? (
          <Link
            href={`/lesson/${nextLesson._id}`}
            className="w-1/2 bg-gray-300 rounded-xl py-3 shadow-md text-center cursor-pointer"
          >
            Próxima Aula ›
          </Link>
        ) : (
          <div className="w-1/2 bg-gray-300/40 rounded-xl py-3 shadow-md text-center opacity-50 cursor-pointer">
            Próxima Aula ›
          </div>
        )}
      </div>

      {/* Botões de feedback */}
      <div className="w-full max-w-2xl flex justify-between gap-6 mt-10">
        <button
          disabled={alreadyLiked === "like"}
          onClick={() => {
            sendFeedback("likes");
            setInstantLikeEffect("like")
          }}
          className={`w-1/2 bg-green-600 text-white rounded-xl py-4 font-bold text-2xl shadow-md cursor-pointer
            ${
              alreadyLiked === "like" || instantLikeEffect === "like"
                ? "opacity-20 cursor-not-allowed"
                : "cursor-pointer"
            }`}
        >
          Fácil
        </button>

        <button
          disabled={alreadyLiked === "dislike"}
          onClick={() => {
            sendFeedback("dislikes");
            setInstantLikeEffect("dislike")
          }}
          className={`w-1/2 bg-red-500 text-white rounded-xl py-4 font-bold text-2xl shadow-md cursor-pointer
            ${
              alreadyLiked === "dislike" || instantLikeEffect === "dislike" 
                ? "opacity-20 cursor-not-allowed"
                : "cursor-pointer"
            }`}
        >
          Difícil
        </button>
      </div>
    </div>
  );
};

export default LessonPage;

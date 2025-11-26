"use client";

import { useEffect, useState } from "react";
import { LessonBase } from "@/types";
import { getModuleId } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "./useAuth";

export function useLessonPage(lessonId: string) {
  const [lesson, setLesson] = useState<LessonBase | null>(null);
  const [prevLesson, setPrevLesson] = useState<LessonBase | null>(null);
  const [nextLesson, setNextLesson] = useState<LessonBase | null>(null);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const { mongoUser } = useAuth();

  const [alreadyLiked, setAlreadyLiked] =
    useState<"like" | "dislike" | null>(null);

  /*
   * 1. LOAD LESSON
   */
  useEffect(() => {
    if (!lessonId) return;

    const loadLesson = async () => {
      try {
        const res = await fetch(`/api/lessons/${lessonId}`);
        const current = await res.json();
        setLesson(current);

        const moduleId = getModuleId(current.moduleId);

        const allRes = await fetch("/api/lessons");
        const all: LessonBase[] = await allRes.json();

        const moduleLessons = all
          .filter((l) => getModuleId(l.moduleId) === moduleId)
          .sort((a, b) => {
            const num = (t: string) =>
              parseInt(t.match(/Aula\s*(\d+)/i)?.[1] || "999");
            return num(a.title) - num(b.title);
          });

        const index = moduleLessons.findIndex((l) => l._id === current._id);

        setPrevLesson(index > 0 ? moduleLessons[index - 1] : null);
        setNextLesson(
          index < moduleLessons.length - 1 ? moduleLessons[index + 1] : null
        );
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [lessonId]);

  /*
   * 2. INITIAL FEEDBACK STATE
   */
  useEffect(() => {
    if (!mongoUser || !lessonId) return;

    if (mongoUser.likedLessons.includes(lessonId)) {
      setAlreadyLiked("like");
    } else if (mongoUser.dislikedLessons.includes(lessonId)) {
      setAlreadyLiked("dislike");
    } else {
      setAlreadyLiked(null);
    }
  }, [mongoUser, lessonId]);

  /*
   * 3. SEND FEEDBACK
   */
  const sendFeedback = async (type: "likes" | "dislikes") => {
    if (!user?.id) return;

    // fetch current db user
    const userRes = await fetch(`/api/users/${user.id}`);
    const userData = await userRes.json();

    const liked = userData.likedLessons.includes(lessonId);
    const disliked = userData.dislikedLessons.includes(lessonId);

    let lessonUpdate = {};
    let userUpdate = {};

    if (type === "likes") {
      if (liked) {
        lessonUpdate = { likes: -1 };
        userUpdate = { $pull: { likedLessons: lessonId } };
      } else if (disliked) {
        lessonUpdate = { likes: 1, dislikes: -1 };
        userUpdate = {
          $pull: { dislikedLessons: lessonId },
          $addToSet: { likedLessons: lessonId },
        };
      } else {
        lessonUpdate = { likes: 1 };
        userUpdate = { $addToSet: { likedLessons: lessonId } };
      }
    }

    if (type === "dislikes") {
      if (disliked) {
        lessonUpdate = { dislikes: -1 };
        userUpdate = { $pull: { dislikedLessons: lessonId } };
      } else if (liked) {
        lessonUpdate = { dislikes: 1, likes: -1 };
        userUpdate = {
          $pull: { likedLessons: lessonId },
          $addToSet: { dislikedLessons: lessonId },
        };
      } else {
        lessonUpdate = { dislikes: 1 };
        userUpdate = { $addToSet: { dislikedLessons: lessonId } };
      }
    }

    await fetch(`/api/lessons/${lessonId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonUpdate }),
    });

    await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userUpdate),
    });
  };

  return {
    lesson,
    prevLesson,
    nextLesson,
    loading,
    alreadyLiked,
    sendFeedback,
  };
}

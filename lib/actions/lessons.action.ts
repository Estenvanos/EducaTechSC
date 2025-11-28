"use server"; 

import { BASE_URL } from "@/utils";

export const getSingleLesson = async(lessonId : string) => {
    const res = await fetch(`${BASE_URL}/api/lessons/${lessonId}`);    
    const lessonData = await res.json();

    return lessonData
}

export const getAllLessons = async() => {
    const res = await fetch(`${BASE_URL}/api/lessons`);    
    const AllLessons = await res.json();

    return AllLessons
}

export const updateLesson = async(lessonId : string, lessonUpdate : { likes?: number; dislikes?: number }) => {
      await fetch(`${BASE_URL}/api/lessons/${lessonId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonUpdate }),
    }); } 
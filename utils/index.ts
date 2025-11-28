import { getAllLessons } from "@/lib/actions/lessons.action";
import { Lesson, Module } from "@/types";

export const colors = [
  "bg-red-500 hover:bg-red-600",
  "bg-blue-500 hover:bg-blue-600",
  "bg-green-500 hover:bg-green-600",
  "bg-orange-500 hover:bg-orange-600",
];

export const getRandomColor = () =>
  colors[Math.floor(Math.random() * colors.length)];

export const shuffleColors = (array: string[]) => {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const getYoutubeThumbnail = (url?: string) => {
  if (!url) return "/default_video.png";
  const regex = /(?:youtube\.com.*(?:v=|embed\/)|youtu\.be\/)([^"&?\/\s]{11})/;

  const match = url.match(regex);
  const videoId = match ? match[1] : null;

  if (!videoId) return "/default_video.png";

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

export const extractYouTubeId = (url: string | undefined) => {
  if (!url) return null;

  if (url.includes("v=")) return url.split("v=")[1].split("&")[0];

  if (url.includes("youtu.be/")) return url.split("youtu.be/")[1].split("?")[0];

  if (url.includes("embed/")) return url.split("embed/")[1].split("?")[0];

  return null;
};

export const getChatMessage = async (
  index: number,
  modules: Module[],
  moduleId?: string
) => {
  let sorted: Lesson[] = [];
  if (moduleId) {
    const allLessons = await getAllLessons();

    const moduleLessons = allLessons.filter(
      (l: Lesson) => l?.moduleId && l.moduleId === moduleId
    );

    sorted = moduleLessons.sort((a: Lesson, b: Lesson) => {
      const getNumber = (title: string) =>
        parseInt(title.match(/Aula\s*(\d+)/i)?.[1] || "999");

      return getNumber(a.title) - getNumber(b.title);
    });
  }

  const initial_message = {
    main: "Olá eu sou um assistente virtual, como poderia lhe ajudar ?",
    options: {
      0: { info: "Gostaria de ver um módulo", index: 1 },
      1: { info: "Auxilio no meu login", index: 2 },
    },
  };

  const module_message = {
    main: "Aqui estao os modulos disponiveis",
    options: modules.map((module) => ({
      label: module.title,
      moduleId: module._id,
      index: 3,
    })),
    exit: {
      info: "Voltar",
      index: 0,
    },
  };

  const help_login_message = {
    main: "Estamos trabalhando nessa função",
  };

  const module_lesson_message = {
    main: "Qual aula do módulo deseja assistir?",
    options: sorted.map((lesson) => ({
      label: lesson.title,
      lessonId: lesson._id,
    })),
    exit: {
      info: "Voltar",
      index: 1,
    },
  };

  switch (index) {
    case 0:
      return initial_message;

    case 1:
      return module_message;

    case 2:
      return help_login_message;

    case 3:
      return module_lesson_message;

    default:
      return initial_message;
  }
};

export const speak = (text: string) => {
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "pt-BR"; // or "en-US"
  utter.rate = 1;
  utter.pitch = 1;
  utter.volume = 10;

  window.speechSynthesis.speak(utter);
};

export const BASE_URL =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    : "";

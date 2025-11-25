import { Lesson } from "@/types";

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

export const getYoutubeThumbnail = (url: string) => {
  const match = url.match(/v=([^&]+)/);
  const videoId = match ? match[1] : "";
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

export const extractYouTubeId = (url: string | undefined) => {
  if (!url) return null;

  if (url.includes("v=")) return url.split("v=")[1].split("&")[0];

  if (url.includes("youtu.be/")) return url.split("youtu.be/")[1].split("?")[0];

  if (url.includes("embed/")) return url.split("embed/")[1].split("?")[0];

  return null;
};

export function getModuleId(moduleId: Lesson["moduleId"]) {
  return typeof moduleId === "string" ? moduleId : moduleId._id;
}
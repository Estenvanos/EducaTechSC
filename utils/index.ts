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

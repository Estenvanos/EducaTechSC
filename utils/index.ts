  const colors = [
    "bg-red-500 hover:bg-red-600",
    "bg-blue-500 hover:bg-blue-600",
    "bg-green-500 hover:bg-green-600",
    "bg-orange-500 hover:bg-orange-600",
  ];

  export const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];
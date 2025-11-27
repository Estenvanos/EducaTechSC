import ModulesWrapper from "@/components/ModulesWrapper";
import HelpButton from "@/components/HelpButton";
import { BASE_URL, colors, shuffleColors } from "@/utils";

const Home = async () => {
  const res = await fetch(`${BASE_URL}/api/modules`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "force-cache",
  });

  const modules = await res.json();
  const shuffledColors = shuffleColors(colors);

  return (
    <section className="flex flex-col w-full h-full px-5 overflow-hidden">
      <p className="font-bold text-center text-2xl text-black my-8">
        Oque você quer aprender hoje ?
      </p>
      <ModulesWrapper modules={modules} shuffled={shuffledColors} />
      <HelpButton modules={modules} />
    </section>
  );
};

export default Home;

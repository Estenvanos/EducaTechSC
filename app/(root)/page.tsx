import ModulesWrapper from "@/components/ModulesWrapper";
import HelpButton from "@/components/HelpButton";
import { colors, shuffleColors } from "@/utils";
import { getModules } from "@/lib/actions/models.actions";

const Home = async () => {
  const modules = await getModules();
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

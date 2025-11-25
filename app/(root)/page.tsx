import HelpButton from "@/components/HelpButton";
import ModulesWrapper from "@/components/ModulesWrapper";

const Home = () => {
  return (
    <section className="flex flex-col w-full h-full px-5 overflow-hidden">
      <p className="font-bold text-center text-2xl text-black my-8">
        Oque você quer aprender hoje ?
      </p>
      <ModulesWrapper />
      <HelpButton />
    </section>
  );
};

export default Home;

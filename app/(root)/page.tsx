import ModulesWrapper from "@/components/ModulesWrapper";
import RootHeader from "@/components/RootHeader";

const Home = () => {


  return (
    <section className="flex flex-col size-full px-5">
      <RootHeader />
      <p className="font-bold text-center text-2xl text-black my-8">
        Oque você quer aprender hoje ?
      </p>
      <ModulesWrapper />
    </section>
  );
};

export default Home;

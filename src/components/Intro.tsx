import { useState } from "react";

const Intro = () => {
  const [startpage, setStartpage] = useState(true);

  return (
    <section
      className=" bg-[rgba(0,0,0,0.9)] backdrop-blur-lg h-full w-full inset-0 absolute duration-150 z-50"
      style={
        startpage
          ? { pointerEvents: "auto", opacity: "1" }
          : { pointerEvents: "none", opacity: "0" }
      }
    >
      <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 my-auto">
        <div className="title px-5 mb-5">
          <h1 className="text-[4vh] w-full sm:w-3/4 mx-auto">
            Cohérence cardiaque
          </h1>
        </div>
        <div className="text-[1.75vh] mx-auto w-full px-5 sm:w-2/3 flex gap-[1vh] flex-col">
          <p>
            La cohérence cardiaque est une technique de respiration qui vise à
            réguler le rythme cardiaque et à réduire le stress.
          </p>
          <p>
            Ce site vous propose un exercice de cohérence cardiaque simple, avec
            un guide visuel pour vous accompagner.
          </p>
          <p>
            Pour commencer, mettez vos pieds à plat sur le sol, asseyez-vous
            avec le dos droit, et relachez vos épaules.
          </p>
          <button
            className="border-white border-2 px-[5vw] py-2 w-full sm:max-w-min rounded-xl mt-5 hover:scale-105 duration-150"
            onClick={() => setStartpage(false)}
          >
            Commencer
          </button>
          <a
            className="my-5 text-blue-500"
            href="https://fr.wikipedia.org/wiki/Coh%C3%A9rence_cardiaque"
          >
            En savoir plus sur la cohérence cardiaque
          </a>
        </div>
      </div>
    </section>
  );
};

export default Intro;

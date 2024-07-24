import { useState } from "react";

const Intro = () => {
  const [startpage, setStartpage] = useState(false);

  return (
    <section
      className="bg-black h-full w-full inset-0 absolute duration-150 z-50"
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
            La cohérence cardiaque est un état obtenu par la pratique régulière
            d’une respiration rythmée lente (environ 6 respirations par minute),
            équilibrant les actions des systèmes nerveux sympathique et
            parasympathique sur le cœur, et ayant des effets bénéfiques sur la
            santé physique et mentale.
          </p>
          <p>
            Utilisée en thérapie complémentaire ou en prévention, notamment
            contre le stress, la cohérence cardiaque est apparue avec des
            travaux scientifiques sur la variabilité de la fréquence cardiaque,
            démontrant des variations cohérentes et amplifiées lors de ces
            exercices.
          </p>
          <p>
            Des systèmes de biofeedback peuvent optimiser les bienfaits en
            trouvant le rythme respiratoire optimal pour chaque individu.
          </p>
          <p>
            Ce site vous propose un exercice de cohérence cardiaque simple, avec
            un guide visuel pour vous aider à respirer correctement.
          </p>
          <button
            className="border-white border-2 px-[5vw] py-2 w-full sm:max-w-min rounded-xl mt-5 hover:scale-105 duration-150"
            onClick={() => setStartpage(false)}
          >
            ok
          </button>
        </div>
      </div>
    </section>
  );
};

export default Intro;

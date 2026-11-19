import { useState } from "react";

const Intro = () => {
  const [startpage, setStartpage] = useState(true);

  return (
    <section
      className="bg-night h-full w-full inset-0 absolute z-50 overflow-y-auto transition-opacity duration-300 ease-out flex items-center"
      style={
        startpage
          ? { pointerEvents: "auto", opacity: 1 }
          : { pointerEvents: "none", opacity: 0 }
      }
      aria-hidden={!startpage}
    >
      <div className="w-full max-w-xl mx-auto px-6 py-12">
        <svg viewBox="0 0 64 64" className="w-14 h-14 mb-8" aria-hidden="true">
          <circle cx="32" cy="32" r="30" fill="#FFC700" />
          <path d="M8 40a30 30 0 0 0 48 0a30 30 0 0 1-48 0z" fill="#C07300" opacity=".55" />
          <path d="M18 27q5 4.5 10 0M36 27q5 4.5 10 0" stroke="#C07300" strokeWidth="3" strokeLinecap="round" fill="none" />
          <ellipse cx="32" cy="41" rx="5" ry="3" fill="#C07300" />
        </svg>
        <h1 className="text-4xl font-medium mb-6">Cohérence cardiaque</h1>
        <div className="flex flex-col gap-3 text-sand max-w-[34rem]">
          <p>
            La cohérence cardiaque est une technique de respiration qui aide à
            réguler le rythme cardiaque et à réduire le stress.
          </p>
          <p>
            Un visage animé vous guide : inspirez et expirez à son rythme.
          </p>
          <p className="text-ink">
            Posez les pieds à plat sur le sol, asseyez-vous le dos droit et
            relâchez les épaules.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-10">
          <button
            type="button"
            className="btn bg-sun text-night font-medium rounded-xl h-12 px-8 hover:bg-[#FFD43D]"
            onClick={() => setStartpage(false)}
          >
            Commencer
          </button>
          <a
            className="text-sand underline underline-offset-4 decoration-ink/30 hover:text-ink transition-colors"
            href="https://fr.wikipedia.org/wiki/Coh%C3%A9rence_cardiaque"
            target="_blank"
            rel="noreferrer"
          >
            En savoir plus sur Wikipédia
          </a>
        </div>
      </div>
    </section>
  );
};

export default Intro;

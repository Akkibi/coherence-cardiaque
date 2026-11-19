import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Intro from "./components/Intro";
import animCoherence from "./animations/animCoherence";
import animCarre from "./animations/animCarre";
import Menu from "./components/Menu";
import Eye from "./components/Eye";
import { Play, Pause, RotateCcw } from "lucide-react";
import { breathAudio } from "./audio/breathAudio";
import { requestWakeLock, releaseWakeLock } from "./webapp/wakeLock";

gsap.registerPlugin(useGSAP);

function App() {
  const { contextSafe } = useGSAP();

  const [type, setType] = useState("linear");
  const [soundType, setSoundType] = useState("none");
  const [ambiantType, setAmbiantType] = useState("none");
  const tlFace = useRef<gsap.core.Timeline>();
  const [totalTime, setTotalTime] = useState<number>(300);
  const [startTime, setStartTime] = useState<number>(5);
  const [endTime, setEndTime] = useState(5);
  const [paused, setPaused] = useState(true);
  const [isFirstStarted, setIsFirstStarted] = useState<boolean>(false);

  const playTimeline = contextSafe(() => {
    if (!tlFace.current) return;
    tlFace.current.play();
    breathAudio.play();
    requestWakeLock();
    setPaused(false);
    setIsFirstStarted(true);
    if (tlFace.current.progress() === 1) {
      resetTimeline();
    }
  });

  useEffect(() => breathAudio.setCycle(soundType), [soundType]);
  useEffect(() => breathAudio.setAmbient(ambiantType), [ambiantType]);

  const pauseTimeline = contextSafe(() => {
    if (!tlFace.current) return;
    tlFace.current.pause();
    breathAudio.pause();
    releaseWakeLock();
    setPaused(true);
  });

  useEffect(() => {
    const onHidden = () => document.hidden && pauseTimeline();
    document.addEventListener("visibilitychange", onHidden);
    return () => document.removeEventListener("visibilitychange", onHidden);
  }, [pauseTimeline]);

  const resetTimeline = contextSafe(() => {
    if (!tlFace.current) return;
    tlFace.current.pause(0);
    breathAudio.stop();
    breathAudio.pause();
    releaseWakeLock();
    setPaused(true);
    gsap.to("#bg-progress", { y: "100%", duration: 0.5 });
  });

  useGSAP(() => {
    breathAudio.stop();
    tlFace.current = gsap.timeline({ paused: true, onComplete: pauseTimeline });
    if (type === "square") {
      animCarre(totalTime, startTime, endTime, tlFace.current, breathAudio.phase);
    } else if (type === "linear") {
      animCoherence(totalTime, startTime, endTime, tlFace.current, breathAudio.phase);
    }
  }, [startTime, endTime, type, totalTime]);

  return (
    <main className="bg-night w-full h-full inset-0 absolute overflow-hidden">
      <Intro />
      <Menu
        type={type}
        setType={setType}
        soundType={soundType}
        setSoundType={setSoundType}
        ambiantType={ambiantType}
        setAmbiantType={setAmbiantType}
        totalTime={totalTime}
        setTotalTime={setTotalTime}
        pauseTimeline={pauseTimeline}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
      <div className="absolute z-20 inset-x-0 bottom-0 px-6 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] flex items-center justify-between pointer-events-none">
        <p className="text-2xl tabular-nums" aria-label="Temps restant">
          <span id="timer"></span>
        </p>
        <div id="toolbar" className="flex gap-3 pointer-events-auto">
          <button
            type="button"
            id="back"
            aria-label="Recommencer"
            className="btn h-12 w-12 grid place-items-center rounded-xl bg-dusk hover:bg-ember border border-ink/[0.08]"
            onClick={() => resetTimeline()}
          >
            <RotateCcw size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            id="pause"
            aria-label={paused ? "Reprendre" : "Pause"}
            className="btn h-12 w-12 grid place-items-center rounded-xl bg-dusk hover:bg-ember border border-ink/[0.08]"
            onClick={() => {
              if (!tlFace.current) return;
              tlFace.current.paused() ? playTimeline() : pauseTimeline();
            }}
          >
            {paused ? (
              <Play size={20} strokeWidth={1.5} />
            ) : (
              <Pause size={20} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>
      <main className="inset-0 absolute bg-night">
        <button
          type="button"
          aria-label="Démarrer la séance"
          tabIndex={isFirstStarted ? -1 : 0}
          className="absolute inset-0 bg-night/60 z-10 grid place-items-center transition-opacity duration-300 ease-out"
          style={
            isFirstStarted
              ? { pointerEvents: "none", opacity: 0 }
              : { pointerEvents: "auto", opacity: 1 }
          }
          onClick={() => {
            if (tlFace.current && tlFace.current.progress() === 0) {
              playTimeline();
              setIsFirstStarted(true);
            }
          }}
        >
          <span
            className="h-24 w-24 rounded-full bg-sun text-night grid place-items-center transition-transform duration-300 ease-out"
            style={{ transform: isFirstStarted ? "scale(0.8)" : "scale(1)" }}
          >
            <Play size={36} strokeWidth={1.5} fill="currentColor" className="translate-x-0.5" />
          </span>
        </button>
        <section
          className="flex flex-col md:flex-row justify-evenly items-center h-full w-full"
          style={type === "square" ? { display: "flex" } : { display: "none" }}
        >
          <div id="bg-gradient-progress" className="relative rounded-full">
            <div className=" relative w-[90vmin] h-[90vmin] ">
              <div
                id="square-handle"
                className=" absolute w-[10vmin] h-[10vmin] bg-[#c07300] rounded-full"
              ></div>
              <div className="border-[15vmin] rounded-[7.5vmin] border-solid border-[#FFC700]">
                <div
                  id="face-square"
                  className="aspect-square scale-90 bg-[#FFC700] rounded-full relative"
                  style={{ boxShadow: "0 -3rem 0px -0.5rem #c07300 inset" }}
                >
                  <Eye position="left" type="square-eyes" />
                  <Eye position="right" type="square-eyes" />
                  <div
                    id="square-mouth"
                    className="w-[5%] h-[5%] bg-[#c07300] top-3/4 left-1/2 absolute rounded-full"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="flex flex-col md:flex-row justify-evenly items-center h-full w-full"
          style={type === "linear" ? { display: "flex" } : { display: "none" }}
        >
          <div id="bg-gradient-progress" className="relative rounded-full">
            <div
              id="face-linear"
              className="aspect-square w-[90vmin] h-[90vmin] scale-75 bg-[#FFC700] rounded-full relative"
              style={{ boxShadow: "0 -3rem 0px -0.5rem #c07300 inset" }}
            >
              <Eye position="left" type="linear-eyes" />
              <Eye position="right" type="linear-eyes" />
              <div
                id="linear-mouth"
                className="w-[5%] h-[5%] bg-[#c07300] top-3/4 left-1/2 absolute rounded-full"
              ></div>
            </div>
          </div>
          <div
            id="linear"
            className=" w-[90vmin] h-[10vh] md:h-[90vmin] md:w-[10vw] bg-[#FFC700] rounded-full relative"
          >
            <div
              id="linear-handle"
              className="absolute rounded-full bg-[#c07300] w-[10vh] h-[10vh] md:w-[10vw] md:h-[10vw] scale-75"
            ></div>
          </div>
        </section>
      </main>
    </main>
  );
}

export default App;

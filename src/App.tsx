import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Intro from "./components/Intro";
import animCoherence from "./animCoherence";
import animCarre from "./animCarre";

import Eye from "./components/Eye";

gsap.registerPlugin(useGSAP);

function App() {
  const { contextSafe } = useGSAP();

  const [openMenu, setOpenMenu] = useState(false);
  const [type, setType] = useState("linear");
  const tlFace = useRef<gsap.core.Timeline>();
  const [totalTime, setTotalTime] = useState<number>(300);
  const [startTime, setStartTime] = useState<number>(5);
  const [endTime, setEndTime] = useState(5);
  const [paused, setPaused] = useState(true);
  const [isFirstStarted, setIsFirstStarted] = useState<boolean>(false);

  const playTimeline = contextSafe(() => {
    if (!tlFace.current) return;
    tlFace.current.play();
    setPaused(false);
    setIsFirstStarted(true);
    if (tlFace.current.progress() === 1) {
      resetTimeline();
    }
  });

  const pauseTimeline = contextSafe(() => {
    if (!tlFace.current) return;
    tlFace.current.pause();
    setPaused(true);
  });

  const resetTimeline = contextSafe(() => {
    if (!tlFace.current) return;
    tlFace.current.pause(0);
    setPaused(true);
    gsap.to("#bg-progress", { y: "100%", duration: 0.5 });
  });

  useGSAP(() => {
    tlFace.current = gsap.timeline({ paused: true, onComplete: pauseTimeline });
    if (type === "square") {
      animCarre(totalTime, startTime, endTime, tlFace.current);
    } else if (type === "linear") {
      animCoherence(totalTime, startTime, endTime, tlFace.current);
    }
  }, [startTime, endTime, type, totalTime]);

  return (
    <main className="bg-red-900 w-full h-full inset-0 absolute overflow-hidden ">
      <Intro />
      <section
        className="bg-[rgba(0,0,0,0.9)] backdrop-blur-lg w-full h-full inset-0 absolute duration-500 ease-out z-30"
        style={
          openMenu
            ? { pointerEvents: "auto", transform: "translateX(0)" }
            : { pointerEvents: "none", transform: "translateX(100%)" }
        }
      >
        <h2 className="text-[4vh] px-5 py-2 font-bold font-mono">Paramètres</h2>
        <h3 className="px-5 text-[2vh] font-semibold">Type de respiration :</h3>
        <div className=" w-full gap-5 flex px-10 py-5">
          <button
            className=" relative bg-yellow-950 w-full max-w-48 h-32 border-2 border-solid rounded-xl"
            onClick={() => setType("square")}
            style={
              type === "square"
                ? { borderColor: "white" }
                : { borderColor: "black" }
            }
          >
            <div className="w-20 h-20 bg-yellow-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <p className="relative z-10">Respiration en carré</p>
          </button>
          <button
            className="relative bg-yellow-950 w-full max-w-48 h-32 border-2 border-solid rounded-xl"
            onClick={() => setType("linear")}
            style={
              type === "linear"
                ? { borderColor: "white" }
                : { borderColor: "black" }
            }
          >
            <div className="w-2 h-20 bg-yellow-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <p className="relative z-10">Cohérence cardiaque</p>
          </button>
        </div>
        <h3 className="px-5 text-[2vh] font-semibold">durée :</h3>
        <p className="px-10 my-5">
          <input
            onChange={(e) => {
              setTotalTime(parseInt(e.target.value) * 60);
              pauseTimeline();
            }}
            type="number"
            className="max-w-32 px-4 py-1 mx-1 rounded-xl"
            placeholder={`${totalTime / 60}`}
          />
          minutes
        </p>
        <h3 className="px-5 text-[2vh] font-semibold">Décélération :</h3>
        <p className="px-10 my-5">
          Temp premier cycle :
          <input
            onChange={(e) => {
              setStartTime(parseInt(e.target.value) / 2);
              pauseTimeline();
            }}
            type="number"
            placeholder={`${startTime * 2}`}
            className=" px-4 py-1 max-w-20 mx-1 rounded-xl"
          />
          secondes
        </p>
        <p className="px-10">
          Temp dernier cycle :
          <input
            onChange={(e) => {
              setEndTime(parseInt(e.target.value) / 2);
              pauseTimeline();
            }}
            type="number"
            placeholder={`${endTime * 2}`}
            className=" px-4 py-1 max-w-20 mx-1 rounded-xl"
          />
          secondes
        </p>
      </section>
      <div className="absolute z-20 bottom-0 left-1 p-5 flex">
        <p className="text-[3vh]">
          {" "}
          <span id="timer"></span>s
        </p>
      </div>
      <div id="toolbar" className="absolute z-20 bottom-0 right-0 p-5 flex">
        <div
          id="back"
          className="btn"
          onClick={() => {
            resetTimeline();
          }}
        >
          <svg
            className="h-[5vh] w-[5vh]"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z"></path>
            </g>
          </svg>
        </div>
        <div
          id="pause"
          className="btn"
          onClick={() => {
            if (!tlFace.current) return;
            tlFace.current.paused() ? playTimeline() : pauseTimeline();
          }}
        >
          {paused ? (
            <svg viewBox="0 0 24 24" className="h-[5vh] w-[5vh]">
              <path fill="currentColor" d="M8 5v14l11-7z"></path>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-[5vh] w-[5vh]">
              <path
                fill="currentColor"
                d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"
              ></path>
            </svg>
          )}
        </div>
      </div>
      <div
        id="burger-menu"
        className="absolute top-2 right-2 h-[5vh] w-[5vh] z-40 bg-[rgba(0,0,0,0.75)] rounded-xl"
        onClick={() => {
          openMenu ? setOpenMenu(false) : setOpenMenu(true), pauseTimeline();
        }}
      >
        <div
          className="h-[0.25vh] w-[3vh] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl duration-150 origin-left"
          style={
            openMenu
              ? { transform: "rotate(45deg) translate(-50%, -50%)" }
              : { transform: "rotate(0deg) translate(-50%, -250%)" }
          }
        ></div>
        <div
          className="h-[0.25vh] w-[3vh] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl duration-150 origin-left"
          style={
            openMenu
              ? { transform: "rotate(-45deg) translate(-50%, -50%)" }
              : { transform: "rotate(0deg) translate(-50%, 150%)" }
          }
        ></div>
      </div>
      <main className=" inset-0 absolute bg-black">
        <div
          className="absolute inset-0 bg-[rgba(0,0,0,0.5)] z-10 duration-500 ease-out"
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
          <svg
            viewBox="0 0 24 24"
            style={
              isFirstStarted
                ? { left: "100%", top: "100%", scale: 0 }
                : { left: "50%", top: "50%", scale: 1 }
            }
            className="h-[20vh] opacity-75 w-[20vh] top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 ease-in duration-300"
          >
            <path fill="currentColor" d="M8 5v14l11-7z"></path>
          </svg>
        </div>
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
                  className="aspect-square scale-90 bg-[#FFC700] border-[1rem] sm:border-[2rem] border-solid border-[#c07300] rounded-full relative"
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
              className="aspect-square w-[90vmin] h-[90vmin] scale-75 bg-[#FFC700] border-[1rem] sm:border-[2rem] border-solid border-[#c07300] rounded-full relative"
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

import { useState } from "react";

interface menuTypes {
  type: string;
  setType: (type: string) => void;
  totalTime: number;
  setTotalTime: (totalTime: number) => void;
  pauseTimeline: () => void;
  startTime: number;
  setStartTime: (startTime: number) => void;
  endTime: number;
  setEndTime: (endTime: number) => void;
}

const Menu = ({
  type,
  setType,
  totalTime,
  setTotalTime,
  pauseTimeline,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}: menuTypes) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
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
    </>
  );
};
export default Menu;

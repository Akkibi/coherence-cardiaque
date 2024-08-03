import { useState } from "react";

interface menuTypes {
  type: string;
  setType: (type: string) => void;
  soundType: string;
  setSoundType: (soundType: string) => void;
  ambiantType: string;
  setAmbiantType: (ambiantType: string) => void;
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
  soundType,
  setSoundType,
  ambiantType,
  setAmbiantType,
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
        className="bg-[rgba(0,0,0,0.9)] backdrop-blur-lg w-full h-full inset-0 absolute duration-500 ease-out z-30 overflow-y-scroll"
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
            <p className="relative z-10 text-shadow">Respiration en carré</p>
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
            <p className="relative z-10 text-shadow">Cohérence cardiaque</p>
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
        <p className="px-10 my-5">
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
        <h3 className="px-5 text-[2vh] font-semibold">Audio :</h3>
        <p className=" px-5">Son par cycle</p>
        <div className=" w-full gap-5 flex px-10 py-5">
          <button
            className=" relative bg-yellow-950 w-full max-w-48 h-32 border-2 border-solid rounded-xl"
            onClick={() => setSoundType("none")}
            style={
              soundType === "none"
                ? { borderColor: "white" }
                : { borderColor: "black" }
            }
          >
            <p className="relative z-10 text-shadow">Aucun</p>
          </button>
          <button
            className=" relative bg-yellow-950 w-full max-w-48 h-32 border-2 border-solid rounded-xl"
            onClick={() => setSoundType("wave")}
            style={
              soundType === "wave"
                ? { borderColor: "white" }
                : { borderColor: "black" }
            }
          >
            <svg
              height="200px"
              width="200px"
              version="1.1"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="#currentColor"
              className="w-20 h-20 text-yellow-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <g>
                <path
                  fill="currentcolor"
                  d="M471,79.483c-12.212-6.551-22.696-15.974-30.534-27.339l-13.796-20l-13.797,20 c-7.839,11.365-18.33,20.788-30.542,27.339c-12.212,6.56-26.11,10.271-41,10.28c-14.89-0.009-28.78-3.72-41-10.28 c-12.204-6.551-22.694-15.974-30.534-27.339l-13.796-20l-13.797,20c-7.839,11.365-18.33,20.788-30.533,27.339 c-12.22,6.56-26.11,10.271-41,10.28c-14.89-0.009-28.788-3.72-41-10.28c-12.212-6.551-22.703-15.974-30.543-27.339l-13.796-20 l-13.796,20C63.694,63.509,53.212,72.932,41,79.483c-12.212,6.56-26.11,10.271-41,10.28v33.517 c20.509,0.009,39.94-5.161,56.864-14.263c10.534-5.66,20.119-12.839,28.466-21.236c8.356,8.398,17.932,15.576,28.466,21.236 c16.932,9.102,36.356,14.272,56.873,14.263c20.508,0.009,39.932-5.161,56.864-14.263c10.534-5.66,20.119-12.839,28.466-21.236 c8.347,8.398,17.932,15.576,28.466,21.236c16.932,9.102,36.355,14.272,56.864,14.263c20.517,0.009,39.94-5.161,56.873-14.263 c10.534-5.66,20.11-12.839,28.466-21.236c8.347,8.398,17.932,15.576,28.466,21.236c16.924,9.102,36.355,14.272,56.864,14.263 V89.763C497.11,89.754,483.212,86.043,471,79.483z"
                ></path>
                <path
                  fill="currentcolor"
                  d="M440.466,230.432l-13.796-20l-13.797,20c-7.839,11.365-18.33,20.78-30.542,27.339 c-12.212,6.56-26.11,10.271-41,10.271s-28.78-3.712-41-10.271c-12.204-6.559-22.694-15.974-30.534-27.339l-13.796-20l-13.797,20 c-7.839,11.365-18.33,20.78-30.533,27.339c-12.22,6.56-26.11,10.271-41,10.271c-14.89,0-28.788-3.712-41-10.271 c-12.212-6.559-22.703-15.974-30.543-27.339l-13.796-20l-13.796,20c-7.84,11.365-18.322,20.78-30.534,27.339 c-12.212,6.56-26.11,10.271-41,10.271v33.526c20.509,0,39.94-5.17,56.864-14.263c10.534-5.66,20.119-12.838,28.466-21.245 c8.356,8.407,17.932,15.585,28.466,21.245c16.932,9.094,36.356,14.263,56.873,14.263c20.508,0,39.932-5.17,56.864-14.263 c10.534-5.66,20.119-12.838,28.466-21.245c8.347,8.407,17.932,15.585,28.466,21.245c16.932,9.094,36.355,14.263,56.864,14.263 c20.517,0,39.94-5.17,56.873-14.263c10.534-5.66,20.11-12.838,28.466-21.245c8.347,8.407,17.932,15.585,28.466,21.245 c16.924,9.094,36.355,14.263,56.864,14.263v-33.526c-14.89,0-28.788-3.712-41-10.271 C458.788,251.212,448.304,241.797,440.466,230.432z"
                ></path>
                <path
                  fill="currentcolor"
                  d="M440.466,408.721l-13.796-20l-13.797,20c-7.839,11.364-18.33,20.78-30.542,27.338 c-12.212,6.56-26.11,10.271-41,10.271s-28.78-3.712-41-10.271c-12.204-6.559-22.694-15.974-30.534-27.338l-13.796-20l-13.797,20 c-7.839,11.364-18.33,20.78-30.533,27.338c-12.22,6.56-26.11,10.271-41,10.271c-14.89,0-28.788-3.712-41-10.271 c-12.212-6.559-22.703-15.974-30.543-27.338l-13.796-20l-13.796,20C63.694,420.085,53.212,429.5,41,436.059 c-12.212,6.56-26.11,10.271-41,10.271v33.526c20.509,0,39.94-5.17,56.864-14.271c10.534-5.662,20.119-12.83,28.466-21.238 c8.356,8.407,17.932,15.576,28.466,21.238c16.932,9.101,36.356,14.271,56.873,14.271c20.508,0,39.932-5.17,56.864-14.271 c10.534-5.662,20.119-12.83,28.466-21.238c8.347,8.407,17.932,15.576,28.466,21.238c16.932,9.101,36.355,14.271,56.864,14.271 c20.517,0,39.94-5.17,56.873-14.271c10.534-5.662,20.11-12.83,28.466-21.238c8.347,8.407,17.932,15.576,28.466,21.238 c16.924,9.101,36.355,14.271,56.864,14.271V446.33c-14.89,0-28.788-3.712-41-10.271C458.788,429.5,448.304,420.085,440.466,408.721 z"
                ></path>
              </g>
            </svg>
            <p className="relative z-10 text-shadow">Vagues</p>
          </button>
          <button
            className="relative bg-yellow-950 w-full max-w-48 h-32 border-2 border-solid rounded-xl"
            onClick={() => setSoundType("breathe")}
            style={
              soundType === "breathe"
                ? { borderColor: "white" }
                : { borderColor: "black" }
            }
          >
            <svg
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentcolor"
              className="w-20 h-20 text-yellow-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Part" transform="translate(-384.000000, -48.000000)">
                  <g
                    id="mouth_fill"
                    transform="translate(384.000000, 48.000000)"
                  >
                    <path
                      d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                      id="MingCute"
                      fill-rule="nonzero"
                    ></path>
                    <path
                      d="M20.3143,8.03775 C18.9074,7.07308 16.9416,6.0781 14.9267,6.00193 C14.1207,5.97146 13.4445,6.30726 12.7598,6.64733 C12.5678,6.74269 12.3752,6.83838 12.1788,6.92644 C12.0236,6.99598 11.9764,6.99598 11.8212,6.92644 C11.6248,6.83839 11.4322,6.7427 11.2402,6.64735 C10.5555,6.30728 9.87934,5.97148 9.07333,6.00196 C7.05843,6.07815 5.09261,7.07311 3.68571,8.03777 C2.76327,8.67025 1,9.6837 1,11.0007 C1,12.4522 2.9368,14.1171 3.91411,14.9494 C5.72969,16.4957 8.45115,18.000002 12,18.000002 C15.5489,18.000002 18.2703,16.4957 20.0859,14.9494 C21.1019,14.0841 23,12.513 23,11.0007 C23,9.72309 21.206,8.64915 20.3143,8.03775 Z M12,13 C15.1535,13 18.1821,12.5101 21,11.6088 C19.5309,11.2126 17.976,11 16.3668,11 C14.8546,11 13.3902,11.1878 12,11.5392 C10.6098,11.1878 9.14543,11 7.6332,11 C6.02404,11 4.46909,11.2126 3,11.6088 C5.81791,12.5101 8.8465,13 12,13 Z"
                      fill="currentcolor"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            <p className="relative z-10 text-shadow">Respiration</p>
          </button>
        </div>
        <p className=" px-5">Son ambiant</p>
        <div className=" w-full gap-5 flex px-10 py-5">
          <button
            className=" relative bg-yellow-950 w-full max-w-48 h-32 border-2 border-solid rounded-xl"
            onClick={() => setAmbiantType("none")}
            style={
              ambiantType === "none"
                ? { borderColor: "white" }
                : { borderColor: "black" }
            }
          >
            <p className="relative z-10 text-shadow">Aucun</p>
          </button>
          <button
            className=" relative bg-yellow-950 w-full max-w-48 h-32 border-2 border-solid rounded-xl"
            onClick={() => setAmbiantType("heart")}
            style={
              ambiantType === "heart"
                ? { borderColor: "white" }
                : { borderColor: "black" }
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-yellow-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                  fill="currentcolor"
                ></path>
              </g>
            </svg>
            <p className="relative z-10 text-shadow">Batement de coeur</p>
          </button>
          <button
            className="relative bg-yellow-950 w-full max-w-48 h-32 border-2 border-solid rounded-xl"
            onClick={() => setAmbiantType("music")}
            style={
              ambiantType === "music"
                ? { borderColor: "white" }
                : { borderColor: "black" }
            }
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-yellow-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <g>
                <path
                  d="M10.0909 11.9629L19.3636 8.63087V14.1707C18.8126 13.8538 18.1574 13.67 17.4545 13.67C15.4964 13.67 13.9091 15.096 13.9091 16.855C13.9091 18.614 15.4964 20.04 17.4545 20.04C19.4126 20.04 21 18.614 21 16.855C21 16.855 21 16.8551 21 16.855L21 7.49236C21 6.37238 21 5.4331 20.9123 4.68472C20.8999 4.57895 20.8852 4.4738 20.869 4.37569C20.7845 3.86441 20.6352 3.38745 20.347 2.98917C20.2028 2.79002 20.024 2.61055 19.8012 2.45628C19.7594 2.42736 19.716 2.39932 19.6711 2.3722L19.6621 2.36679C18.8906 1.90553 18.0233 1.93852 17.1298 2.14305C16.2657 2.34086 15.1944 2.74368 13.8808 3.23763L11.5963 4.09656C10.9806 4.32806 10.4589 4.52419 10.0494 4.72734C9.61376 4.94348 9.23849 5.1984 8.95707 5.57828C8.67564 5.95817 8.55876 6.36756 8.50501 6.81203C8.4545 7.22978 8.45452 7.7378 8.45455 8.33743V16.1307C7.90347 15.8138 7.24835 15.63 6.54545 15.63C4.58735 15.63 3 17.056 3 18.815C3 20.574 4.58735 22 6.54545 22C8.50355 22 10.0909 20.574 10.0909 18.815C10.0909 18.815 10.0909 18.8151 10.0909 18.815L10.0909 11.9629Z"
                  fill="currentcolor"
                ></path>
              </g>
            </svg>
            <p className="relative z-10 text-shadow">Musique</p>
          </button>
        </div>
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

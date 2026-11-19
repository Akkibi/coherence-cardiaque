import { useState, type ReactNode } from "react";
import { VolumeX, Waves, Wind, Heart, Music } from "lucide-react";
import OptionTile from "./OptionTile";

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

const icon = { size: 20, strokeWidth: 1.5 };

const cycleSounds = [
  { id: "none", label: "Aucun", Icon: VolumeX },
  { id: "wave", label: "Vagues", Icon: Waves },
  { id: "breathe", label: "Souffle", Icon: Wind },
];

const ambientSounds = [
  { id: "none", label: "Aucun", Icon: VolumeX },
  { id: "heart", label: "Battements", Icon: Heart },
  { id: "music", label: "Musique", Icon: Music },
];

const Group = ({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) => (
  <section className="flex flex-col gap-3">
    <div>
      <h3 className="text-base font-medium">{title}</h3>
      {hint && <p className="text-sm text-dust">{hint}</p>}
    </div>
    {children}
  </section>
);

const NumberField = ({
  label,
  unit,
  value,
  onValue,
}: {
  label: string;
  unit: string;
  value: number;
  onValue: (v: number) => void;
}) => (
  <label className="flex items-center justify-between gap-4 h-12 px-4 rounded-xl bg-dusk border border-ink/[0.08]">
    <span className="text-sand">{label}</span>
    <span className="flex items-center gap-2">
      <input
        type="number"
        inputMode="numeric"
        min={1}
        defaultValue={value}
        onChange={(e) => {
          const v = parseInt(e.target.value);
          if (v > 0) onValue(v);
        }}
        className="w-16 h-8 px-2 rounded-lg bg-night border border-ink/10 text-right tabular-nums"
      />
      <span className="text-dust w-7">{unit}</span>
    </span>
  </label>
);

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
        id="settings"
        className="bg-night w-full h-full inset-0 absolute transition-[transform,visibility] duration-500 ease-out z-30 overflow-y-auto"
        style={
          openMenu
            ? { pointerEvents: "auto", transform: "translateX(0)" }
            : { pointerEvents: "none", transform: "translateX(100%)", visibility: "hidden" }
        }
      >
        <div className="max-w-xl mx-auto px-6 pt-6 pb-16 flex flex-col gap-8">
          <h2 className="text-2xl font-medium h-11 flex items-center">Paramètres</h2>

          <Group title="Type de respiration">
            <div className="grid grid-cols-2 gap-3">
              <OptionTile tall label="Cohérence cardiaque" selected={type === "linear"} onSelect={() => setType("linear")}>
                <svg viewBox="0 0 64 64" className="w-14 h-14" aria-hidden="true">
                  <rect x="27" y="4" width="10" height="56" rx="5" fill="#2A2217" stroke="#FFC700" strokeOpacity=".4" />
                  <circle cx="32" cy="20" r="5" fill="#FFC700" />
                </svg>
              </OptionTile>
              <OptionTile tall label="Respiration en carré" selected={type === "square"} onSelect={() => setType("square")}>
                <svg viewBox="0 0 64 64" className="w-14 h-14" aria-hidden="true">
                  <rect x="10" y="10" width="44" height="44" rx="8" fill="none" stroke="#FFC700" strokeOpacity=".4" strokeWidth="2" />
                  <circle cx="10" cy="30" r="5" fill="#FFC700" />
                </svg>
              </OptionTile>
            </div>
          </Group>

          <Group title="Durée">
            <NumberField
              label="Séance"
              unit="min"
              value={totalTime / 60}
              onValue={(v) => {
                setTotalTime(v * 60);
                pauseTimeline();
              }}
            />
          </Group>

          <Group title="Décélération" hint="La durée d’un cycle passe progressivement de la première valeur à la dernière.">
            <NumberField
              label="Premier cycle"
              unit="s"
              value={startTime * 2}
              onValue={(v) => {
                setStartTime(v / 2);
                pauseTimeline();
              }}
            />
            <NumberField
              label="Dernier cycle"
              unit="s"
              value={endTime * 2}
              onValue={(v) => {
                setEndTime(v / 2);
                pauseTimeline();
              }}
            />
          </Group>

          <Group title="Son à chaque cycle">
            <div className="grid grid-cols-3 gap-3">
              {cycleSounds.map(({ id, label, Icon }) => (
                <OptionTile key={id} label={label} selected={soundType === id} onSelect={() => setSoundType(id)}>
                  <Icon {...icon} />
                </OptionTile>
              ))}
            </div>
          </Group>

          <Group title="Son d’ambiance">
            <div className="grid grid-cols-3 gap-3">
              {ambientSounds.map(({ id, label, Icon }) => (
                <OptionTile key={id} label={label} selected={ambiantType === id} onSelect={() => setAmbiantType(id)}>
                  <Icon {...icon} />
                </OptionTile>
              ))}
            </div>
          </Group>
        </div>
      </section>
      <button
        type="button"
        id="burger-menu"
        aria-label={openMenu ? "Fermer les paramètres" : "Ouvrir les paramètres"}
        aria-expanded={openMenu}
        aria-controls="settings"
        className="btn absolute top-[max(1.5rem,env(safe-area-inset-top))] right-6 h-11 w-11 z-40 bg-dusk hover:bg-ember border border-ink/[0.08] rounded-xl"
        onClick={() => {
          setOpenMenu(!openMenu);
          pauseTimeline();
        }}
      >
        <span
          className="h-0.5 w-5 bg-ink absolute top-1/2 left-1/2 rounded-full transition-transform duration-150 origin-center"
          style={{ transform: openMenu ? "translate(-50%, -50%) rotate(45deg)" : "translate(-50%, -350%)" }}
        />
        <span
          className="h-0.5 w-5 bg-ink absolute top-1/2 left-1/2 rounded-full transition-transform duration-150 origin-center"
          style={{ transform: openMenu ? "translate(-50%, -50%) rotate(-45deg)" : "translate(-50%, 250%)" }}
        />
      </button>
    </>
  );
};
export default Menu;

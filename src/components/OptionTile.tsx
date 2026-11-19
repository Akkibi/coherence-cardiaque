import type { ReactNode } from "react";

interface OptionTileProps {
  selected: boolean;
  onSelect: () => void;
  label: string;
  children?: ReactNode;
  tall?: boolean;
}

const OptionTile = ({ selected, onSelect, label, children, tall }: OptionTileProps) => (
  <button
    type="button"
    aria-pressed={selected}
    onClick={onSelect}
    className={`btn flex flex-col items-center justify-center gap-2 rounded-2xl border px-3 text-sm ${
      tall ? "h-36" : "h-20"
    } ${
      selected
        ? "bg-ember border-ink/20 text-ink shadow-lip"
        : "bg-dusk border-ink/[0.08] text-sand hover:bg-ember"
    }`}
  >
    {children}
    <span>{label}</span>
  </button>
);

export default OptionTile;

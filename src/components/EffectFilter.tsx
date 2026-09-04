import { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";

interface EffectFilterProps {
  options: string[];
  activeEffects: string[];
  onToggle: (effect: string) => void;
}

export default function EffectFilter({ options, activeEffects, onToggle }: EffectFilterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClick);

    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`
          h-10 px-3 flex flex-row justify-center items-center gap-2
          border-2 rounded-xl border-gray-600
          ${activeEffects.length > 0 ? "bg-[#00ffbb]" : ""}
          ${activeEffects.length > 0 ? "text-black" : "text-white"}
        `}
      >
        Effect
        <AiOutlineDown className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="
          absolute left-0 mt-1 w-40
          rounded-md overflow-hidden bg-[#222]
          shadow-2xl z-50"
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onToggle(option)}
              className={`
                w-full text-left px-4
                py-2 flex gap-2 transition text-white text-sm
                ${activeEffects.includes(option) ? "bg-[#005b52]" : "hover:bg-[#333]"}
              `}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

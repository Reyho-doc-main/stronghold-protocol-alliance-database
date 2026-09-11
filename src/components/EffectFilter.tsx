import { useEffect, useRef, useState } from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";

export type EffectOption = {
  value: string;
  label: string;
  children?: EffectOption[];
};

interface EffectFilterProps {
  options: EffectOption[];
  activeEffects: string[];
  onToggle: (effect: string) => void;
}

export default function EffectFilter({ options, activeEffects, onToggle }: EffectFilterProps) {
  const [open, setOpen] = useState(false);
  const [expandedOption, setExpandedOption] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
        setExpandedOption(null);
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
        <div className="absolute left-0 mt-1 w-40 bg-[#222] shadow-2xl z-50">
          {options.map((option) => (
            <div
              key={option.value}
              className="relative"
              onMouseEnter={() => option.children && setExpandedOption(option.value)}
              onMouseLeave={() =>
                setExpandedOption((prev) => (prev === option.value ? null : prev))
              }
            >
              <button
                onClick={() => {
                  onToggle(option.value);
                  if (option.children) {
                    setExpandedOption((prev) => (prev === option.value ? null : option.value));
                  }
                }}
                className={`
                  w-full text-left px-4
                  py-2 flex items-center justify-between gap-2 transition text-white text-sm
                  ${activeEffects.includes(option.value) ? "bg-[#005b52]" : "hover:bg-[#333]"}
                `}
              >
                {option.label}
                {option.children && <AiOutlineRight className="text-xs opacity-70 shrink-0" />}
              </button>

              {option.children && expandedOption === option.value && (
                <div className="absolute left-0 top-full sm:left-full sm:top-0 mt-1 sm:mt-0 w-40 bg-[#222] shadow-2xl z-50">
                  {option.children.map((child) => (
                    <button
                      key={child.value}
                      onClick={() => onToggle(child.value)}
                      className={`
                        w-full text-left px-4
                        py-2 flex gap-2 transition text-white text-sm
                        ${activeEffects.includes(child.value) ? "bg-[#005b52]" : "hover:bg-[#333]"}
                      `}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

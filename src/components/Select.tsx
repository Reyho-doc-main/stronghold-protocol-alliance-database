import { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

export interface SelectOption {
  value: string;
  title: string;
}

interface Props {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
}

export default function Select({
  value,
  options,
  onChange,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div ref={ref} className="relative w-48 shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={twMerge(
          "flex w-full items-center justify-between rounded-md bg-[#3d7b70] px-3 py-1 text-lg tracking-wider text-white",
          className
        )}
      >
        <span className="min-w-0 flex-1 truncate">
          {selected?.title ?? ""}
        </span>

        <AiOutlineDown
          className={`ml-2 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-md bg-[#222] shadow-2xl">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={twMerge(
                "w-full px-6 py-4 text-left text-white transition-colors",
                option.value === value
                  ? "bg-[#005b52]"
                  : "hover:bg-[#333]"
              )}
            >
              {option.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
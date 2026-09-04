import { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

type CollapsibleSectionProps = {
  title: string;
  note?: string;
  children: React.ReactNode;
};

function CollapsibleSection({ title, note, children }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-[#25be97] bg-[#2b2b2b]">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full px-4 py-3 cursor-pointer"
      >
        <span className="text-white text-lg">{title}</span>
        {isOpen ? <AiOutlineUp className="text-white shrink-0" /> : <AiOutlineDown className="text-white shrink-0" />}
      </button>
      {isOpen && (
        <div className="flex flex-col gap-4 px-4 pb-4">
          {note && <div className="text-[#888888] text-xs italic">{note}</div>}
          {children}
        </div>
      )}
    </div>
  );
}

export default CollapsibleSection;

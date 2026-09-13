import { useState } from "react";
import type { KeyboardEvent, Ref } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  onClose?: () => void;
  ref?: Ref<HTMLInputElement>;
}

export default function SearchInput({ onSearch, placeholder, onClose, ref }: SearchInputProps) {
  const [inputValue, setInputValue] = useState("");

  const closeSearch = () => {
    setInputValue("");
    onSearch("");
    onClose?.();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch(inputValue);
    if (e.key === "Escape" && onClose) closeSearch();
  };

  return (
    <div
      className="
        h-10 px-3 flex flex-row items-center gap-2
        border-2 rounded-xl border-gray-600
      "
    >
      <AiOutlineSearch className="text-white" />
      <input
        ref={ref}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="bg-transparent text-white placeholder-gray-400 outline-none w-32 md:w-48"
      />
      {onClose && (
        <button
          type="button"
          aria-label="Close search"
          onClick={closeSearch}
          className="text-gray-400 hover:text-white cursor-pointer"
        >
          <AiOutlineClose />
        </button>
      )}
    </div>
  );
}

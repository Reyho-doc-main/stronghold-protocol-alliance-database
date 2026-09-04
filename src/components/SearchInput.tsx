import { useState } from "react";
import type { KeyboardEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({ onSearch, placeholder }: SearchInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch(inputValue);
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
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="bg-transparent text-white placeholder-gray-400 outline-none w-32 md:w-48"
      />
    </div>
  );
}

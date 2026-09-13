import { useEffect, useRef, useState } from "react";

export function useSearchHotkey(alwaysVisible: boolean) {
  const [isVisible, setIsVisible] = useState(alwaysVisible);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isVisible) inputRef.current?.focus();
  }, [isVisible]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "f") return;

      event.preventDefault();
      setIsVisible(true);
      inputRef.current?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const hide = () => {
    if (!alwaysVisible) setIsVisible(false);
  };

  return { isVisible, inputRef, hide };
}

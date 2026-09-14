import type { ReactNode } from "react";

const MARK_CLASSES = "bg-amber-400 text-[#212121] rounded-sm px-0.5";

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function highlightPlainText(text: string, term: string): ReactNode {
  const trimmed = term.trim();
  if (!trimmed) return text;

  const parts = text.split(new RegExp(`(${escapeRegExp(trimmed)})`, "gi"));
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === trimmed.toLowerCase() ? (
          <mark key={`${index}-${part}`} className={MARK_CLASSES}>
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </span>
  );
}

export function highlightHtml(html: string, term: string): string {
  const trimmed = term.trim();
  if (!trimmed) return html;

  const pattern = new RegExp(`(${escapeRegExp(trimmed)})`, "gi");
  return html
    .split(/(<[^>]+>|&(?:lt|gt);?)/gi)
    .map((segment) =>
      segment.startsWith("<") || segment.startsWith("&")
        ? segment
        : segment.replace(pattern, `<mark class="${MARK_CLASSES}">$1</mark>`),
    )
    .join("");
}

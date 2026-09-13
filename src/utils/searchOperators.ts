import type { OperatorDto } from "../dtos/operator.dto";

export type SearchMatchCategory = "name" | "alliance" | "effects" | "type";

export interface SearchGroup {
  category: SearchMatchCategory;
  label: string;
  operators: OperatorDto[];
  matchedAlliance: Record<string, string>;
}

const CATEGORY_LABELS: Record<SearchMatchCategory, string> = {
  name: "Name matches",
  alliance: "Alliance matches",
  effects: "Ability matches",
  type: "Type matches",
};

// Priority order (most relevant first)
const CATEGORY_ORDER: SearchMatchCategory[] = ["name", "alliance", "effects", "type"];

const stripHtmlTags = (html: string): string => html.replace(/<[^>]*>/g, " ");

interface OperatorMatch {
  category: SearchMatchCategory;
  matchedAlliance?: string;
}

function matchOperator(op: OperatorDto, needle: string): OperatorMatch | null {
  if (op.name.toLowerCase().includes(needle)) return { category: "name" };

  const matchedAlliance = op.alliances.find((alliance) => alliance.toLowerCase().includes(needle));
  if (matchedAlliance) return { category: "alliance", matchedAlliance };

  const effectsText = [...(op.effects ?? []), stripHtmlTags(op.attribute)].join(" ").toLowerCase();
  if (effectsText.includes(needle)) return { category: "effects" };

  if (op.attributeType.toLowerCase().includes(needle)) return { category: "type" };

  return null;
}

// Returns null when there's no active search term
export function groupOperatorsBySearch(operators: OperatorDto[], term: string): SearchGroup[] | null {
  const needle = term.trim().toLowerCase();
  if (!needle) return null;

  const buckets: Record<SearchMatchCategory, { operator: OperatorDto; matchedAlliance?: string }[]> = {
    name: [],
    alliance: [],
    effects: [],
    type: [],
  };

  for (const op of operators) {
    const match = matchOperator(op, needle);
    if (match) buckets[match.category].push({ operator: op, matchedAlliance: match.matchedAlliance });
  }

  return CATEGORY_ORDER.filter((category) => buckets[category].length > 0).map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    operators: buckets[category].map((entry) => entry.operator),
    matchedAlliance: Object.fromEntries(
      buckets[category]
        .filter((entry): entry is { operator: OperatorDto; matchedAlliance: string } => !!entry.matchedAlliance)
        .map((entry) => [entry.operator.name, entry.matchedAlliance]),
    ),
  }));
}

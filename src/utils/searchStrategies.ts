import type { StrategyDto } from "../dtos/strategy.dto";

export type StrategySearchCategory = "name" | "effects";

export interface StrategySearchGroup {
  category: StrategySearchCategory;
  label: string;
  strategies: StrategyDto[];
}

const CATEGORY_LABELS: Record<StrategySearchCategory, string> = {
  name: "Name matches",
  effects: "Ability matches",
};

// Has Priority order (most relevant first)
const CATEGORY_ORDER: StrategySearchCategory[] = ["name", "effects"];

const stripHtmlTags = (html: string): string => html.replace(/<[^>]*>/g, " ");

function matchStrategy(strategy: StrategyDto, needle: string): StrategySearchCategory | null {
  if (strategy.name.toLowerCase().includes(needle)) return "name";
  if (stripHtmlTags(strategy.effectDesc).toLowerCase().includes(needle)) return "effects";
  return null;
}

// Returns null when there's no search term
export function groupStrategiesBySearch(strategies: StrategyDto[], term: string): StrategySearchGroup[] | null {
  const needle = term.trim().toLowerCase();
  if (!needle) return null;

  const buckets: Record<StrategySearchCategory, StrategyDto[]> = { name: [], effects: [] };

  for (const strategy of strategies) {
    const category = matchStrategy(strategy, needle);
    if (category) buckets[category].push(strategy);
  }

  return CATEGORY_ORDER.filter((category) => buckets[category].length > 0).map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    strategies: buckets[category],
  }));
}

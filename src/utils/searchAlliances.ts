import type { AllianceDto } from "../dtos/alliance.dto";
import type { OperatorDto } from "../dtos/operator.dto";

export type AllianceSearchCategory = "name" | "operator" | "description";

export interface AllianceSearchGroup {
  category: AllianceSearchCategory;
  label: string;
  alliances: AllianceDto[];
  matchedOperator: Record<string, string>;
}

const CATEGORY_LABELS: Record<AllianceSearchCategory, string> = {
  name: "Name matches",
  operator: "Operator matches",
  description: "Description matches",
};

// Has Priority order (most relevant first)
const CATEGORY_ORDER: AllianceSearchCategory[] = ["name", "operator", "description"];

const stripHtmlTags = (html: string): string => html.replace(/<[^>]*>/g, " ");

interface AllianceMatch {
  category: AllianceSearchCategory;
  matchedOperator?: string;
}

function matchAlliance(alliance: AllianceDto, operators: OperatorDto[], needle: string): AllianceMatch | null {
  if (alliance.name.replaceAll("_", " ").toLowerCase().includes(needle)) return { category: "name" };

  const matchedOperator = operators.find((op) => op.name.toLowerCase().includes(needle));
  if (matchedOperator) return { category: "operator", matchedOperator: matchedOperator.name };

  if (stripHtmlTags(alliance.desc).toLowerCase().includes(needle)) return { category: "description" };

  return null;
}

// Returns null when there's no search term
export function groupAlliancesBySearch(
  alliances: AllianceDto[],
  operatorsByAlliance: Map<string, OperatorDto[]>,
  term: string,
): AllianceSearchGroup[] | null {
  const needle = term.trim().toLowerCase();
  if (!needle) return null;

  const buckets: Record<AllianceSearchCategory, { alliance: AllianceDto; matchedOperator?: string }[]> = {
    name: [],
    operator: [],
    description: [],
  };

  for (const alliance of alliances) {
    const operators = operatorsByAlliance.get(alliance.bondId) ?? [];
    const match = matchAlliance(alliance, operators, needle);
    if (match) buckets[match.category].push({ alliance, matchedOperator: match.matchedOperator });
  }

  return CATEGORY_ORDER.filter((category) => buckets[category].length > 0).map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    alliances: buckets[category].map((entry) => entry.alliance),
    matchedOperator: Object.fromEntries(
      buckets[category]
        .filter((entry): entry is { alliance: AllianceDto; matchedOperator: string } => !!entry.matchedOperator)
        .map((entry) => [entry.alliance.bondId, entry.matchedOperator]),
    ),
  }));
}

import type { SelectOption } from "../components/Select";

export const TABS = ["Home", "Attributes", "Alliances", "Strategies", "Items", "Advanced"] as const;
export type Tab = (typeof TABS)[number];

export const SEASON_OPTIONS: SelectOption[] = [
  { value: "1", title: "First Season" },
  { value: "2.1", title: "Second Season" },
  { value: "2", title: "Second Season (CN pre-patch)" },
];

export const SEASONS = SEASON_OPTIONS.map((option) => option.value);
export const DEFAULT_SEASON = "2.1";

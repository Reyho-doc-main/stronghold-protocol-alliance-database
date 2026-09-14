export type OperatorDto = {
  name: string;
  attributeType: "Can stack" | "Combat" | "One-time" | "Prep" | "Specialized";
  attribute: string;
  tier: number;
  alliances: string[];
  effects?: string[];
};

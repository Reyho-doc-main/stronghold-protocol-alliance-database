import type { OperatorDto } from "../dtos/operator.dto";

export const EXEMPT_FROM_BANS = "Reserve Operator - Supporter";

export function getMaxBanCounts(season: string): { core: number; addon: number } {
  return season === "1" ? { core: 2, addon: 2 } : { core: 3, addon: 4 };
}

export function getBannedAllianceTags(bannedCore: string[], bannedAddon: string[], season: string): Set<string> {
  const { core, addon } = getMaxBanCounts(season);
  return new Set([...bannedCore.slice(0, core), ...bannedAddon.slice(0, addon)]);
}

export function isOperatorBanned(
  op: OperatorDto,
  bannedAllianceTags: Set<string>,
  manuallyUnbanned: string[],
): boolean {
  if (op.name === EXEMPT_FROM_BANS) return false;
  if (manuallyUnbanned.includes(op.name)) return false;
  if (op.alliances.length === 0) return false;
  return op.alliances.every((tag) => bannedAllianceTags.has(tag));
}

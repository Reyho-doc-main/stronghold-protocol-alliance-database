import type { OperatorDto } from "../dtos/operator.dto";
export const DISPATCH_TIER_LEVELS = [1, 2, 3, 4, 5, 6] as const;
const UNOBTAINABLE_VIA_MODULE = new Set(["Reserve Operator - Supporter"]);

export function computeDispatchPool(
  operators: OperatorDto[],
  equippingAlliances: string[],
  tierLevel: number,
): OperatorDto[] {
  if (equippingAlliances.length === 0) return [];
  return operators.filter(
    (op) =>
      !UNOBTAINABLE_VIA_MODULE.has(op.name) &&
      op.tier <= tierLevel &&
      op.alliances.some((a) => equippingAlliances.includes(a)),
  );
}

export const DISPATCH_MODULE_CHOICES = 3;

export function isGuaranteedHit(poolSize: number, targetCount: number): boolean {
  return poolSize - targetCount < DISPATCH_MODULE_CHOICES;
}

export function formatDispatchOdds(poolSize: number, targetCount: number): string {
  const guaranteed = isGuaranteedHit(poolSize, targetCount);
  return `${targetCount} in ${poolSize}${guaranteed ? ", guarantees" : ""}`;
}

function choose(n: number, k: number): number {
  if (k < 0 || n < k) return 0;
  let result = 1;
  for (let i = 0; i < k; i++) result = (result * (n - i)) / (i + 1);
  return result;
}

export function hitProbability(poolSize: number, targetCount: number): number {
  if (targetCount <= 0) return 0;
  if (isGuaranteedHit(poolSize, targetCount)) return 1;
  const missChance = choose(poolSize - targetCount, DISPATCH_MODULE_CHOICES) / choose(poolSize, DISPATCH_MODULE_CHOICES);
  return 1 - missChance;
}

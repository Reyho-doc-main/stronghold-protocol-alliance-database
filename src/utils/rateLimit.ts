const lastCallTimestamps: Record<string, number> = {};

export function isRateLimited(key: string, cooldownMs: number): boolean {
  const now = Date.now();
  const last = lastCallTimestamps[key] ?? 0;

  if (now - last < cooldownMs) return true;

  lastCallTimestamps[key] = now;
  return false;
}

import type { LeaderDto } from "../dtos/leader.dto";
import type { TacticalTrainingDto } from "../dtos/tacticalTraining.dto";

export interface AdvancedTabSearchResult {
  leaders: LeaderDto[];
  training: TacticalTrainingDto[];
  matchedEnemy: Record<string, string>;
}

export function filterAdvancedTabData(
  leaders: LeaderDto[],
  training: TacticalTrainingDto[],
  term: string,
): AdvancedTabSearchResult {
  const needle = term.trim().toLowerCase();
  if (!needle) return { leaders, training, matchedEnemy: {} };

  const filteredLeaders = leaders.filter((leader) => leader.name.toLowerCase().includes(needle));

  const matchedEnemy: Record<string, string> = {};
  const filteredTraining = training.filter((t) => {
    if (t.name.toLowerCase().includes(needle)) return true;

    const enemy = t.enemies.find((e) => e.name.toLowerCase().includes(needle));
    if (!enemy) return false;

    matchedEnemy[t.id] = enemy.name;
    return true;
  });

  return { leaders: filteredLeaders, training: filteredTraining, matchedEnemy };
}

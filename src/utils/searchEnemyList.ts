import type { LeaderDto } from "../dtos/leader.dto";
import type { TacticalTrainingDto, TacticalTrainingEnemyDto } from "../dtos/tacticalTraining.dto";
import type { DecisionDto } from "../dtos/decision.dto";

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

export function filterTrainingEnemies(
  enemies: TacticalTrainingEnemyDto[],
  term: string,
): TacticalTrainingEnemyDto[] {
  const needle = term.trim().toLowerCase();
  if (!needle) return enemies;
  return enemies.filter((enemy) => enemy.name.toLowerCase().includes(needle));
}

export function filterDecisions(decisions: DecisionDto[], term: string): DecisionDto[] {
  const needle = term.trim().toLowerCase();
  if (!needle) return decisions;
  return decisions.filter(
    (decision) =>
      decision.name.toLowerCase().includes(needle) || decision.description.toLowerCase().includes(needle),
  );
}

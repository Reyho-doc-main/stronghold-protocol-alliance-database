import type { TrophyDto } from "../dtos/trophy.dto";
import type { OperatorDto } from "../dtos/operator.dto";
import type { AllianceDto } from "../dtos/alliance.dto";
import type { ShopItemDto } from "../dtos/shopItem.dto";
import type { StrategyDto } from "../dtos/strategy.dto";
import type { LeaderDto } from "../dtos/leader.dto";
import type { TacticalTrainingDto } from "../dtos/tacticalTraining.dto";
import type { DecisionDto } from "../dtos/decision.dto";
import type { AdvancedCalculationsDto } from "../dtos/calculation.dto";
import type { HiddenCoreRoundDto } from "../dtos/hiddenCore.dto";
import type { MapDto } from "../dtos/map.dto";
import type { DispatchModuleSectionDto } from "../dtos/dispatchModule.dto";

import { operators as season1Operators } from "../data/alliance/season1/operators.json";
import { operators as season2Operators } from "../data/alliance/season2/operators.json";
import { operators as season21Operators } from "../data/alliance/season2.1/operators.json";

import { bondInfo as season1Bonds } from "../data/alliance/season1/alliances.json";
import { bondInfo as season2Bonds } from "../data/alliance/season2/alliances.json";
import { bondInfo as season21Bonds } from "../data/alliance/season2.1/alliances.json";

import { shopitems as season1Items } from "../data/alliance/season1/items.json";
import { shopitems as season2Items } from "../data/alliance/season2/items.json";
import { shopitems as season21Items } from "../data/alliance/season2.1/items.json";

import { bandInfo as season1Bands } from "../data/alliance/season1/strategies.json";
import { bandInfo as season2Bands } from "../data/alliance/season2/strategies.json";
import { bandInfo as season21Bands } from "../data/alliance/season2.1/strategies.json";

import { leaders as season1Leaders } from "../data/alliance/season1/leaders.json";
import { leaders as season2Leaders } from "../data/alliance/season2/leaders.json";
import { leaders as season21Leaders } from "../data/alliance/season2.1/leaders.json";

import { tacticalTraining as season1TacticalTraining } from "../data/alliance/season1/tacticalTraining.json";
import { tacticalTraining as season2TacticalTraining } from "../data/alliance/season2/tacticalTraining.json";
import { tacticalTraining as season21TacticalTraining } from "../data/alliance/season2.1/tacticalTraining.json";

import { bountyDecisions as season1BountyDecisions } from "../data/alliance/season1/bountyDecisions.json";
import { bountyDecisions as season2BountyDecisions } from "../data/alliance/season2/bountyDecisions.json";
import { bountyDecisions as season21BountyDecisions } from "../data/alliance/season2.1/bountyDecisions.json";

import { tacticalDecisions as season1TacticalDecisions } from "../data/alliance/season1/tacticalDecisions.json";
import { tacticalDecisions as season2TacticalDecisions } from "../data/alliance/season2/tacticalDecisions.json";
import { tacticalDecisions as season21TacticalDecisions } from "../data/alliance/season2.1/tacticalDecisions.json";

import { advancedCalculations as season1AdvancedCalculations } from "../data/alliance/season1/advancedCalculations.json";
import { advancedCalculations as season2AdvancedCalculations } from "../data/alliance/season2/advancedCalculations.json";
import { advancedCalculations as season21AdvancedCalculations } from "../data/alliance/season2.1/advancedCalculations.json";

import { trophies as season1Trophies } from "../data/alliance/season1/trophies.json";
import { trophies as season2Trophies } from "../data/alliance/season2/trophies.json";
import { trophies as season21Trophies } from "../data/alliance/season2.1/trophies.json";

import { hiddenCore as season1HiddenCore } from "../data/alliance/season1/hiddenCore.json";
import { hiddenCore as season2HiddenCore } from "../data/alliance/season2/hiddenCore.json";
import { hiddenCore as season21HiddenCore } from "../data/alliance/season2.1/hiddenCore.json";

import { maps as season1Maps } from "../data/alliance/season1/maps.json";
import { maps as season2Maps } from "../data/alliance/season2/maps.json";
import { maps as season21Maps } from "../data/alliance/season2.1/maps.json";

import dispatchModuleSeason21 from "../data/alliance/season2.1/dispatchModule.json";

import { importantOperators as season1Important } from "../data/alliance/season1/importantOperators.json";
import { importantOperators as season2Important } from "../data/alliance/season2/importantOperators.json";
import { importantOperators as season21Important } from "../data/alliance/season2.1/importantOperators.json";

type Season = "1" | "2" | "2.1";

function bySeason<T>(data: Record<Season, T>, season: string): T {
  return data[season as Season] ?? data["2.1"];
}

const operatorsBySeason = { "1": season1Operators, "2": season2Operators, "2.1": season21Operators };
const alliancesBySeason = { "1": season1Bonds, "2": season2Bonds, "2.1": season21Bonds };
const itemsBySeason = { "1": season1Items, "2": season2Items, "2.1": season21Items };
const strategiesBySeason = { "1": season1Bands, "2": season2Bands, "2.1": season21Bands };
const leadersBySeason = { "1": season1Leaders, "2": season2Leaders, "2.1": season21Leaders };
const tacticalTrainingBySeason = {
  "1": season1TacticalTraining,
  "2": season2TacticalTraining,
  "2.1": season21TacticalTraining,
};
const bountyDecisionsBySeason = {
  "1": season1BountyDecisions,
  "2": season2BountyDecisions,
  "2.1": season21BountyDecisions,
};
const tacticalDecisionsBySeason = {
  "1": season1TacticalDecisions,
  "2": season2TacticalDecisions,
  "2.1": season21TacticalDecisions,
};
const advancedCalculationsBySeason = {
  "1": season1AdvancedCalculations,
  "2": season2AdvancedCalculations,
  "2.1": season21AdvancedCalculations,
};
const trophiesBySeason = { "1": season1Trophies, "2": season2Trophies, "2.1": season21Trophies };
const hiddenCoreBySeason = { "1": season1HiddenCore, "2": season2HiddenCore, "2.1": season21HiddenCore };
const mapsBySeason: Record<Season, MapDto[]> = { "1": season1Maps, "2": season2Maps, "2.1": season21Maps };
const importantOperatorsBySeason = { "1": season1Important, "2": season2Important, "2.1": season21Important };

export const getOperatorsBySeason = (season: string): OperatorDto[] =>
  bySeason(operatorsBySeason, season) as OperatorDto[];
export const getAlliancesBySeason = (season: string): AllianceDto[] => bySeason(alliancesBySeason, season);
export const getItemsBySeason = (season: string): ShopItemDto[] => bySeason(itemsBySeason, season);
export const getStrategiesBySeason = (season: string): StrategyDto[] => bySeason(strategiesBySeason, season);
export const getLeadersBySeason = (season: string): LeaderDto[] => bySeason(leadersBySeason, season);
export const getTacticalTrainingBySeason = (season: string): TacticalTrainingDto[] =>
  bySeason(tacticalTrainingBySeason, season);
export const getBountyDecisionsBySeason = (season: string): DecisionDto[] =>
  bySeason(bountyDecisionsBySeason, season);
export const getTacticalDecisionsBySeason = (season: string): DecisionDto[] =>
  bySeason(tacticalDecisionsBySeason, season);
export const getAdvancedCalculationsBySeason = (season: string): AdvancedCalculationsDto =>
  bySeason(advancedCalculationsBySeason, season);
export const getTrophiesBySeason = (season: string): TrophyDto[] => bySeason(trophiesBySeason, season);
export const getHiddenCoreBySeason = (season: string): HiddenCoreRoundDto[] => bySeason(hiddenCoreBySeason, season);
export const getMapsBySeason = (season: string): MapDto[] => bySeason(mapsBySeason, season);
export const getImportantOperatorsBySeason = (season: string): string[] => bySeason(importantOperatorsBySeason, season);

export function getDispatchModuleBySeason(season: string): DispatchModuleSectionDto | null {
  if (season === "2.1") return dispatchModuleSeason21 as DispatchModuleSectionDto;
  return null;
}

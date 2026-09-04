import type { TrophyDto } from "../dtos/trophy.dto";

import { operators as allianceSeason1operators } from "../data/alliance/season1/operators.json";
import { operators as allianceSeason2operators } from "../data/alliance/season2/operators.json";
import { operators as allianceSeason21operators } from "../data/alliance/season2.1/operators.json";

import { bondInfo as allianceSeason1bonds } from "../data/alliance/season1/alliances.json";
import { bondInfo as allianceSeason2bonds } from "../data/alliance/season2/alliances.json";
import { bondInfo as allianceSeason21bonds } from "../data/alliance/season2.1/alliances.json";

import { shopitems as allianceSeason1items } from "../data/alliance/season1/items.json";
import { shopitems as allianceSeason2items } from "../data/alliance/season2/items.json";
import { shopitems as allianceSeason21items } from "../data/alliance/season2.1/items.json";

import { bandInfo as allianceSeason1bands } from "../data/alliance/season1/strategies.json";
import { bandInfo as allianeSeason2bands } from "../data/alliance/season2/strategies.json";
import { bandInfo as allianceSeason21bands } from "../data/alliance/season2.1/strategies.json";

import { leaders as allianceSeason1leaders } from "../data/alliance/season1/leaders.json";
import { leaders as allianceSeason2leaders } from "../data/alliance/season2/leaders.json";
import { leaders as allianceSeason21leaders } from "../data/alliance/season2.1/leaders.json";

import { tacticalTraining as allianceSeason1tacticalTraining } from "../data/alliance/season1/tacticalTraining.json";
import { tacticalTraining as allianceSeason2tacticalTraining } from "../data/alliance/season2/tacticalTraining.json";
import { tacticalTraining as allianceSeason21tacticalTraining } from "../data/alliance/season2.1/tacticalTraining.json";

import { bountyDecisions as allianceSeason1bountyDecisions } from "../data/alliance/season1/bountyDecisions.json";
import { bountyDecisions as allianceSeason2bountyDecisions } from "../data/alliance/season2/bountyDecisions.json";
import { bountyDecisions as allianceSeason21bountyDecisions } from "../data/alliance/season2.1/bountyDecisions.json";

import { tacticalDecisions as allianceSeason1tacticalDecisions } from "../data/alliance/season1/tacticalDecisions.json";
import { tacticalDecisions as allianceSeason2tacticalDecisions } from "../data/alliance/season2/tacticalDecisions.json";
import { tacticalDecisions as allianceSeason21tacticalDecisions } from "../data/alliance/season2.1/tacticalDecisions.json";

import { advancedCalculations as allianceSeason1advancedCalculations } from "../data/alliance/season1/advancedCalculations.json";
import { advancedCalculations as allianceSeason2advancedCalculations } from "../data/alliance/season2/advancedCalculations.json";
import { advancedCalculations as allianceSeason21advancedCalculations } from "../data/alliance/season2.1/advancedCalculations.json";

import { trophies as allianceSeason1trophies } from "../data/alliance/season1/trophies.json";
import { trophies as allianceSeason2trophies } from "../data/alliance/season2/trophies.json";
import { trophies as allianceSeason21trophies } from "../data/alliance/season2.1/trophies.json";

import { hiddenCore as allianceSeason1hiddenCore } from "../data/alliance/season1/hiddenCore.json";
import { hiddenCore as allianceSeason2hiddenCore } from "../data/alliance/season2/hiddenCore.json";
import { hiddenCore as allianceSeason21hiddenCore } from "../data/alliance/season2.1/hiddenCore.json";

export function getOperatorsBySeason(season: string) {
  switch (season) {
    case "1": {
      return allianceSeason1operators;
    }
    case "2": {
      return allianceSeason2operators;
    }
    case "2.1": {
      return allianceSeason21operators;
    }
    default: {
      return allianceSeason1operators;
    }
  }
}

export function getAlliancesBySeason(season: string) {
  switch (season) {
    case "1": {
      return allianceSeason1bonds;
    }
    case "2": {
      return allianceSeason2bonds;
    }
    case "2.1": {
      return allianceSeason21bonds;
    }
    default: {
      return allianceSeason1bonds;
    }
  }
}

export function getItemsBySeason(season: string) {
  switch (season) {
    case "1": {
      return allianceSeason1items;
    }
    case "2": {
      return allianceSeason2items;
    }
    case "2.1": {
      return allianceSeason21items;
    }
    default: {
      return allianceSeason1items;
    }
  }
}

export function getStrategiesBySeason(season: string) {
  switch (season) {
    case "1": {
      return allianceSeason1bands;
    }
    case "2": {
      return allianeSeason2bands;
    }
    case "2.1": {
      return allianceSeason21bands;
    }
    default: {
      return allianceSeason1bands;
    }
  }
}

export function getLeadersBySeason(season: string) {
  switch (season) {
    case "1": {
      return allianceSeason1leaders;
    }
    case "2": {
      return allianceSeason2leaders;
    }
    case "2.1": {
      return allianceSeason21leaders;
    }
    default: {
      return allianceSeason1leaders;
    }
  }
}

export function getTacticalTrainingBySeason(season: string) {
  switch (season) {
    case "1": {
      return allianceSeason1tacticalTraining;
    }
    case "2": {
      return allianceSeason2tacticalTraining;
    }
    case "2.1": {
      return allianceSeason21tacticalTraining;
    }
    default: {
      return allianceSeason1tacticalTraining;
    }
  }
}

export function getBountyDecisionsBySeason(season: string) {
  switch (season) {
    case "1": {
      return allianceSeason1bountyDecisions;
    }
    case "2": {
      return allianceSeason2bountyDecisions;
    }
    case "2.1": {
      return allianceSeason21bountyDecisions;
    }
    default: {
      return allianceSeason1bountyDecisions;
    }
  }
}

export function getTacticalDecisionsBySeason(season: string) {
  switch (season) {
    case "1": {
      return allianceSeason1tacticalDecisions;
    }
    case "2": {
      return allianceSeason2tacticalDecisions;
    }
    case "2.1": {
      return allianceSeason21tacticalDecisions;
    }
    default: {
      return allianceSeason1tacticalDecisions;
    }
  }
}

export function getAdvancedCalculationsBySeason(season: string) {
  switch (season) {
    case "1": {
      return allianceSeason1advancedCalculations;
    }
    case "2": {
      return allianceSeason2advancedCalculations;
    }
    case "2.1": {
      return allianceSeason21advancedCalculations;
    }
    default: {
      return allianceSeason1advancedCalculations;
    }
  }
}

export function getTrophiesBySeason(season: string): TrophyDto[] {
  switch (season) {
    case "1": {
      return allianceSeason1trophies;
    }
    case "2": {
      return allianceSeason2trophies;
    }
    case "2.1": {
      return allianceSeason21trophies;
    }
    default: {
      return allianceSeason1trophies;
    }
  }
}

export function getHiddenCoreBySeason(season: string) {
  switch (season) {
    case "1": {
      return allianceSeason1hiddenCore;
    }
    case "2": {
      return allianceSeason2hiddenCore;
    }
    case "2.1": {
      return allianceSeason21hiddenCore;
    }
    default: {
      return allianceSeason1hiddenCore;
    }
  }
}
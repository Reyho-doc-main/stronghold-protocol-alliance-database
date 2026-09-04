export type CalculationRoundDto = {
  round: string;
  standard: string;
  aPerilousSituation: string;
  desperateSituation: string;
  Ultimate_Simulation: string;
};

export type CalculationSimulationDto = {
  soloSimulation: CalculationRoundDto[];
  allianceSimulation: CalculationRoundDto[];
};

export type AdvancedCalculationsDto = {
  attackPowerBonus: CalculationSimulationDto;
  healthBonus: CalculationSimulationDto;
};

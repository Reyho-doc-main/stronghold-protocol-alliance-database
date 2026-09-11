export type MapInstallationSkillDto = {
  name: string;
  type: string;
  description: string;
  bullets?: string[];
};

export type MapInstallationDto = {
  name: string;
  level: number;
  faction?: string;
  hp: number;
  attackPower: number;
  defense: number;
  spellResistance: number;
  blockCount: number;
  attackRange?: boolean[];
  skills: MapInstallationSkillDto[];
  note?: string;
};

export type MapTerrainEffectDto = {
  title: string;
  description: string;
};

export type MapDto = {
  id: string;
  name: string;
  image: string;
  appearances?: string[];
  terrainEffect?: MapTerrainEffectDto;
  installation?: MapInstallationDto;
};

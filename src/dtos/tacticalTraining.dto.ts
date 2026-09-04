export type TacticalTrainingEnemyDto = {
  name: string;
  image: string;
  wikiLink: string;
};

export type TacticalTrainingDto = {
  id: string;
  name: string;
  image: string;
  enemies: TacticalTrainingEnemyDto[];
};

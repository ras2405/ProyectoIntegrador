export interface IText {
  text: string;
  type: string;
  user: string;
  projectName: string;
  timestamp: string;
  stage: string;
  tagAdventure: number;
  tagNature: number;
  tagMystery: number;
  tagFantasy: number;
  tagForest: number;
  tagJourney: number;
  tagDiscovery: number;
  tagMagic: number;
  tagLegends: number;
  tagWisdom: number;
}

export interface IChangeHistory {
  recordId: string;  // highlight id
  timestamp: string;
  oldStage: string;
  newStage: string;
  oldTag: string;
  newTag: string;
  user: string;
}

export interface ITag {
  tag: string;
  // color: string;
}

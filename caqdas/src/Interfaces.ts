export interface IText {
  text: string;
  type: string;
  user: string;
  projectName: string;
  timestamp: string;
  stage: string;
  tag1: number;
  tag2: number;
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

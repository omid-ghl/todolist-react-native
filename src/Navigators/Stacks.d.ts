export type StackParamList = {
  splash: undefined;
  create?: {
    title: string;
    creationDate: Date;
    editing: boolean;
  };
  home: undefined;
};

export type TStacks = keyof StackParamList;

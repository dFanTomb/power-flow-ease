export type DroppableLocation = {
  droppableId: string;
  index: number;
};

export type ItemType = {
  id: string;
  content: string;
};

export type State = {
  [key: string]: ItemType[];
};

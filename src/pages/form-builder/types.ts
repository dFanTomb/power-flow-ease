export type DroppableLocation = {
  droppableId: string;
  index: number;
};

export type RowItemType = {
  id: string;
  content: string;
};

export type State = {
  [key: string]: RowItemType[] | ItemType[];
};

export type Row = {
  id: string;
  items: never[];
};

export type ItemType = {
  id: string;
  content: string;
};

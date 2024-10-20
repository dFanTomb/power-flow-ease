export type DroppableLocation = {
  droppableId: string;
  index: number;
};

export type RowItemType = {
  id: string;
  content: string;
};

export type Rows = {
  [key: string]: RowItemType[];
};

export type Row = {
  id: string;
  items: never[];
};

export type TrashZoneProps = {
  isdraggingover: boolean;
};

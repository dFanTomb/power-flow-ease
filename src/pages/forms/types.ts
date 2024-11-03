export type DroppableLocation = {
  droppableId: string;
  index: number;
};

export type RowItemType = {
  id: string;
  content: string;
};

export type RowsType = {
  [key: string]: RowItemType[];
};

export type RowsProps = {
  rows: RowsType;
};

export type TrashZoneProps = {
  isdraggingover: boolean;
};

export type Form = {
  id: string;
  name: string;
  rows: RowsType;
};

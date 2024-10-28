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

export type RowsItemsProps = {
  rows: Rows;
};

export type TrashZoneProps = {
  isdraggingover: boolean;
};

export type Form = {
  id: string;
  name: string;
  rows: Rows;
};

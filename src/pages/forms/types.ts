import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';

export type DroppableLocation = {
  droppableId: string;
  index: number;
};

export type RowItemType = {
  index: number;
  id: string;
  content: string;
};

export type RowItemProps = {
  item: RowItemType;
  handleProps: DraggableProvidedDragHandleProps | null;
  isDragging: boolean;
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

export type AddFormProps = {
  open: boolean;
  handleClose: () => void;
  onSubmit: (value: string) => void;
};

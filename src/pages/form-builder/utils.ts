import { v4 as uuid } from 'uuid';
import { DroppableLocation, ItemType } from './types';

export const reorder = (row: ItemType[], startIndex: number, endIndex: number) => {
  const result = Array.from(row);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const copy = (
  source: ReadonlyArray<ItemType>,
  destination: ItemType[],
  droppableSource: DroppableLocation,
  droppableDestination: DroppableLocation,
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);

  const item = sourceClone[droppableSource.index];
  // console.log('item', item);

  if (!item) return destClone;
  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

export const move = (
  source: ItemType[],
  destination: ItemType[],
  droppableSource: DroppableLocation,
  droppableDestination: DroppableLocation,
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: Record<string, ItemType[]> = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const remove = (list: ItemType[], id: string): ItemType[] => {
  // console.log('REMOVE item with ID:', id);
  return list.filter((item) => item.id !== id);
};

import React from 'react';
import { v4 as uuid } from 'uuid';
import { DropResult } from '@hello-pangea/dnd';

import { DroppableLocation, RowItemType, RowsType } from './types';

export const reorder = (row: RowItemType[], startIndex: number, endIndex: number) => {
  const result = Array.from(row);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const copy = (
  source: ReadonlyArray<RowItemType>,
  destination: RowItemType[],
  droppableSource: DroppableLocation,
  droppableDestination: DroppableLocation,
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);

  const item = sourceClone[droppableSource.index];

  if (!item) return destClone;
  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

export const move = (
  source: RowItemType[],
  destination: RowItemType[],
  droppableSource: DroppableLocation,
  droppableDestination: DroppableLocation,
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: Record<string, RowItemType[]> = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const remove = (list: RowItemType[], id: string): RowItemType[] => {
  return list.filter((item) => item.id !== id);
};

export const cleanRows = (prevState: RowsType) => {
  const rowKeys = Object.keys(prevState);

  if (rowKeys.length === 1) return prevState;

  const newState = rowKeys
    .map((rowKey) => (prevState[rowKey].length > 0 ? { [rowKey]: prevState[rowKey] } : null))
    .filter((item): item is { [key: string]: RowItemType[] } => item !== null)
    .reduce((accumulator, currentValue) => ({ ...accumulator, ...currentValue }), {});

  return Object.keys(newState).length > 0 ? newState : prevState;
};

export const reorderRows = (
  rows: RowsType,
  setRows: React.Dispatch<React.SetStateAction<RowsType>>,
  sourceDroppableId: string,
  destinationDroppableId: string,
) => {
  if (destinationDroppableId === 'PLACEHOLDER_ROW') {
    // move sourceDroppableId to end of array rows
    const sourceRow = rows[sourceDroppableId];
    const newState = { ...rows };
    delete newState[sourceDroppableId];
    newState[uuid()] = sourceRow;
    setRows(newState);
    return;
  }

  if (destinationDroppableId === 'TRASH') {
    // remove row from array rows
    const newState = { ...rows };
    delete newState[sourceDroppableId];
    setRows(newState);
    return;
  }

  if (Object.keys(rows).includes(destinationDroppableId)) {
    // reorder rows so that row with sourceDroppableId and row with destinationDroppableId swap places
    const sourceRow = rows[sourceDroppableId];
    const destinationRow = rows[destinationDroppableId];
    const newState = { ...rows };
    newState[sourceDroppableId] = destinationRow;
    newState[destinationDroppableId] = sourceRow;
    setRows(newState);
    return;
  }
};

export const onDragEndHandler = (
  result: DropResult,
  rows: RowsType,
  setRows: React.Dispatch<React.SetStateAction<RowsType>>,
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
  ITEMS: RowItemType[],
) => {
  const { source, destination, draggableId } = result;

  setIsDragging(false);

  if (!destination) return;

  if (Object.keys(rows).includes(draggableId)) {
    reorderRows(rows, setRows, source.droppableId, destination.droppableId);
    return;
  }

  if (source.droppableId === 'ITEMS' && destination.droppableId === 'TRASH') return;

  if (destination.droppableId === 'TRASH') {
    setRows((prevState: RowsType) => {
      const newState = { ...prevState };
      const currentRowItems = remove(prevState[source.droppableId], prevState[source.droppableId][source.index].id);

      if (currentRowItems.length === 0) {
        delete newState[source.droppableId];
      } else {
        newState[source.droppableId] = currentRowItems;
      }

      return cleanRows(newState);
    });
    return;
  }

  if (destination.droppableId === 'PLACEHOLDER_ROW') {
    if (source.droppableId === 'ITEMS') {
      setRows((prevState: RowsType) =>
        cleanRows({
          ...prevState,
          [uuid()]: copy(Object.values(ITEMS), [], source, destination),
        }),
      );

      return;
    }

    setRows((prevState: RowsType) => {
      const newState = { ...prevState };
      const currentRowItems = remove(prevState[source.droppableId], prevState[source.droppableId][source.index].id);

      newState[source.droppableId] = currentRowItems;
      newState[uuid()] = copy([prevState[source.droppableId][source.index]], [], source, destination);

      return cleanRows(newState);
    });
    return;
  }

  switch (source.droppableId) {
    case destination.droppableId:
      setRows((prevState: RowsType) =>
        cleanRows({
          ...prevState,
          [destination.droppableId]: reorder(prevState[source.droppableId], source.index, destination.index),
        }),
      );
      break;

    case 'ITEMS':
      setRows((prevState: RowsType) =>
        cleanRows({
          ...prevState,
          [destination.droppableId]: copy(
            Object.values(ITEMS),
            prevState[destination.droppableId],
            source,
            destination,
          ),
        }),
      );
      break;

    default:
      setRows((prevState: RowsType) =>
        cleanRows({
          ...prevState,
          ...move(prevState[source.droppableId], prevState[destination.droppableId], source, destination),
        }),
      );
      break;
  }
};

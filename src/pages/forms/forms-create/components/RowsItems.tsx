import { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { v4 as uuid } from 'uuid';
import { Box } from '@mui/material';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';

import { Row, Handle, Notice, NewRow } from './styled-components';
import { Rows, RowItemType } from '../../types';
import { RowItem } from './RowItem';

const [rows, setRows] = useState<Rows>({ [uuid()]: [] });

export const cleanRows = (prevState: Rows) => {
  const rowKeys = Object.keys(prevState);

  if (rowKeys.length === 1) return prevState;

  const newState = rowKeys
    .map((rowKey) => (prevState[rowKey].length > 0 ? { [rowKey]: prevState[rowKey] } : null))
    .filter((item): item is { [key: string]: RowItemType[] } => item !== null)
    .reduce((accumulator, currentValue) => ({ ...accumulator, ...currentValue }), {});

  return Object.keys(newState).length > 0 ? newState : prevState;
};

export const reorderRows = (sourceDroppableId: string, destinationDroppableId: string) => {
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

export const RowsItems = () => {
  return (
    <Box>
      {Object.keys(rows).map((row, index) => (
        <Droppable key={index} droppableId={row}>
          {(provided, snapshot) => (
            <Row ref={provided.innerRef} isdraggingover={snapshot.isDraggingOver}>
              <Draggable key={row} draggableId={row} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Handle>
                      <DragIndicatorOutlinedIcon
                        sx={{
                          fontSize: '36px',
                          margin: '0 auto',
                          color: 'gray',
                          height: '53px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          boxShadow: '1px 1px 0px lightgray',
                        }}
                      />
                    </Handle>
                  </div>
                )}
              </Draggable>
              {rows[row].length
                ? rows[row].map((rowItem: { id: string; content: string }, itemIndex: number) => {
                    console.log(`rowItem = ${rowItem.id}, index = ${itemIndex}`);

                    return (
                      <Draggable key={rowItem.id} draggableId={rowItem.id} index={itemIndex}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              width: '100%',
                              ...provided.draggableProps.style,
                            }}
                          >
                            <RowItem handleProps={provided.dragHandleProps} item={rowItem} />
                          </div>
                        )}
                      </Draggable>
                    );
                  })
                : !provided.placeholder && <Notice>Drop items here</Notice>}
              {provided.placeholder}
            </Row>
          )}
        </Droppable>
      ))}
      <Box>
        <Droppable droppableId='PLACEHOLDER_ROW'>
          {(provided, snapshot) => (
            <NewRow
              ref={provided.innerRef}
              isdraggingover={snapshot.isDraggingOver}
              hasItems={Object.keys(rows).length > 0}
            >
              {snapshot.isDraggingOver ? true : Object.keys(rows).length === 0}
              {provided.placeholder}
            </NewRow>
          )}
        </Droppable>
      </Box>
    </Box>
  );
};

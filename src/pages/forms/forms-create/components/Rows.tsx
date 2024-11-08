import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Box } from '@mui/material';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';

import { Row, Handle, Notice, NewRow } from './styled-components';
import { RowItem } from './RowItem';
import { RowsProps } from '../../types';

export const Rows = ({ rows }: RowsProps) => {
  return (
    <Box>
      {Object.keys(rows).map((row, index) => (
        <Droppable key={index} droppableId={row}>
          {(provided, snapshot) => {
            return (
              <Row ref={provided.innerRef} isdraggingover={snapshot.isDraggingOver} {...provided.droppableProps}>
                <Draggable key={row} draggableId={row} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{ display: 'flex', alignItems: 'center', width: '100%', ...provided.draggableProps.style }}
                    >
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
                      {rows[row].length ? (
                        rows[row].map((rowItem: { id: string; content: string }, itemIndex: number) => {
                          return (
                            <Draggable key={rowItem.id} draggableId={rowItem.id} index={itemIndex}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    margin: '0 2px',
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  <RowItem
                                    handleProps={provided.dragHandleProps}
                                    item={{ ...rowItem, index: itemIndex }}
                                    isDragging={snapshot.isDragging}
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        })
                      ) : (
                        <Notice>Drop your items here</Notice>
                      )}
                    </div>
                  )}
                </Draggable>
                {provided.placeholder}
              </Row>
            );
          }}
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

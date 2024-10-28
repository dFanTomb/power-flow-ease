import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Box } from '@mui/material';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';

import { Row, Handle, Notice, NewRow } from './styled-components';
import { RowItem } from './RowItem';
import { RowsItemsProps } from '../../types';

export const RowsItems = ({ rows }: RowsItemsProps) => {
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

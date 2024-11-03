import React from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { ITEMS } from '../../constants.ts';
import { Kiosk, Item, Clone } from './styled-components.ts';

export const Items = () => {
  return (
    <Droppable droppableId='ITEMS' isDropDisabled={true}>
      {(provided, snapshot) => (
        <Kiosk ref={provided.innerRef} isdraggingover={snapshot.isDraggingOver}>
          {Object.keys(ITEMS).map((key, index) => {
            const typedKey = key as keyof typeof ITEMS;

            return (
              <Draggable key={ITEMS[typedKey].id} draggableId={ITEMS[typedKey].id} index={index}>
                {(provided, snapshot) => {
                  return (
                    <React.Fragment>
                      <Item
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isdragging={snapshot.isDragging}
                        style={provided.draggableProps.style}
                      >
                        {ITEMS[typedKey].content}
                      </Item>
                      {snapshot.isDragging && <Clone isdragging={snapshot.isDragging}>{ITEMS[typedKey].content}</Clone>}
                    </React.Fragment>
                  );
                }}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </Kiosk>
      )}
    </Droppable>
  );
};

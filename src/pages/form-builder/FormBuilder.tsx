import React, { useCallback, useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import { Add } from '@mui/icons-material';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

import { PageHeader } from '../../components/page-header/PageHeader.tsx';
import { AddTemplate } from './components/AddTemplate.tsx';
import { Content, Item, Clone, Handle, Kiosk, ListContainer, Notice } from './components/styled-components.ts';
import { ITEMS } from './constants.ts';
import { IconResolver } from './IconResolver.tsx';
import { move, copy, reorder } from './utils';
import { State } from './types';

export default function FormBuilder() {
  const [addTemplateModalOpen, setAddTemplateModalOpen] = useState<boolean>(false);

  const handleAddTemplate = () => {};
  const handleAddTemplateModalOpen = useCallback(() => setAddTemplateModalOpen(true), []);
  const handleAddTemplateModalClose = useCallback(() => setAddTemplateModalOpen(false), []);

  const [state, setState] = useState<State>({
    [uuid()]: [],
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        setState((prevState: State) => ({
          ...prevState,
          [destination.droppableId]: reorder(prevState[source.droppableId], source.index, destination.index),
        }));
        break;
      case 'ITEMS':
        setState((prevState: State) => ({
          ...prevState,
          [destination.droppableId]: copy(ITEMS, prevState[destination.droppableId], source, destination),
        }));
        break;
      default:
        setState((prevState: State) => ({
          ...prevState,
          ...move(prevState[source.droppableId], prevState[destination.droppableId], source, destination),
        }));
        break;
    }
  };

  // For future create list component
  // const addList = () => {
  //   setState((prevState: State) => ({ ...prevState, [uuid()]: [] }));
  // };

  return (
    <Container>
      <PageHeader
        title={'Form Builder'}
        breadcrumbs={['Form Builder']}
        renderRight={
          <Button variant='contained' color='primary' onClick={handleAddTemplateModalOpen} startIcon={<Add />}>
            Add Template
          </Button>
        }
      />
      <AddTemplate open={addTemplateModalOpen} handleClose={handleAddTemplateModalClose} onSubmit={handleAddTemplate} />

      <DragDropContext onDragEnd={onDragEnd}>
        <Content>
          <Droppable droppableId='ITEMS' isDropDisabled={true}>
            {(provided, snapshot) => (
              <Kiosk ref={provided.innerRef} isdraggingover={snapshot.isDraggingOver}>
                {ITEMS.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <React.Fragment>
                        <Item
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          isdragging={snapshot.isDragging}
                          style={provided.draggableProps.style}
                        >
                          {item.content}
                        </Item>
                        {snapshot.isDragging && <Clone isdragging={snapshot.isDragging}>{item.content}</Clone>}
                      </React.Fragment>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Kiosk>
            )}
          </Droppable>
          <Box>
            {Object.keys(state).map((list, index) => (
              <Droppable key={index} droppableId={list}>
                {(provided, snapshot) => (
                  <ListContainer ref={provided.innerRef} isdraggingover={snapshot.isDraggingOver}>
                    {state[list].length
                      ? state[list].map((listItem: { id: string; content: string }, index: number) => (
                          <Draggable key={listItem.id} draggableId={listItem.id} index={index}>
                            {(provided, snapshot) => (
                              <Item
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                isdragging={snapshot.isDragging}
                                style={provided.draggableProps.style}
                              >
                                <Handle {...provided.dragHandleProps}>{IconResolver(listItem.content)}</Handle>
                                {listItem.content}
                              </Item>
                            )}
                          </Draggable>
                        ))
                      : !provided.placeholder && <Notice>Drop items here</Notice>}
                    {provided.placeholder}
                  </ListContainer>
                )}
              </Droppable>
            ))}
          </Box>
        </Content>
      </DragDropContext>
    </Container>
  );
}

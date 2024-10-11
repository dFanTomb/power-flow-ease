import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import { Add } from '@mui/icons-material';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

import { PageHeader } from '../../components/page-header/PageHeader.tsx';
import { AddTemplate } from './components/AddTemplate.tsx';
import {
  Content,
  Item,
  Clone,
  Kiosk,
  Notice,
  Row,
  TrashZone,
  DeleteIcon,
  NewRow,
} from './components/styled-components.ts';
import { copy, move, reorder, remove } from './utils.ts';
import { ITEMS } from './constants.ts';
import { RowItem } from './components/RowItem.tsx';
import { ItemType, RowItemType, State } from './types';

export default function FormBuilder() {
  const [addTemplateModalOpen, setAddTemplateModalOpen] = useState<boolean>(false);

  const handleAddTemplate = () => {};
  const handleAddTemplateModalOpen = useCallback(() => setAddTemplateModalOpen(true), []);
  const handleAddTemplateModalClose = useCallback(() => setAddTemplateModalOpen(false), []);

  const [rows, setRows] = useState<State>({ [uuid()]: [] });

  useEffect(() => {
    setRows((prevState) => {
      const rowKeys = Object.keys(prevState);
      console.log('rowKeys of rows:', rowKeys);

      if (rowKeys.length === 1) return prevState;

      const newState = rowKeys
        .map((rowKey) => (prevState[rowKey].length > 0 ? { [rowKey]: prevState[rowKey] } : null))
        .filter((item): item is { [key: string]: RowItemType[] | ItemType[] } => item !== null)
        .reduce((accumulator, currentValue) => ({ ...accumulator, ...currentValue }), {});

      return Object.keys(newState).length > 0 ? newState : prevState;
    });
  }, [Object.keys(rows).length]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === 'ITEMS' && destination.droppableId === 'TRASH') return;

    if (destination.droppableId === 'TRASH') {
      setRows((prevState: State) => {
        const newState = { ...prevState };
        const currentRowItems = remove(prevState[source.droppableId], prevState[source.droppableId][source.index].id);

        if (currentRowItems.length === 0) {
          delete newState[source.droppableId];
        } else {
          newState[source.droppableId] = currentRowItems;
        }
        return newState;
      });
      return;
    }

    if (destination.droppableId === 'PLACEHOLDER_ROW') {
      console.log('Create new row with ID:', destination.droppableId === 'PLACEHOLDER_ROW');
      if (source.droppableId === 'ITEMS') {
        setRows((prevState: State) => ({
          ...prevState,
          [uuid()]: copy(Object.values(ITEMS), [], source, destination),
        }));
        return;
      }
      setRows((prevState: State) => {
        const newState = { ...prevState };
        const currentRowItems = remove(prevState[source.droppableId], prevState[source.droppableId][source.index].id);

        newState[source.droppableId] = currentRowItems;
        newState[uuid()] = copy([prevState[source.droppableId][source.index]], [], source, destination);
        return newState;
      });
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        setRows((prevState: State) => ({
          ...prevState,
          [destination.droppableId]: reorder(prevState[source.droppableId], source.index, destination.index),
        }));

        break;

      case 'ITEMS':
        setRows((prevState: State) => ({
          ...prevState,
          [destination.droppableId]: copy(
            Object.values(ITEMS),
            prevState[destination.droppableId],
            source,
            destination,
          ),
        }));
        break;

      default:
        setRows((prevState: State) => ({
          ...prevState,
          ...move(prevState[source.droppableId], prevState[destination.droppableId], source, destination),
        }));
        break;
    }
  };

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
                {Object.keys(ITEMS).map((key, index) => {
                  const typedKey = key as keyof typeof ITEMS;
                  return (
                    <Draggable key={ITEMS[typedKey].id} draggableId={ITEMS[typedKey].id} index={index}>
                      {(provided, snapshot) => (
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
                          {snapshot.isDragging && (
                            <Clone isdragging={snapshot.isDragging}>{ITEMS[typedKey].content}</Clone>
                          )}
                        </React.Fragment>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Kiosk>
            )}
          </Droppable>
          <Box>
            {Object.keys(rows).map((row, index) => (
              <Droppable key={index} droppableId={row}>
                {(provided, snapshot) => (
                  <Row ref={provided.innerRef} isdraggingover={snapshot.isDraggingOver}>
                    {rows[row].length
                      ? rows[row].map((rowItem: { id: string; content: string }, index: number) => (
                          <Draggable key={rowItem.id} draggableId={rowItem.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                style={{
                                  width: '100%',
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <RowItem handleProps={provided.dragHandleProps} item={rowItem} />
                              </div>
                            )}
                          </Draggable>
                        ))
                      : !provided.placeholder && <Notice>Drop items here</Notice>}
                    {provided.placeholder}
                  </Row>
                )}
              </Droppable>
            ))}
            <Box>
              <Droppable droppableId='PLACEHOLDER_ROW'>
                {(provided, snapshot) => (
                  <NewRow ref={provided.innerRef} isdraggingover={snapshot.isDraggingOver}>
                    {snapshot.isDraggingOver}
                    {provided.placeholder}
                  </NewRow>
                )}
              </Droppable>
            </Box>
          </Box>
        </Content>
        <Droppable droppableId='TRASH'>
          {(provided, snapshot) => (
            <TrashZone ref={provided.innerRef} isdraggingover={snapshot.isDraggingOver}>
              {snapshot.isDraggingOver && <DeleteIcon />}
              {provided.placeholder}
            </TrashZone>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}

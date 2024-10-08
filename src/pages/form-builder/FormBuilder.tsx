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
    setRows((prevRow) => {
      const rowKeys = Object.keys(prevRow);

      if (rowKeys.length === 1) return prevRow;

      const newState = rowKeys
        .map((rowKey) => (prevRow[rowKey].length > 0 ? { [rowKey]: prevRow[rowKey] } : null))
        .filter((item): item is { [key: string]: RowItemType[] | ItemType[] } => item !== null)
        .reduce((accumulator, currentValue) => ({ ...accumulator, ...currentValue }), {});

      return Object.keys(newState).length > 0 ? newState : prevRow;
    });
  }, [rows]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === 'ITEMS' && destination.droppableId === 'TRASH') return;

    if (destination.droppableId === 'TRASH') {
      setRows((prevRow: State) => {
        const newState = { ...prevRow };
        const currentRowItems = remove(prevRow[source.droppableId], prevRow[source.droppableId][source.index].id);

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
      if (source.droppableId === 'ITEMS') {
        setRows((prevRow: State) => ({
          ...prevRow,
          [uuid()]: copy(Object.values(ITEMS), [], source, destination),
        }));
        return;
      }
      setRows((prevRow: State) => {
        const newState = { ...prevRow };
        const currentRowItems = remove(prevRow[source.droppableId], prevRow[source.droppableId][source.index].id);

        newState[source.droppableId] = currentRowItems;
        newState[uuid()] = copy([prevRow[source.droppableId][source.index]], [], source, destination);
        return newState;
      });
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        setRows((prevRow: State) => ({
          ...prevRow,
          [destination.droppableId]: reorder(prevRow[source.droppableId], source.index, destination.index),
        }));

        break;

      case 'ITEMS':
        setRows((prevRow: State) => ({
          ...prevRow,
          [destination.droppableId]: copy(Object.values(ITEMS), prevRow[destination.droppableId], source, destination),
        }));
        break;

      default:
        setRows((prevRow: State) => ({
          ...prevRow,
          ...move(prevRow[source.droppableId], prevRow[destination.droppableId], source, destination),
        }));
        break;
    }
    console.log('rows:', rows);
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

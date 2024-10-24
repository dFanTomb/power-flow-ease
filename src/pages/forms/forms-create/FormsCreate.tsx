import { useCallback, useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

import { PageHeader } from '../../../components/page-header/PageHeader.tsx';
import { AddTemplate } from './components/AddTemplate.tsx';
import { RowItem } from './components/RowItem.tsx';
import { Items } from './components/Items.tsx';
import { Content, Notice, Row, TrashZone, DeleteIcon, NewRow, Handle } from './components/styled-components.ts';
import { copy, move, reorder, remove } from '../utils.ts';
import { ITEMS } from '../constants.ts';
import { RowItemType, Rows } from '../types.ts';

export default function FormsCreate() {
  const [saveFormModalOpen, setSaveFormModalOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<Rows>({ [uuid()]: [] });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleSaveForm = () => {};
  const handleSaveFormModalOpen = useCallback(() => setSaveFormModalOpen(true), []);
  const handleSaveFormModalClose = useCallback(() => setSaveFormModalOpen(false), []);

  const onDragStart = () => {
    setIsDragging(true);
  };

  const cleanRows = (prevState: Rows) => {
    const rowKeys = Object.keys(prevState);

    if (rowKeys.length === 1) return prevState;

    const newState = rowKeys
      .map((rowKey) => (prevState[rowKey].length > 0 ? { [rowKey]: prevState[rowKey] } : null))
      .filter((item): item is { [key: string]: RowItemType[] } => item !== null)
      .reduce((accumulator, currentValue) => ({ ...accumulator, ...currentValue }), {});

    return Object.keys(newState).length > 0 ? newState : prevState;
  };

  const reorderRows = (sourceDroppableId: string, destinationDroppableId: string) => {
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

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    setIsDragging(false);

    if (!destination) return;

    if (Object.keys(rows).includes(draggableId)) {
      reorderRows(source.droppableId, destination.droppableId);
      return;
    }

    if (source.droppableId === 'ITEMS' && destination.droppableId === 'TRASH') return;

    if (destination.droppableId === 'TRASH') {
      setRows((prevState: Rows) => {
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
        setRows((prevState: Rows) =>
          cleanRows({
            ...prevState,
            [uuid()]: copy(Object.values(ITEMS), [], source, destination),
          }),
        );

        return;
      }

      setRows((prevState: Rows) => {
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
        setRows((prevState: Rows) =>
          cleanRows({
            ...prevState,
            [destination.droppableId]: reorder(prevState[source.droppableId], source.index, destination.index),
          }),
        );
        break;

      case 'ITEMS':
        setRows((prevState: Rows) =>
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
        setRows((prevState: Rows) =>
          cleanRows({
            ...prevState,
            ...move(prevState[source.droppableId], prevState[destination.droppableId], source, destination),
          }),
        );
        break;
    }
  };

  return (
    <Container>
      <PageHeader
        title={'Create'}
        breadcrumbs={['Create a Form']}
        renderRight={
          <Button variant='contained' color='primary' onClick={handleSaveFormModalOpen}>
            Save
          </Button>
        }
      />
      <AddTemplate open={saveFormModalOpen} handleClose={handleSaveFormModalClose} onSubmit={handleSaveForm} />
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Content>
          <Items />
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
        </Content>
        <Droppable droppableId='TRASH'>
          {(provided, snapshot) => (
            <TrashZone ref={provided.innerRef} isdraggingover={snapshot.isDraggingOver}>
              {isDragging && <DeleteIcon isdraggingover={snapshot.isDraggingOver} />}
              {provided.placeholder}
            </TrashZone>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}

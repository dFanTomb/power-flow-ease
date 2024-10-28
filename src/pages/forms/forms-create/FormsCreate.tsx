import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { Button, Container } from '@mui/material';

import { PageHeader } from '../../../components/page-header/PageHeader.tsx';
import { AddForm } from './components/AddForm.tsx';
import { Items } from './components/Items.tsx';
import { RowsItems } from './components/RowsItems.tsx';
import { Content, TrashZone, DeleteIcon } from './components/styled-components.ts';
import { copy, move, reorder, remove } from '../utils.ts';
import { ITEMS } from '../constants.ts';
import { RowItemType, Rows } from '../types.ts';
import { addForm } from '../../../store/app/formSlice.ts';
import { routes } from '../../../contants/routes.ts';
import { useAppDispatch } from '../../../store/hooks.ts';

export default function FormsCreate() {
  const [saveFormModalOpen, setSaveFormModalOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<Rows>({ [uuid()]: [] });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSaveForm = (value: string) => {
    dispatch(addForm({ id: uuid(), name: value, rows: rows }));
    navigate(routes.formsList);
  };

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
      <AddForm open={saveFormModalOpen} handleClose={handleSaveFormModalClose} onSubmit={handleSaveForm} />
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Content>
          <Items />
          <RowsItems rows={rows} />
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

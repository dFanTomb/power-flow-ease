import { Button, Container, Stack } from '@mui/material';
import { PageHeader } from '../../components/page-header/PageHeader.tsx';
import { useState } from 'react';
import { Save } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../contants/routes.ts';
import { v4 as uuid } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { selectCurrentForm } from '../../store/app/formSlice.ts';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { copy, move, reorder, remove } from './utils.ts';
import { Content, DeleteIcon, TrashZone } from '../form-builder/components/styled-components.ts';
import { Items } from './forms-create/components/Items.tsx';
import { RowsItems } from './forms-create/components/RowsItems.tsx';
import { RowItemType, Rows } from './types.ts';
import { ITEMS } from './constants.ts';
import { editForm } from '../../store/app/formSlice.ts';

export default function JobsEdit() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const form = useAppSelector(selectCurrentForm);

  if (!form) {
    navigate(routes.formsList);
    return null;
  }

  const [rows, setRows] = useState<Rows>(form?.rows);

  const handleSaveForm = () => {
    dispatch(editForm({ ...form, rows }));
    navigate(routes.formsList);
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
        title={'Edit Form'}
        breadcrumbs={['Forms', 'Edit']}
        renderRight={
          <Stack direction={'row'} justifyContent={'flex-end'} spacing={2}>
            <Button variant={'outlined'} color={'secondary'} onClick={() => navigate(routes.formsList)}>
              Cancel
            </Button>
            <Button startIcon={<Save />} variant={'contained'} onClick={handleSaveForm}>
              Save
            </Button>
          </Stack>
        }
      />
      <DragDropContext onDragEnd={onDragEnd} onDragStart={() => setIsDragging(true)}>
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

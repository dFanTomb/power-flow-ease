import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { Button, Container } from '@mui/material';

import { routes } from '../../../contants/routes.ts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { PageHeader } from '../../../components/page-header/PageHeader.tsx';
import { ITEMS } from '../constants.ts';
import { RowsType } from '../types.ts';
import { AddForm } from './components/AddForm.tsx';
import { Items } from './components/Items.tsx';
import { Rows } from './components/Rows.tsx';
import { Content, TrashZone, DeleteIcon } from './components/styled-components.ts';
import { onDragEndHandler } from '../utils.ts';
import { addForm } from '../../../store/app/formSlice.ts';

export default function FormsCreate() {
  const [saveFormModalOpen, setSaveFormModalOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<RowsType>({ [uuid()]: [] });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const forms = useAppSelector((state) => state.form.forms);

  const handleSaveForm = (value: string) => {
    if (!value.trim()) {
      setErrorMessage('Name is required.');
    } else {
      const isDuplicate = forms.some((form) => form.name === value);

      if (isDuplicate) {
        setErrorMessage('Form with the same name already exists.');
      } else {
        dispatch(addForm({ id: uuid(), name: value, rows: rows }));
        navigate(routes.formsList);
      }
    }
  };

  const handleSaveFormModalOpen = useCallback(() => setSaveFormModalOpen(true), []);
  const handleSaveFormModalClose = useCallback(() => setSaveFormModalOpen(false), []);

  const onDragEnd = (result: DropResult) => {
    onDragEndHandler(result, rows, setRows, setIsDragging, Object.values(ITEMS));
  };

  return (
    <Container>
      <PageHeader
        title={'Create Form'}
        breadcrumbs={['Create a Form']}
        renderRight={
          <Button variant='contained' color='primary' onClick={handleSaveFormModalOpen}>
            Save
          </Button>
        }
      />
      <AddForm
        open={saveFormModalOpen}
        handleClose={handleSaveFormModalClose}
        onSubmit={handleSaveForm}
        errorMessage={errorMessage}
      />
      <DragDropContext onDragEnd={onDragEnd} onDragStart={() => setIsDragging(true)}>
        <Content>
          <Items />
          <Rows rows={rows} />
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

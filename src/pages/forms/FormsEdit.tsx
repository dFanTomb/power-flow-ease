import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { Button, Container, Stack, TextField } from '@mui/material';
import { Save } from '@mui/icons-material';

import { routes } from '../../contants/routes.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { PageHeader } from '../../components/page-header/PageHeader.tsx';
import { ITEMS } from './constants.ts';
import { RowsType } from './types.ts';
import { Items } from './forms-create/components/Items.tsx';
import { Rows } from './forms-create/components/Rows.tsx';
import { Content, TrashZone, DeleteIcon } from '../forms/forms-create/components/styled-components.ts';
import { onDragEndHandler } from './utils.ts';
import { editForm, selectCurrentForm } from '../../store/app/formSlice.ts';

export default function FormsEdit() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const form = useAppSelector(selectCurrentForm);
  const forms = useAppSelector((state) => state.form.forms);

  useEffect(() => {
    if (!form) {
      navigate(routes.formsList);
    }
  }, [navigate, form]);

  const [rows, setRows] = useState<RowsType>(form?.rows || {});
  const [errorMessage, setErrorMessage] = useState('');

  const handleSaveForm = () => {
    if (!form?.name?.trim()) {
      setErrorMessage('Name is required');
    } else {
      const isDuplicate = forms.some((existingForm) => existingForm.name === form.name && existingForm.id !== form.id);

      if (isDuplicate) {
        setErrorMessage('Form with the same name already exists');
      } else {
        dispatch(editForm({ ...form, rows }));
        navigate(routes.formsList);
      }
    }
  };

  const onDragEnd = (result: DropResult) => {
    onDragEndHandler(result, rows, setRows, setIsDragging, Object.values(ITEMS));
  };

  return (
    <Container>
      <PageHeader
        title={'Edit Form'}
        breadcrumbs={['Forms', 'Edit']}
        renderRight={
          <Stack
            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', height: '37px', gap: '10px' }}
          >
            <TextField
              label='Form Name'
              value={form?.name || ''}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (form?.id) {
                  dispatch(editForm({ ...form, name: event.target.value }));
                  setErrorMessage('');
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSaveForm();
                }
              }}
              error={!!errorMessage}
              helperText={errorMessage}
              size='small'
            />
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

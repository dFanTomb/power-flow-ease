import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostAdd } from '@mui/icons-material';
import { CardContent, Typography, List, Container, Stack, Pagination, Button } from '@mui/material';

import { routes } from '../../contants/routes.ts';
import { PageHeader } from '../../components/page-header/PageHeader.tsx';
import { Form } from './types.ts';
import { useAppSelector, useAppDispatch } from '../../store/hooks.ts';
import { addCurrentFormId, deleteForm, setCurrentPage } from '../../store/app/formSlice.ts';
import { CardWrapper, DeleteIcon } from './forms-create/components/styled-components.ts';

export default function FormsList() {
  const forms = useAppSelector((state) => state.form.forms);
  const currentPage = useAppSelector((state) => state.form.currentPage);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formsPerPage = 5;
  const totalPages = Math.ceil(forms.length / formsPerPage);
  const currentForms = forms.slice((currentPage - 1) * formsPerPage, currentPage * formsPerPage);

  useEffect(() => {
    dispatch(addCurrentFormId(''));
  }, []);

  const handleFormClick = useCallback(
    (formId: string) => {
      dispatch(addCurrentFormId(formId));
      navigate(`${routes.formsEdit}?formId=${formId}`);
    },
    [navigate],
  );

  const handleDeleteForm = useCallback(
    (formId: string) => {
      dispatch(deleteForm(formId));
    },
    [dispatch],
  );

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleCreateForm = () => {
    const lastPage = Math.ceil((forms.length + 1) / formsPerPage);
    dispatch(setCurrentPage(lastPage));
    navigate(routes.formsCreate);
  };

  return (
    <Container maxWidth={'lg'}>
      <PageHeader
        title={'List'}
        breadcrumbs={['Forms', 'List']}
        renderRight={
          <Button variant={'contained'} startIcon={<PostAdd />} onClick={handleCreateForm}>
            Create
          </Button>
        }
      />
      <List sx={{ marginTop: 2 }}>
        {currentForms.length ? (
          currentForms.map((form: Form, index: number) => (
            <CardWrapper key={index} onClick={() => handleFormClick(form.id)}>
              <CardContent className='card-wrapper'>
                <Stack direction={'row'} justifyContent={'space-between'}>
                  <Stack>
                    <Typography variant='h6' component={'h2'}>
                      {form.name}
                    </Typography>
                  </Stack>
                  <Stack>
                    <DeleteIcon
                      onClick={() => handleDeleteForm(form.id)}
                      sx={{
                        justifyContent: 'flex-end',
                        position: 'unset',
                        transition: 'color 0.3',
                        '&:hover': { color: 'lightgray' },
                      }}
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </CardWrapper>
          ))
        ) : (
          <Typography variant='h5' component={'h2'} sx={{ m: 1 }}>
            Your list of forms is empty. You can create a form.
          </Typography>
        )}
      </List>
      <Stack alignItems={'center'} sx={{ position: 'fixed', bottom: '4%', right: '44%' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant='outlined'
          shape='rounded'
        />
      </Stack>
    </Container>
  );
}

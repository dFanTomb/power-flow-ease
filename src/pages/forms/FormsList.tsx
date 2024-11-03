import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostAdd } from '@mui/icons-material';
import { CardContent, Typography, List, Container, Stack, Pagination, Button } from '@mui/material';

import { routes } from '../../contants/routes.ts';
import { PageHeader } from '../../components/page-header/PageHeader.tsx';
import { Form } from './types.ts';
import { useAppSelector, useAppDispatch } from '../../store/hooks.ts';
import { addCurrentFormId } from '../../store/app/formSlice.ts';
import { CardWrapper } from './forms-create/components/styled-components.ts';

export default function FormsList() {
  const forms = useAppSelector((state) => state.form.forms);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  return (
    <Container maxWidth={'lg'}>
      <PageHeader
        title={'List'}
        breadcrumbs={['Forms', 'List']}
        renderRight={
          <Button variant={'contained'} startIcon={<PostAdd />} onClick={() => navigate(routes.formsCreate)}>
            Create
          </Button>
        }
      />
      <List sx={{ marginTop: 2 }}>
        {forms.map((form: Form, index: number) => (
          <CardWrapper key={index} onClick={() => handleFormClick(form.id)}>
            <CardContent>
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography variant='h6' component={'h2'}>
                  {form.name}
                </Typography>
              </Stack>
            </CardContent>
          </CardWrapper>
        ))}
      </List>

      <Stack alignItems={'center'}>
        <Pagination count={10} variant='outlined' shape='rounded' />
      </Stack>
    </Container>
  );
}

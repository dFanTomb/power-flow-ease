import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { PostAdd } from '@mui/icons-material';
import { Card, CardContent, Typography, List, Container, Stack, Pagination, Button } from '@mui/material';

import { routes } from '../../contants/routes.ts';
import { PageHeader } from '../../components/page-header/PageHeader.tsx';
import { Form } from './types.ts';
import { useAppSelector } from '../../store/hooks.ts';

const CardWrapper = styled(Card)(({ theme }) => ({
  marginBottom: 10,
  cursor: 'pointer',
  transition: theme.transitions.create(['box-shadow', 'background-color'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    boxShadow: theme.shadows[15],
    backgroundColor: theme.palette.grey[50],
  },
}));

export default function FormsList() {
  const forms = useAppSelector((state) => state.form.forms);
  const navigate = useNavigate();

  const handleFormClick = useCallback(
    (formId: string) => {
      console.log('formId:', formId);
      navigate(routes.formsEdit);
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

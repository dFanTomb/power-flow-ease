import { Button, Container, Stack } from '@mui/material';
import { PageHeader } from '../../../components/page-header/PageHeader.tsx';
import { useCallback, useRef } from 'react';
import { TemplatesForm } from '../../../widgets/templates/template-form/TemplatesForm.tsx';
import { routes } from '../../../contants/routes.ts';
import { useNavigate } from 'react-router-dom';
import { TemplatesFormSchema } from '../../../widgets/templates/template-form/formSchema.ts';

export default function TemplatesCreate() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();

  const handleCreatePost = useCallback((data: TemplatesFormSchema) => {
    console.log(data);
  }, []);

  const handlePublish = () => {
    formRef.current && formRef.current?.requestSubmit();
    console.log('Publish');
  };

  return (
    <Container>
      <PageHeader
        title={'Create Template'}
        breadcrumbs={['Templates', 'Create']}
        renderRight={
          <Stack direction={'row'} justifyContent={'flex-end'} spacing={2}>
            <Button variant={'outlined'} color={'secondary'} onClick={() => navigate(routes.templatesList)}>
              Cancel
            </Button>
            <Button variant={'contained'} onClick={handlePublish}>
              Publish
            </Button>
          </Stack>
        }
      />

      <TemplatesForm formRef={formRef} onSubmit={handleCreatePost} />
    </Container>
  );
}

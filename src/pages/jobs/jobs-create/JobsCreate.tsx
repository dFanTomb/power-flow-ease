import { Button, Container, Stack } from '@mui/material';
import { PageHeader } from '../../../components/page-header/PageHeader';
import { useCallback, useRef } from 'react';
import { JobsForm } from '../../../widgets/jobs/jobs-form/JobsForm.tsx';
import { routes } from '../../../contants/routes.ts';
import { useNavigate } from 'react-router-dom';
import { JobsFormSchema } from '../../../widgets/jobs/jobs-form/formSchema.ts';

export default function JobsCreate() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();

  const handleCreatePost = useCallback((data: JobsFormSchema) => {
    console.log(data);
  }, []);

  const handlePublish = () => {
    formRef.current && formRef.current?.requestSubmit();
    console.log('Publish');
  };

  return (
    <Container>
      <PageHeader
        title={'Create Job'}
        breadcrumbs={['Jobs', 'Create']}
        renderRight={
          <Stack direction={'row'} justifyContent={'flex-end'} spacing={2}>
            <Button variant={'outlined'} color={'secondary'} onClick={() => navigate(routes.jobsList)}>
              Cancel
            </Button>
            <Button variant={'contained'} onClick={handlePublish}>
              Publish
            </Button>
          </Stack>
        }
      />

      <JobsForm formRef={formRef} onSubmit={handleCreatePost} />
    </Container>
  );
}

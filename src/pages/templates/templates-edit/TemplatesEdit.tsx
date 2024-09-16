import { Button, Container, Stack } from '@mui/material';
import { PageHeader } from '../../../components/page-header/PageHeader.tsx';
import { useCallback, useRef } from 'react';
import { TemplatesForm } from '../../../widgets/templates/template-form/TemplatesForm.tsx';
import { useTemplatesDetails } from '../../../hooks/api/use-templates-details/useTemplatesDetails.ts';
import { Save } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../contants/routes.ts';
import { TemplatesFormSchema } from '../../../widgets/templates/template-form/formSchema.ts';

export default function TemplatesEdit() {
  const { data } = useTemplatesDetails();
  const formRef = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();

  const handleCreatePost = useCallback((data: TemplatesFormSchema) => {
    console.log(data);
  }, []);

  const handlePublish = () => {
    formRef.current && formRef.current?.requestSubmit();
    console.log('Publish');
  };

  const defaultValues: TemplatesFormSchema = {
    title: data.title,
    company: data.company,
    location: data.location,
    description: data.description,
    requirements: data.requirements,
    salary: data.salary,
  };

  return (
    <Container>
      <PageHeader
        title={data.title}
        breadcrumbs={['Templates', 'Edit']}
        renderRight={
          <Stack direction={'row'} justifyContent={'flex-end'} spacing={2}>
            <Button variant={'outlined'} color={'secondary'} onClick={() => navigate(routes.templatesList)}>
              Cancel
            </Button>
            <Button startIcon={<Save />} variant={'contained'} onClick={handlePublish}>
              Save
            </Button>
          </Stack>
        }
      />

      <TemplatesForm formRef={formRef} onSubmit={handleCreatePost} defaultValues={defaultValues} />
    </Container>
  );
}

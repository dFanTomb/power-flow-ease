import { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, List, Container, Stack, Chip, Pagination, Button } from '@mui/material';
import { useTemplates } from '../../../hooks/api/use-templates/useTemplates.ts';
import { PageHeader } from '../../../components/page-header/PageHeader.tsx';
import { routes } from '../../../contants/routes.ts';
import { useNavigate } from 'react-router-dom';
import { PostAdd } from '@mui/icons-material';
import { TemplatesSearch } from '../../../widgets/templates/templates-search/TemplatesSearch.tsx';

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

export default function TemplatesList() {
  const { data } = useTemplates();
  const navigate = useNavigate();

  const handleTemplateClick = useCallback(() => {
    navigate(routes.templatesDetails);
  }, [navigate]);

  if (!data) {
    return null;
  }

  const templatesTagsList = ({ tags }: { tags: string[] }) => {
    return tags.map((tag, index) => <Chip key={`${tag}_${index}`} label={tag} size={'small'} variant={'filled'} />);
  };

  return (
    <Container maxWidth={'lg'}>
      <PageHeader
        title={'Templates'}
        breadcrumbs={['Templates', 'List']}
        renderRight={
          <Button variant={'contained'} startIcon={<PostAdd />} onClick={() => navigate(routes.templatesCreate)}>
            Add
          </Button>
        }
      />
      <TemplatesSearch />
      <List sx={{ marginTop: 2 }}>
        {data.templates.map((template, index) => (
          <CardWrapper key={index} onClick={handleTemplateClick}>
            <CardContent>
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack>
                  <Typography variant='h6' component={'h2'}>
                    {template.title}
                  </Typography>
                  <Typography variant='subtitle1' component={'h3'}>
                    {template.company} - {template.location}
                  </Typography>
                </Stack>
                <Typography fontWeight={'fontWeightMedium'} variant='subtitle1'>
                  {template.salary}
                </Typography>
              </Stack>
              <Stack mt={1} direction={'row'} spacing={1}>
                {templatesTagsList({ tags: template.tags })}
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

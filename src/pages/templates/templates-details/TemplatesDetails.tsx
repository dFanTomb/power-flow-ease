import { useTemplatesDetails } from '../../../hooks/api/use-templates-details/useTemplatesDetails.ts';
import {
  Container,
  ListItem,
  Typography,
  List,
  ListItemText,
  Paper,
  Chip,
  Stack,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import { PageHeader } from '../../../components/page-header/PageHeader.tsx';
import { FavoriteBorder, OpenInNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../contants/routes.ts';
import { SlateEditor } from '../../../components/slate-editor/SlateEditor.tsx';

export default function TemplatesDetails() {
  const { data: template } = useTemplatesDetails();
  const navigate = useNavigate();

  if (!template) {
    return null;
  }

  const templatesTagsList = template.tags.map((tag, index) => (
    <Chip size={'small'} key={`${tag}_${index}`} label={tag} />
  ));

  return (
    <Container>
      <PageHeader
        title={template.title}
        breadcrumbs={['Templates', 'Details', template.title]}
        renderRight={
          <Stack direction={'row'} spacing={1}>
            <Button variant={'outlined'} color={'secondary'} onClick={() => navigate(routes.templatesEdit)}>
              Edit
            </Button>
            <Button color={'error'} variant={'outlined'}>
              Remove
            </Button>
            <Button variant={'outlined'} startIcon={<FavoriteBorder />}>
              Save
            </Button>
            <Button variant={'contained'} startIcon={<OpenInNew />}>
              Apply
            </Button>
          </Stack>
        }
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 4 }}>
            <Typography variant='h5' gutterBottom>
              Description
            </Typography>
            <Typography variant='body1' gutterBottom mb={2}>
              <SlateEditor readOnly={true} initialValue={template.description} />
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant='h5' gutterBottom>
              Requirements:
            </Typography>
            <List sx={{ listStyle: 'disc', pl: 5 }}>
              {template.requirements.map((requirement, index) => (
                <ListItem key={index} sx={{ display: 'list-item', pl: 1 }}>
                  <ListItemText primary={requirement} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 4 }}>
            <Typography variant='h6' gutterBottom>
              {template.salary}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant='subtitle1' gutterBottom>
              Company: <strong>{template.company}</strong>
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
              Location: <strong>{template.location}</strong>
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Stack mt={2} mb={2} direction={'row'} flexWrap={'wrap'} gap={1}>
              {templatesTagsList}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

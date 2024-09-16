import { Box, Button, styled, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../contants/routes';
import logo from '../../assets/logo.png';

const AppBar = styled(
  MuiAppBar,
  {},
)(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box>
      <AppBar position='relative' color='transparent'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component={'img'} src={logo} alt={''} sx={{ maxWidth: '40px', mr: 2 }} />
            <Typography variant={'h4'} component={'h1'} fontSize={'1.5rem'} fontWeight={'fontWeightBold'}>
              FlowMaster
            </Typography>
          </Box>
          <Button variant={'outlined'} onClick={() => navigate(routes.login)}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 65px)',
          textAlign: 'center',
        }}
      >
        <Typography variant={'h3'} component={'h1'}>
          Master your workflow with FlowMaster
        </Typography>
        <Typography variant={'h6'} component={'h2'}>
          Stay organized and revolutionize the way you manage your projects with our powerful workflow management tool.
        </Typography>
      </Box>
    </Box>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, FormControl, Link, Stack, TextField, Typography } from '@mui/material';
import { Facebook, Google } from '@mui/icons-material';

import { routes } from '../../contants/routes';
import { WelcomeContent } from '../../content/welcome-content/WelcomeContent';
import { HalfLayout } from '../../layouts/half-layout/HalfLayout';
import { useAppDispatch } from '../../store/hooks';
import { register } from '../../store/app/authSlice';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (firstName && lastName && username && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const newUser = { firstName, lastName, username, email, password };
        dispatch(register(newUser));
        navigate(routes.dashboard);
      } else {
        alert('Passwords do not match');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <HalfLayout>
      <WelcomeContent />
      <Stack spacing={2} sx={{ minWidth: '60%' }} alignItems={'center'}>
        <Typography variant={'h3'} component={'h1'}>
          Create account
        </Typography>
        <Typography variant={'body1'}>Fill the form below to register new account</Typography>
        <Stack direction={'row'} spacing={2} sx={{ width: '100%' }}>
          <FormControl fullWidth>
            <TextField
              label={'First name'}
              fullWidth
              placeholder={'First name'}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label={'Last name'}
              fullWidth
              placeholder={'Last name'}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
        </Stack>
        <FormControl fullWidth>
          <TextField
            label={'Username'}
            fullWidth
            placeholder={'Username'}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label={'Email'}
            fullWidth
            placeholder={'Email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label={'Password'}
            fullWidth
            placeholder={'Password'}
            type={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label={'Confirm password'}
            fullWidth
            placeholder={'Password'}
            type={'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>

        <Button variant={'contained'} fullWidth onClick={handleRegister}>
          Create account
        </Button>
        <Divider sx={{ width: '100%' }} />
        <Typography variant={'body2'}>Or register with</Typography>
        <Stack direction={'row'} spacing={1}>
          <Button variant={'outlined'} startIcon={<Google />}>
            Google
          </Button>
          <Button variant={'outlined'} startIcon={<Facebook />}>
            Facebook
          </Button>
        </Stack>
        <Stack spacing={1}>
          <Typography
            variant={'body2'}
            sx={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center' }}
          >
            Already have an account?{' '}
            <Link
              onClick={() => navigate(routes.login)}
              underline={'hover'}
              component={'button'}
              fontWeight={'fontWeightMedium'}
            >
              Sign in
            </Link>
          </Typography>
          <Typography
            variant={'body2'}
            sx={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center' }}
          >
            Forgot password?{' '}
            <Link
              onClick={() => navigate(routes.resetPassword)}
              component={'button'}
              underline={'hover'}
              fontWeight={'fontWeightMedium'}
            >
              Reset password
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </HalfLayout>
  );
}

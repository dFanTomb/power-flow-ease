import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, FormControl, Link, Stack, TextField, Typography } from '@mui/material';
import { Facebook, Google } from '@mui/icons-material';

import { routes } from '../../contants/routes';
import { WelcomeContent } from '../../content/welcome-content/WelcomeContent';
import { HalfLayout } from '../../layouts/half-layout/HalfLayout';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/app/authSlice';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    setEmailError(!email);
    setPasswordError(!password);

    if (!email || !password) {
      return setErrorMessage('Field is required.');
    }

    try {
      dispatch(login({ email, password }));
      navigate(routes.dashboard);
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (e.target.value.includes('@')) {
      setEmailError(false);
      setErrorMessage('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (e.target.value) {
      setPasswordError(false);
      setErrorMessage('');
    }
  };

  return (
    <HalfLayout>
      <WelcomeContent />
      <Stack spacing={2} sx={{ minWidth: '60%' }} alignItems={'center'}>
        <Typography variant={'h3'} component={'h1'}>
          Hello,
        </Typography>
        <Typography variant={'body1'}>Enter your credentials below</Typography>
        <FormControl fullWidth>
          <TextField
            fullWidth
            placeholder={'Email'}
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? errorMessage : ''}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            fullWidth
            placeholder={'Password'}
            type={'password'}
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            helperText={passwordError ? errorMessage : ''}
          />
        </FormControl>

        <Button variant={'contained'} fullWidth onClick={handleLogin}>
          Login
        </Button>
        <Divider sx={{ width: '100%' }} />
        <Typography variant={'body2'}>Or login with</Typography>
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
            Don't have an account?{' '}
            <Link
              onClick={() => navigate(routes.register)}
              underline={'hover'}
              component={'button'}
              fontWeight={'fontWeightMedium'}
            >
              Sign up
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

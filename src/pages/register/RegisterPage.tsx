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

  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleFieldChange = (field: keyof typeof fieldErrors, value: string) => {
    const newErrors = { ...fieldErrors };

    if (field === 'email') {
      newErrors[field] = !value.includes('@');
    } else if (field === 'confirmPassword') {
      newErrors[field] = value !== password;
    } else {
      newErrors[field] = value.trim() === '';
    }

    setFieldErrors(newErrors);

    switch (field) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleRegister = () => {
    const errors = {
      firstName: !firstName,
      lastName: !lastName,
      username: !username,
      email: !email,
      password: !password,
      confirmPassword: !confirmPassword || password !== confirmPassword,
    };

    setFieldErrors(errors);

    if (Object.values(errors).some((hasError) => hasError)) {
      return setErrorMessage(
        errors.confirmPassword && password !== confirmPassword ? 'Passwords do not match' : 'All fields are required',
      );
    }

    try {
      dispatch(
        register({
          firstName,
          lastName,
          username,
          email,
          password,
        }),
      );
      navigate(routes.dashboard);
    } catch (error) {
      setErrorMessage('Registration failed. Email may already be in use.');
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
              onChange={(e) => handleFieldChange('firstName', e.target.value)}
              error={fieldErrors.firstName}
              helperText={fieldErrors.firstName && 'First name is required'}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label={'Last name'}
              fullWidth
              placeholder={'Last name'}
              value={lastName}
              onChange={(e) => handleFieldChange('lastName', e.target.value)}
              error={fieldErrors.lastName}
              helperText={fieldErrors.lastName && 'Last name is required'}
            />
          </FormControl>
        </Stack>
        <FormControl fullWidth>
          <TextField
            label={'Username'}
            fullWidth
            placeholder={'Username'}
            value={username}
            onChange={(e) => handleFieldChange('username', e.target.value)}
            error={fieldErrors.username}
            helperText={fieldErrors.username && 'Username is required'}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label={'Email'}
            fullWidth
            placeholder={'Email'}
            value={email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            error={fieldErrors.email}
            helperText={fieldErrors.email && 'Email is required'}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label={'Password'}
            fullWidth
            placeholder={'Password'}
            type={'password'}
            value={password}
            onChange={(e) => handleFieldChange('password', e.target.value)}
            error={fieldErrors.password}
            helperText={fieldErrors.password && 'Password is required'}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label={'Confirm password'}
            fullWidth
            placeholder={'Password'}
            type={'password'}
            value={confirmPassword}
            onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
            error={fieldErrors.confirmPassword}
            helperText={
              fieldErrors.confirmPassword &&
              (password !== confirmPassword ? 'Password do not match' : 'Confirm password is required')
            }
          />
        </FormControl>

        {errorMessage && (
          <Typography color={'error'} variant={'body2'}>
            {errorMessage}
          </Typography>
        )}

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

import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import React, { useEffect, useState } from 'react';

/**
 * Routing
 */
import { useSearchParams, useNavigate } from 'react-router-dom';

/**
 *
 * Logos
 */
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import userService from '../../services/user/user.service';
import { useAlert } from '../reusable-components/Alert';
import authService from '../../services/auth/auth.service';

const ResetCredentials = () => {
  const { showSuccess, showError } = useAlert();
  //Invoked when Componenet is "initially" mounted because of dependency
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState('');

  const [state, setState] = useState({
    password: {
      show: true,
      value: '',
    },
    confirmPassword: {
      show: true,
      value: '',
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  function handleClick() {
    setIsSaving(true);
    authService
      .resetCredentials(
        token,
        state.password.value,
        state.confirmPassword.value
      )
      .then(
        (response) => {
          showSuccess({ message: 'Du kan nu logge ind med dit nye kodeord!' });
        },
        (error) => {
          showError({
            message:
              error?.response?.data?.errors[0] || 'Der skete en uventet fejl!',
          });
        }
      );
  }

  const handleChange = (which) => (event) => {
    setState({
      ...state,
      [which]: {
        ...[which],
        value: event.target.value,
      },
    });
  };

  const handleClickShowPassword = () => {
    setState({
      ...state,
      password: { ...state.password, show: !state.password.show },
    });
  };

  const handleClickShowConfirmedPassword = () => {
    setState({
      ...state,
      confirmPassword: {
        ...state.confirmPassword,
        show: !state.confirmPassword.show,
      },
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('passwordToken');
    if (!token || token === '' || token === undefined || token === null) {
      navigate('/');
    }
    setToken(token);
  }, []);

  /**
   * 1. Make two inputs, inside form, password and confirm password
   * 2. On submit, check if inputs are the same, or
   *
   * */

  const handleResetCredentials = (e) => {
    e.preventDefault();
  };

  return (
    <div className='w-full'>
      <div className='h-full flex justify-center items-center'>
        <form
          onSubmit={handleResetCredentials}
          className='w-full md:w-1/2 xl:w-1/3'
        >
          <Stack spacing={4} mr={2} ml={2}>
            <Typography variant='h4' component='div'>
              Nyt kodeord
              <Typography variant='h5' component='div'>
                Vælg et nyt kordord til din konto!
              </Typography>
            </Typography>

            <TextField
              label='Nyt kodeord'
              variant='filled'
              value={state.password.value}
              onChange={handleChange('password')}
              type={state.password.show ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {state.password.show ? (
                        <MdVisibilityOff />
                      ) : (
                        <MdVisibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label='Bekræft nyt kodeord'
              variant='filled'
              value={state.confirmPassword.value}
              onChange={handleChange('confirmPassword')}
              type={state.confirmPassword.show ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowConfirmedPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {state.confirmPassword.show ? (
                        <MdVisibilityOff />
                      ) : (
                        <MdVisibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              color='secondary'
              onClick={handleClick}
              loading={isSaving}
              loadingPosition='start'
              startIcon={<SaveIcon />}
              variant='contained'
            >
              Gem
            </LoadingButton>
            <button onClick={() => setIsSaving(!isSaving)}>check</button>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default ResetCredentials;

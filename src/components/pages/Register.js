/*
 * React stuff
 */
import React, { useReducer } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
/**
 * Icons
 */
import { UserAddIcon } from '@heroicons/react/solid';
import logo from '../../images/logo1.png';
import { LockClosedIcon } from '@heroicons/react/solid';

/**
 * Services
 */
import authService from '../../services/auth/auth.service';

/**
 * Reducers
 */
import {
  actions,
  initialState,
  reducer,
} from '../../reducers/register.reducer';

const Register = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleRegister = (e) => {
    e.preventDefault();
    authService
      .register(state.username, state.email, state.password)
      .then((response) => {
        console.log(response);
        navigate('/login');
      })
      .catch((error) => {
        console.log(error?.response?.data);
      });
  };

  return (
    <>
      <div
        className={`w-full absolute top-0 transition ease-in-out duration-500 ${
          state.message ? 'show-error' : 'hide-error'
        }`}
      >
        <div className='w-full lg:w-1/3 text-black px-6 py-4 bg-red-400 mb-4 border-0 lg:rounded-br-xl relative'>
          <span className='text-xl inline-block mr-5 align-middle'>
            <i className='fas fa-bell' />
          </span>
          <span className='inline-block align-middle mr-8'>
            <b className='capitalize'>Fejlbesked!</b> {state.message}
          </span>
          <button
            onClick={() => console.log('reset ')}
            className='absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none'
          >
            <span>×</span>
          </button>
        </div>
      </div>
      <div className='bg-white w-full text-indigo-600 min-h-full flex flex-col sm:flex-row items-center justify-center py-12 px-4 sm:px-6 lg:px-8 divide-0 sm:divide-x-2 divide-indigo-500/[.45]'>
        <div className='sm:pr-4 flex justify-start'>
          <img src={logo} alt='logo' className='h-[250px] object-contain' />
        </div>

        <div className='flex-1 sm:flex-none z-50 w-4/5 md:w-[600px] space-y-8 sm:pl-4'>
          <div>
            <h2 className='text-center text-4xl font-extrabold'>
              Registrer nu
            </h2>
            <p className='mt-2 text-center text-md text-gray-600'>
              Eller{' '}
              <a
                href='/login'
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                login med din konto
              </a>
            </p>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleRegister}>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='shadow-sm space-y-4'>
              <div>
                <label htmlFor='email-address' className='text-lg'>
                  Din e-mailaddresse
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  value={state.email}
                  onChange={(e) =>
                    dispatch({
                      type: actions.CHANGE_FORM,
                      payload: { name: e.target.name, value: e.target.value },
                    })
                  }
                  autoComplete='email'
                  required
                  className='appearance-none rounded-none relative block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Email address'
                />
              </div>
              <div>
                <label htmlFor='password' className='text-lg'>
                  Brugernavn
                </label>
                <input
                  id='password'
                  name='password'
                  type='text'
                  value={state.password}
                  onChange={(e) =>
                    dispatch({
                      type: actions.CHANGE_FORM,
                      payload: { name: e.target.name, value: e.target.value },
                    })
                  }
                  autoComplete='current-password'
                  required
                  className='appearance-none rounded-none relative block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Password'
                />
              </div>
              <div>
                <label htmlFor='password' className='text-lg'>
                  Kodeord
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={state.password}
                  onChange={(e) =>
                    dispatch({
                      type: actions.CHANGE_FORM,
                      payload: { name: e.target.name, value: e.target.value },
                    })
                  }
                  autoComplete='current-password'
                  required
                  className='appearance-none rounded-none relative block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Password'
                />
              </div>
              <div>
                <label htmlFor='password' className='text-lg'>
                  Bekræft kodeord
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={state.password}
                  onChange={(e) =>
                    dispatch({
                      type: actions.CHANGE_FORM,
                      payload: { name: e.target.name, value: e.target.value },
                    })
                  }
                  autoComplete='current-password'
                  required
                  className='appearance-none rounded-none relative block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Password'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <LockClosedIcon
                    className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                    aria-hidden='true'
                  />
                </span>
                Opret konto
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

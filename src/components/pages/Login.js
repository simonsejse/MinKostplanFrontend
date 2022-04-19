/**
 * Svg
 */
import { LockClosedIcon } from '@heroicons/react/solid';

/**
 * React stuff
 */
import React, { useEffect, useReducer } from 'react';

/**
 * Reducers
 */
import { reducer, actions, initialState } from '../../reducers/login.reducer';

/**
 * Contexts
 */
import { useAuth } from '../../contexts/auth.context';
/**
 *
 * Stylesheets
 */
import '../css/Login.css';

import logo from '../../images/logo3.png';
import loading from '../../images/loading.png';

const Login = () => {
  const { onLogin } = useAuth();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.title = `Min Kostplan - Login`;
  }, []);

  const submitForm = (e) => {
    e.preventDefault();

    dispatch({ type: actions.LOGIN_STARTS });
    //Make it return something
    onLogin(
      state.form.email,
      state.form.password,
      state.form.remember_me
    ).catch((err) => {
      console.log(err?.response?.data);
      dispatch({
        type: actions.LOGIN_FAILED,
        payload: err?.response?.data?.message || 'Ukendt fejl!',
      });
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
            onClick={() => dispatch({ type: actions.RESET_MESSAGE })}
            className='absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none'
          >
            <span>×</span>
          </button>
        </div>
      </div>
      <div className='bg-white w-full text-indigo-600 min-h-full flex flex-col lg:flex-row items-center justify-center py-12 px-4 sm:px-6 lg:px-8 divide-0 lg:divide-x-2 divide-indigo-500/[.45]'>
        <div className='lg:pr-4 flex justify-start'>
          <img src={logo} alt='logo' className='w-[500px] object-contain' />
        </div>

        <div className='flex flex-1 flex-col justify-center lg:flex-none z-50 w-4/5 md:w-[600px] space-y-8 lg:pl-4'>
          <div>
            <h2 className='text-center text-4xl font-extrabold'>Log ind</h2>
            <p className='mt-2 text-center text-md text-gray-600'>
              Eller{' '}
              <a
                href='/register'
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                opret en konto i dag
              </a>
            </p>
          </div>
          <form className='mt-8 space-y-6' onSubmit={submitForm}>
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
                  value={state.form.email}
                  onChange={(e) =>
                    dispatch({
                      type: actions.CHANGE_FORM_VALUES,
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
                  Kodeord
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={state.form.password}
                  onChange={(e) =>
                    dispatch({
                      type: actions.CHANGE_FORM_VALUES,
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

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  value={state.form.remember_me}
                  onChange={() =>
                    dispatch({ type: actions.TOGGLE_REMEMBER_ME })
                  }
                  type='checkbox'
                  className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                />
                <label htmlFor='remember-me' className='ml-2 block text-sm'>
                  Husk mig
                </label>
              </div>

              <div className='text-sm'>
                <a
                  href='#'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Glemt dit password?
                </a>
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
                Log ind
              </button>
            </div>
          </form>
          <div className='flex justify-center'>
            <img
              className={`h-[50px] object-contain opacity-0 ${
                state.isLoading && 'loading opacity-100'
              }`}
              src={loading}
              alt='loading'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

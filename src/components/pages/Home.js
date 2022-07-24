/**
 * React stuff
 */
import React, { useEffect, useReducer, useCallback } from 'react';

/**
 * Services
 */
import meService from '../../services/user/user.service';

/**
 * Progression enum
 */
import Progression from '../../config/progression';

/**
 * Svg
 */
import { profile_info } from '../../config/svg-files';
import { AiFillInfoCircle } from 'react-icons/ai';

/**
 * Reducers
 */
import { reducer, actions, initialState } from '../../reducers/me.reducer';

import home_step1 from '../../images/home_step1.png';
import home_step2 from '../../images/home_step2.png';
import home_step3 from '../../images/home_step3.png';

/**
 * Contexts
 */
import { useNavigation } from '../../contexts/nav.context';
import { useAuth } from '../../contexts/auth.context';

const Hjem = () => {
  return (
    <div className='flex-1 bg-primary'>
      <div className='ml-4 mr-4 space-y-[100px] xl:space-y-0 md:m-0 h-full flex flex-col-reverse xl:grid xl:grid-cols-2'>
        <div className='flex justify-center lg:justify-start items-start text-white mt-12 xl:mt-0'>
          <NewsFeed />
        </div>
        <div className='flex items-center'>
          <HowItWorks />
        </div>
      </div>
    </div>
  );
};

const news = [
  {
    id: 1,
    title: 'Nyhed 1',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    author: 'Simon',
    date: 'Dato 03-03-2022',
  },
  {
    id: 2,
    title: 'Nyhed 2',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    author: 'Magnus',
    date: 'Dato 04-03-2022',
  },
];

const NewsFeed = () => {
  return (
    <section className='h-full flex justify-center items-center'>
      <div className='w-full md:w-2/3 max-h-[50rem] overflow-y-auto'>
        {/* Actual news feed */}
        <div className='flex flex-col h-full space-y-4 p-2'>
          <div className='border-b-4 border-sky-500'>
            <h1 className='text-gray-800 text-xl font-bold block uppercase tracking-wide'>
              Nyheder (opdateringer)
            </h1>
          </div>
          {news.map((news) => {
            return (
              <div
                key={news.id}
                className='p-4 bg-secondary shadow-form rounded-xl space-y-2'
              >
                <div className='flex flex-col'>
                  <div className='flex items-center justify-between'>
                    <div className='flex space-x-2'>
                      <h1 className='text-gray-700 text-xl font-bold block uppercase tracking-wide'>
                        {news.id}.
                      </h1>
                      <h1 className='text-gray-700 text-xl font-bold block uppercase tracking-wide'>
                        {news.title}
                      </h1>
                    </div>
                    <AiFillInfoCircle size={30} fill='skyblue' />
                  </div>
                  <h1 className='italic text-green-400 text-sm font-bold block uppercase tracking-tight text-right'>
                    {news.date}
                  </h1>
                  <h1 className='italic text-gray-400 text-sm font-bold block uppercase tracking-tight text-right border-b border-gray-600'>
                    Af {news.author}
                  </h1>
                </div>

                <p className='text-gray-900 text-sm leading-normal text-left'>
                  {news.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  return (
    <div className='f-f-p flex flex-col'>
      <h1 className='focus:outline-none text-center text-3xl lg:text-4xl font-extrabold lg:leading-9 tracking-wider text-gray-300'>
        Hvordan virker det?
      </h1>
      <div className='md:mt-5 f-f-p'>
        <div className='md:flex justify-center w-full'>
          <div className='flex flex-col items-center md:items-end md:pr-12 md:border-r-4 border-gray-300 relative md:w-1/2'>
            <div aria-label='sign up' role='img'>
              <img
                className='focus:outline-none w-40 mt-10'
                src={home_step1}
                alt='step 1'
              />
            </div>
            <div aria-label={2} role='img'>
              <img
                className='focus:outline-none mt-24'
                src='https://tuk-cdn.s3.amazonaws.com/can-uploader/3_step_center_aligned_how_it_worksSvg2.svg'
                alt
              />
            </div>
            <div className='flex mt-12 flex-col items-center lg:items-end md:w-8/12'>
              <h1 className='text-gray-200 focus:outline-none text-base font-bold leading-5'>
                Opret en kostplan
              </h1>
              <h2 className='focus:outline-none text-gray-500 mt-3 pl-3 text-center md:text-right text-sm leading-6 tracking-wide'>
                Efter medlemsskabskøbet, kan du oprette en kostplan med dine
                ønskede måltider samt mål.
              </h2>
            </div>
            <div aria-label='transactions' role='img'>
              <img
                className='focus:outline-none w-40 mt-24'
                src={home_step3}
                alt
              />
            </div>
            <img
              className='hidden md:block absolute right-0 top-0 -mt-2 -mr-1'
              src='https://cdn.tuk.dev/assets/components/111220/Fs7/line.png'
              alt
            />
          </div>
          <div className='flex flex-col items-center md:items-start md:pl-12 lg:border-gray-400 mt-20 md:mt-0 md:w-1/2'>
            <div aria-label={1} role='img'>
              <img
                src='https://tuk-cdn.s3.amazonaws.com/can-uploader/3_step_center_aligned_how_it_worksSvg4.svg'
                alt
              />
            </div>
            <div className='flex mt-6 flex-col items-center md:items-start md:w-8/12'>
              <h1 className='text-gray-200 focus:outline-none text-base font-bold leading-5'>
                Køb medlemsskab
              </h1>
              <h2 className='focus:outline-none text-gray-500 mt-3 text-sm leading-6 tracking-wide'>
                Betal 50,- DKK for at få medlemsskab der aldrig udløber. Og få
                adgang til alt herinde.
              </h2>
            </div>
            <div aria-label='wallet' role='img'>
              <img
                className='focus:outline-none w-40 mt-28 object-fit'
                src={home_step2}
              />
            </div>
            <div aria-label={3} role='img'>
              <img
                className='focus:outline-none mt-20'
                src='https://tuk-cdn.s3.amazonaws.com/can-uploader/3_step_center_aligned_how_it_worksSvg6.svg'
                alt
              />
            </div>
            <div className='flex mt-6 flex-col items-center md:items-start md:w-8/12'>
              <h1 className='text-gray-200 focus:outline-none text-base font-bold leading-5'>
                Nyd din kostplan
              </h1>
              <h2 className='focus:outline-none text-gray-500 mt-3 text-sm leading-6 tracking-wide'>
                Du kan nyde din helt egen skræddersyet kostplan, lavet med din
                ønskede makrofordeling, kalorie-mål og dine helt egne måltider.
                Og opnå din drøm!
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hjem;
/*
const Me = () => {
  const { onLogout } = useAuth();

  const logOut = () => {
    onLogout();
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUser = async () => {
    dispatch({ type: actions.FETCH_USER_DATA });
    meService
      .me()
      .then((response) => {
        dispatch({
          type: actions.FETCH_USER_DATA_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) => {
        const error = {
          message: err.response.data,
          statusCode: err.response.status,
        };
        dispatch({
          type: actions.FETCH_USER_DATA_ERROR,
          payload: error,
        });
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const svgRef = useCallback(
    (node) => {
      console.log(state.body);
      if (node !== null) {
        node.innerHTML = profile_info(
          state.body.id,
          state.body.username,
          state.body.email
        );
      }
    },
    [state.body]
  );

  if (state.progression === Progression.LOADING) {
    return <Loading />;
  }

  if (state.progression === Progression.ERROR) {
    return <IsError />;
  }

  return (
    <>
      <div className='text-white'>
        <div className='flex flex-col justify-center items-center'>
          <div className='profile-info'>
            <div ref={svgRef} className='profile-svg flex justify-center'></div>
          </div>
          <button
            className='hover:animate-pulse bg-indigo-600 hover:bg-indigo-500 text-white rounded font-bold py-2 px-4 border-b-8 border-indigo-900 hover:border-indigo-600 rounded'
            onClick={() => logOut()}
          >
            Log ud
          </button>
        </div>
      </div>
    </>
  );
};

const Loading = () => {
  return <div>Loading...</div>;
};

const IsError = () => {
  return (
    <div>
      <h1>Error...</h1>
      <h1>En error er sket ved fetching af din data!</h1>
    </div>
  );
};

export default Me;
*/

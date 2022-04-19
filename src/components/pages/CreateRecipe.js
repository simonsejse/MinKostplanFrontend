/**
 * React stuff
 */
import React, { useReducer, useState, useEffect, useContext } from 'react';

/**
 * Contexts
 */
import { useAuth } from '../../contexts/auth.context';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

/**
 * Components
 */
import Alert from '../Alert';
import DropDownSelect from '../DropDownSelect';
import SearchBar from '../SearchBar';

/**
 * Services
 */
import recipeService from '../../services/recipe/recipe.service';

/**
 * Css
 */
//import '../css/CreateRecipe.css';
/* Reducers */
import {
  reducer,
  initialState,
  actions,
} from '../../reducers/create-meal-reducer';

import { AiFillPlusCircle } from 'react-icons/ai';
import { HiOutlineDotsVertical } from 'react-icons/hi';

import axios from 'axios';
import { axiosRequestConfig } from '../../config/axios-config';

const ReducerContext = React.createContext();

const useRecipeReducer = () => {
  return useContext(ReducerContext);
};

const ReducerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    state: state,
    dispatch: dispatch,
  };

  return (
    <ReducerContext.Provider value={value}>{children}</ReducerContext.Provider>
  );
};

const RecipeWrapper = () => {
  return (
    <ReducerProvider>
      <CreateRecipe />
    </ReducerProvider>
  );
};

const CreateRecipe = () => {
  const { user } = useAuth();

  const { state, dispatch } = useRecipeReducer();

  useEffect(() => {
    recipeService
      .getCategories()
      .then((res) => {
        console.log('i am working');
        dispatch({
          type: actions.SET_CATEGORIES,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log('Error has occured trying to get categories.');
        dispatch({
          type: actions.CHANGE_ALERT_STATE,
          payload: {
            show: true,
            isError: true,
            isCloseable: false,
            title: 'Kunne ikke loade kategorier!',
            message: 'Kunne ikke loade opskrift kategorierne! Reload siden!',
          },
        });
      });
  }, []);
  /**
   * Lav et API request til RecipeType og så kan jeg tilføje til et "options" og vise til brugeren
   * og når jeg så sender request tilbage tjekker jeg allerede via @Valid om det er gyldigt
   */

  const hideAlert = () => {
    dispatch({
      type: actions.CHANGE_ALERT_STATE,
      payload: {
        show: false,
        isError: false,
        title: '',
        message: '',
        isCloseable: false,
      },
    });
  };

  return (
    <div className='flex-1 bg-primary'>
      <Alert
        show={state.alert.show}
        isError={state.alert.isError}
        title={state.alert.title}
        message={state.alert.message}
        isCloseable={state.alert.isCloseable}
        handleClose={hideAlert}
      />
      <div className='flex justify-center'>
        <SectionOne />
      </div>
      <div className='mt-10 flex flex-col xl:flex-row'>
        <SectionTwo />
      </div>

      <div className='mt-10 flex md:ml-24 md:mr-24'>
        <SectionThree />
      </div>
      <div className='mt-10 flex md:ml-24 md:mr-24'>
        <SectionFour />
      </div>
      <div className='mt-10 flex md:ml-24 md:mr-24'>
        <SectionFive />
      </div>
      <div className='mt-10 flex md:ml-24 md:mr-24'>
        <SectionSix />
      </div>
    </div>
  );
};

const SectionOne = () => {
  return (
    <div className='flex flex-col text-center w-2/3 md:w-1/2'>
      <h1 className='mt-12 font-title tracking-wide text-4xl uppercase text-white'>
        Opret opskrift
      </h1>
      <p className='text-center text-lg text-white font-subtitle border-t-4 border-secondary'>
        Her har du mulighed for at oprette en opskrift til hjemmesiden, som
        andre brugere kan få glæde af! Du optjener samtidig 5 points pr.
        opskrift du uploader. <br />
        Når du har 50 point, kan du få et halvt år gratis medlemsskab!
      </p>
    </div>
  );
};

const SectionTwo = () => {
  const { state, dispatch } = useRecipeReducer();
  return (
    <>
      <div className='xl:mr-auto md:flex md:ml-24 md:ml-24 md:mr-24'>
        <div className='md:w-full m-5 md:m-0 flex flex-col items-center space-y-2'>
          <div className='w-full flex flex-col space-y-1'>
            <label
              className='block uppercase tracking-wide text-white text-xs font-bold'
              htmlFor='recipeName'
            >
              Opskrift navn
            </label>
            <input
              id='name'
              name='name'
              value={state.form.name}
              onChange={(e) =>
                dispatch({
                  type: actions.CHANGE_FORM_DATA,
                  payload: {
                    dataToBeChanged: e.target.name,
                    value: e.target.value,
                  },
                })
              }
              placeholder='Navn på opskrift'
              minLength={3}
              maxLength={72}
              className='w-full xl:w-[580px] bg-secondary text-white placeholder-white border-0 focus:ring-0 focus:border-0 rounded-lg focus:outline-none'
              type='text'
            />
          </div>
          <Photo />
        </div>
      </div>
      <div className='mt-10 xl:mt-0 flex md:ml-24 md:mr-24 xl:ml-0'>
        <RecipeValues />
      </div>
    </>
  );
};

const SectionThree = () => {
  const { state, dispatch } = useRecipeReducer();
  return (
    <div className='w-full xl:w-[300px] col-span-6 sm:col-span-3'>
      <label
        htmlFor='country'
        className='block uppercase tracking-wide text-white text-xs font-bold'
      >
        Opskrift type
      </label>
      <select
        id='type'
        name='type'
        value={state.form.type}
        onChange={(e) =>
          dispatch({
            type: actions.CHANGE_FORM_DATA,
            payload: {
              dataToBeChanged: e.target.name,
              value: e.target.value,
            },
          })
        }
        autoComplete='country-name'
        className='mt-1 font-text tracking-widest text-white block w-full py-2 px-3 border-2 border-indigo-900 bg-secondary rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
      >
        {state.categories.map((category, idx) => {
          return <option key={idx}>{category}</option>;
        })}
      </select>
    </div>
  );
};

const SectionFour = () => {
  const { state, dispatch } = useRecipeReducer();
  return (
    <>
      <div className='w-full flex flex-col xl:flex-row xl:space-x-2 xl:space-y-0 space-y-4'>
        <div className='w-full'>
          <div className='mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-white text-xs font-bold mb-1'
              htmlFor='pricePerServing'
            >
              Gns. pris for opskrift i DKK
            </label>
            <input
              className='appearance-none placeholder-white block w-full bg-secondary text-white border rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500'
              id='pricePerServing'
              name='pricePerServing'
              value={state.form.pricePerServing}
              onChange={(e) =>
                dispatch({
                  type: actions.CHANGE_FORM_DATA,
                  payload: {
                    dataToBeChanged: e.target.name,
                    value: e.target.value,
                  },
                })
              }
              type='number'
              placeholder='F.eks. 25 DKK'
            />
          </div>
        </div>
        <div className='w-full'>
          <div className='mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-white text-xs font-bold mb-1'
              htmlFor='readyInMinutes'
            >
              Hvornår er maden klar i minutter
            </label>
            <input
              className='appearance-none placeholder-white block w-full bg-secondary text-white border rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500'
              id='readyInMinutes'
              name='readyInMinutes'
              value={state.form.readyInMinutes}
              onChange={(e) =>
                dispatch({
                  type: actions.CHANGE_FORM_DATA,
                  payload: {
                    dataToBeChanged: e.target.name,
                    value: e.target.value,
                  },
                })
              }
              type='number'
              placeholder='F.eks. 10 minutter'
            />
          </div>
        </div>
      </div>
    </>
  );
};

const SectionFive = () => {
  const { state, dispatch } = useRecipeReducer();
  const test = [
    {
      id: 1,
      instruction:
        'Du kan enten tilberede din kylling i ovnen eller på panden det kan gøres i ovnen hvor inderfilet får ca. 6-7min på hver side på 190-200grader.',
    },
    {
      id: 2,
      instruction: 'Tag ud af ovn og spis!',
    },
  ];
  return (
    <div className='flex w-full space-x-2'>
      <div className='w-full space-y-1'>
        <label
          className='block uppercase tracking-wide text-white text-xs font-bold'
          htmlFor='newInstruction'
        >
          Tilføj instruktion!
        </label>
        <div className='flex flex-col space-y-2'>
          <textarea
            className='appearance-none placeholder-white block w-full bg-secondary text-white border rounded leading-tight focus:outline-none focus:border-gray-500'
            cols='40'
            rows='5'
            id='newInstruction'
            name='newInstruction'
            value={state.form.newInstruction}
            onChange={(e) =>
              dispatch({
                type: actions.CHANGE_FORM_DATA,
                payload: {
                  dataToBeChanged: e.target.name,
                  value: e.target.value,
                },
              })
            }
            type='text'
            placeholder='F.eks. først tændes ovnen, derefter indsættes ost og kylling!'
          />
          <button
            type='submit'
            className='transition ease-out delay-75 transition-duration-300 hover:-translate-y-2 py-2 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Tilføj
          </button>
        </div>
      </div>
      <div className='w-full py-6 rounded-md bg-secondary'>
        <div className='flex flex-col space-y-3 p-4'>
          {test.length === 0 && (
            <p className='block uppercase tracking-wide text-red-500 text-xs font-bold'>
              Der er ingen instrukser tilføjet endnu!
            </p>
          )}
          {test.map((test) => {
            return (
              <div className='p-4 opacity-80 hover:opacity-100 shadow-md shadow-indigo-900 cursor-move rounded-lg border-2 border-accent border-dashed'>
                <p className='block uppercase tracking-wide text-white text-xs font-bold'>
                  {test.id}. {test.instruction}.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SectionSix = () => {
  return (
    <div className='w-full flex justify-center'>
      <div className='w-2/3 md:w-1/3'>
        <button
          type='submit'
          className='w-full transition ease-out delay-75 transition-duration-300 hover:-translate-y-2 py-2 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Færdiggør opskrift
        </button>
      </div>
    </div>
  );
};

const RecipeValues = () => {
  const { state, dispatch } = useRecipeReducer();
  return (
    <div className='w-full m-5 md:m-0 xl:w-[500px] 2xl:w-[700px] shadow overflow-hidden rounded-md'>
      <div className='px-4 py-5 h-full bg-secondary space-y-6 sm:p-6 border-indigo-800 border-t-[15px] border-b-[15px]'>
        <fieldset>
          <legend className='block uppercase tracking-wide text-white text-xl font-bold'>
            Opskrift beskrivelse
          </legend>
          <div className='mt-4 flex'>
            <div className='w-full space-y-2'>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input
                    id='isVegetarian'
                    name='isVegetarian'
                    value={state.form.booleans.isVegetarian}
                    onChange={(e) =>
                      dispatch({
                        type: actions.CHANGE_FORM_BOOLEAN_DATA,
                        payload: {
                          dataToBeChanged: e.target.name,
                          value: e.target.checked,
                        },
                      })
                    }
                    type='checkbox'
                    className='focus:ring-indigo-500 h-4 w-4 text-accent border-gray-300 rounded'
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label
                    htmlFor='isVegetarian'
                    className='font-medium text-white'
                  >
                    Er vegetarisk?
                  </label>
                </div>
              </div>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input
                    id='isVegan'
                    name='isVegan'
                    value={state.form.booleans.isVegan}
                    onChange={(e) =>
                      dispatch({
                        type: actions.CHANGE_FORM_BOOLEAN_DATA,
                        payload: {
                          dataToBeChanged: e.target.name,
                          value: e.target.checked,
                        },
                      })
                    }
                    type='checkbox'
                    className='focus:ring-indigo-500 h-4 w-4 text-accent border-gray-300 rounded'
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label htmlFor='isVegan' className='font-medium text-white'>
                    Er vegansk?
                  </label>
                </div>
              </div>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input
                    id='isGlutenFree'
                    name='isGlutenFree'
                    value={state.form.booleans.isGlutenFree}
                    onChange={(e) =>
                      dispatch({
                        type: actions.CHANGE_FORM_BOOLEAN_DATA,
                        payload: {
                          dataToBeChanged: e.target.name,
                          value: e.target.checked,
                        },
                      })
                    }
                    type='checkbox'
                    className='focus:ring-indigo-500 h-4 w-4 text-accent border-gray-300 rounded'
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label
                    htmlFor='isGlutenFree'
                    className='font-medium text-white'
                  >
                    Er glutenfri?
                  </label>
                </div>
              </div>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input
                    id='isDairyFree'
                    name='isDairyFree'
                    value={state.form.booleans.isDairyFree}
                    onChange={(e) =>
                      dispatch({
                        type: actions.CHANGE_FORM_BOOLEAN_DATA,
                        payload: {
                          dataToBeChanged: e.target.name,
                          value: e.target.checked,
                        },
                      })
                    }
                    type='checkbox'
                    className='focus:ring-indigo-500 h-4 w-4 text-accent border-gray-300 rounded'
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label
                    htmlFor='isDairyFree'
                    className='font-medium text-white'
                  >
                    Er mælkefri?
                  </label>
                </div>
              </div>
            </div>
            <div className='w-full space-y-2'>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input
                    id='isHealthy'
                    name='isHealthy'
                    value={state.form.booleans.isHealthy}
                    onChange={(e) =>
                      dispatch({
                        type: actions.CHANGE_FORM_BOOLEAN_DATA,
                        payload: {
                          dataToBeChanged: e.target.name,
                          value: e.target.checked,
                        },
                      })
                    }
                    type='checkbox'
                    className='focus:ring-indigo-500 h-4 w-4 text-accent border-gray-300 rounded'
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label htmlFor='isHealthy' className='font-medium text-white'>
                    Er meget sundt?
                  </label>
                </div>
              </div>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input
                    id='isCheap'
                    name='isCheap'
                    value={state.form.booleans.isCheap}
                    onChange={(e) =>
                      dispatch({
                        type: actions.CHANGE_FORM_BOOLEAN_DATA,
                        payload: {
                          dataToBeChanged: e.target.name,
                          value: e.target.checked,
                        },
                      })
                    }
                    type='checkbox'
                    className='focus:ring-indigo-500 h-4 w-4 text-accent border-gray-300 rounded'
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label htmlFor='isCheap' className='font-medium text-white'>
                    Er billigt?
                  </label>
                </div>
              </div>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input
                    id='isPopular'
                    name='isPopular'
                    value={state.form.booleans.isPopular}
                    onChange={(e) =>
                      dispatch({
                        type: actions.CHANGE_FORM_BOOLEAN_DATA,
                        payload: {
                          dataToBeChanged: e.target.name,
                          value: e.target.checked,
                        },
                      })
                    }
                    type='checkbox'
                    className='focus:ring-indigo-500 h-4 w-4 text-accent border-gray-300 rounded'
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label htmlFor='isPopular' className='font-medium text-white'>
                    Er meget populært?
                  </label>
                </div>
              </div>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input
                    id='isSustainable'
                    name='isSustainable'
                    value={state.form.booleans.isSustainable}
                    onChange={(e) => {
                      dispatch({
                        type: actions.CHANGE_FORM_BOOLEAN_DATA,
                        payload: {
                          dataToBeChanged: e.target.name,
                          value: e.target.checked,
                        },
                      });
                    }}
                    type='checkbox'
                    className='focus:ring-indigo-500 h-4 w-4 text-accent border-gray-300 rounded'
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label
                    htmlFor='isSustainable'
                    className='font-medium text-white'
                  >
                    Er et bæredygtigt måltid?
                  </label>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

const Button = () => {
  return (
    <button
      type='submit'
      className='transition ease-out delay-75 transition-duration-300 hover:-translate-y-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
    >
      Save
    </button>
  );
};

const Photo = () => {
  const { state, dispatch } = useRecipeReducer();
  return (
    <div className='w-full'>
      <label className='block uppercase tracking-wide text-white text-xs font-bold'>
        Billede af ret
      </label>
      <div className='w-full xl:w-[580px] mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
        <div className='space-y-1 text-center'>
          <svg
            className='mx-auto h-20 w-20 text-gray-400'
            stroke='currentColor'
            fill='none'
            viewBox='0 0 48 48'
            aria-hidden='true'
          >
            <path
              d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <div className='flex text-sm text-gray-600'>
            <label
              htmlFor='file-upload'
              className='transition hover:-translate-y-1 delay-75 transition-duration-300 p-2 relative cursor-pointer bg-accent rounded-md font-medium text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
            >
              <span>Upload et billede af din ret!</span>
              <input
                id='file-upload'
                name='picture'
                value={state.form.picture}
                onChange={(e) =>
                  dispatch({
                    type: actions.CHANGE_FORM_DATA,
                    payload: {
                      dataToBeChanged: e.target.name,
                      value: e.target.value,
                    },
                  })
                }
                type='file'
                accept='image/*'
                className='sr-only'
              />
            </label>
          </div>
          <p className='text-xs text-gray-500'>PNG, JPG, GIF op til 10MB</p>
        </div>
      </div>
    </div>
  );
};

function Modal({ state, dispatch, addInstruction }) {
  const handleOnAdd = (foodItem) => {
    dispatch({
      type: actions.CHANGE_FORM_VALUES,
      payload: { selectedItem: foodItem },
    });
  };

  return (
    <>
      <div
        id='popup'
        className='p-24 h-full relative fixed w-full flex justify-center items-center inset-0'
      >
        <div
          className={`h-full w-full absolute bg-black opacity-[80%] ${
            !state.showModal && 'fade-out-background'
          }`}
        ></div>
        <div className='relative bg-white rounded-md shadow fixed overflow-y-auto w-7/12 opacity-[100%]'>
          <div className='bg-gray-100 rounded-tl-md rounded-tr-md px-4 md:px-8 md:py-4 py-7 flex items-center justify-between'>
            <p className='text-base font-semibold'>Ny ingrediens til måltid</p>
            <button
              onclick='popuphandler(false)'
              className='focus:outline-none'
            >
              <svg
                width={28}
                height={28}
                onClick={() => dispatch({ type: actions.HIDE_MODAl })}
                viewBox='0 0 28 28'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M21 7L7 21'
                  stroke='#A1A1AA'
                  strokeWidth='1.75'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M7 7L21 21'
                  stroke='#A1A1AA'
                  strokeWidth='1.75'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
          <div className='p-8 space-y-8'>
            <div className='wrapper p-2 rounded-sm bg-gray-100'>
              <form>
                <SearchBar
                  placeholder='Vælg en fødevare...'
                  data={state.allFoodsList}
                  handleOnAdd={handleOnAdd}
                />
              </form>
              <div className='flex space-x-4 pl-[15px]'>
                <h1 className='text-sky-700'>Ingrediens:</h1>
                <p className='text-sky-500'>{state?.selectedItem?.food_name}</p>
              </div>
            </div>
            <div className='wrapper'>
              <div className='mt-4'>
                <label
                  htmlFor='instruction'
                  className='block uppercase tracking-wide text-sky-600 text-xs font-bold mb-2'
                >
                  instruks
                </label>
                <textarea
                  class='form-control block w-3/4 px-3 py-1.5 text-base font-normal bg-gray-200 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      '
                  id='instruction'
                  rows='3'
                  placeholder='Instruktion...'
                />
              </div>
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor='instruction'
                className='block uppercase tracking-wide text-sky-600 text-xs font-bold mb-2'
              >
                Mængde
              </label>
              <input
                className='appearance-none block w-60 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                type='number'
                placeholder='Mængde af vare'
              />
              <label for='cars'>Måleenhed</label>

              <select id='metric'>
                <option value='styks'>styks</option>
                <option value='knsp'>knsp.</option>
                <option value='tsk'>tsk.</option>
                <option value='spsk'>spsk.</option>
                <option value='dl'>dl</option>
                <option value='l'>l</option>
                <option value='g'>g</option>
                <option value='kg'>kg</option>
              </select>
            </div>

            <div className='flex items-center justify-between mt-9'>
              <button
                onClick={() => {
                  dispatch({ type: actions.HIDE_MODAL });
                }}
                className='px-6 py-3 bg-gray-400 hover:bg-gray-500 shadow rounded text-sm text-white'
              >
                Afbryd
              </button>
              <button
                onClick={() => {
                  console.log('dasdas');
                  addInstruction('test', 'testbro');
                }}
                className='px-6 py-3 bg-indigo-700 hover:bg-opacity-80 shadow rounded text-sm text-white'
              >
                Tilføj ingrediens
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeWrapper;

/**
 * React stuff
 */
import React, { useReducer, useState, useEffect, useContext } from 'react';
/**
 * Contexts
 */
import { useAuth } from '../../contexts/auth.context';

/**
 * Components
 */
import Alert from '../Alert';
import DropDownSelect from '../DropDownSelect';
import SearchBar from '../SearchBar';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

/**
 * Services
 */
import recipeService from '../../services/recipe/recipe.service';
import foodService from '../../services/food/food.service';

/* Reducers */
import {
  reducer,
  initialState,
  actions,
} from '../../reducers/create-meal-reducer';

import { AiFillPlusCircle } from 'react-icons/ai';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { MdCancel } from 'react-icons/md';
import { BsX } from 'react-icons/bs';
import { AiTwotoneDelete } from 'react-icons/ai';

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
    foodService
      .getAllFoodDTOs()
      .then((res) => {
        console.log('Successfully loaded all food items');
        dispatch({ type: actions.UPDATE_FOOD, payload: res.data });
      })
      .catch((err) => {
        console.log("Couldn't load ingredients!");
        dispatch({
          type: actions.CHANGE_ALERT_STATE,
          payload: {
            show: true,
            isError: true,
            isCloseable: false,
            title: 'Kunne ikke loade mad-ingredienser!',
            message:
              'Kunne ikke loade mad ingredienserne! Reload siden og sørg for at du er logget ind!',
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
    <>
      <div className='flex-1 bg-primary'>
        <div className='relative'>
          <Alert
            show={state.alert.show}
            isError={state.alert.isError}
            title={state.alert.title}
            message={state.alert.message}
            isCloseable={state.alert.isCloseable}
            handleOnClose={hideAlert}
          />
        </div>
        <InstructionModal />
        <div className='h-full flex items-center'>
          <div className='bg-secondary rounded-md min-h-[72%] flex flex-col items-center ml-5 mr-5 flex-1 shadow-form'>
            <h1 className='font-title text-lg uppercase text-gray-900 text-center p-5'>
              opret opskrift
            </h1>
            <div className='space-y-4 h-90 w-full'>
              <div className='flex text-start ml-12 items-center mr-5'>
                <label
                  htmlFor='recipeName'
                  className='uppercase w-1/4 font-title text-sm'
                >
                  Navn:
                </label>
                <input
                  className='flex-1 text-sm font-text appearance-none block bg-gray-100 text-black border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='recipeName'
                  name='name'
                  type='text'
                  placeholder='Opskrift navn'
                />
              </div>
              <div className='flex text-start ml-12 items-center mr-5'>
                <label
                  htmlFor='recipeType'
                  className='uppercase w-1/4 font-title text-sm'
                >
                  Opskrift type:
                </label>
                <select
                  className='flex-1 text-sm font-text appearance-none block bg-gray-100 text-gray-500 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='recipeType'
                  name='type'
                >
                  {state.categories.map((category, index) => {
                    return <option key={index}>{category}</option>;
                  })}
                </select>
              </div>
              <div className='flex text-start ml-12 items-center mr-5'>
                <label
                  htmlFor='recipePrice'
                  className='uppercase w-1/4 font-title text-sm'
                >
                  Gns. pris
                </label>
                <input
                  className='flex-1 text-sm font-text appearance-none block bg-gray-100 text-black border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='recipePrice'
                  name='pricePerServing'
                  type='number'
                  placeholder='Gns. pris per servering'
                />
              </div>
              <div className='flex text-start ml-12 items-center mr-5'>
                <label
                  htmlFor='recipeReadyInMinutes'
                  className='uppercase w-1/4 font-title text-sm'
                >
                  Klar om (min.)
                </label>
                <input
                  className='flex-1 text-sm font-text appearance-none block bg-gray-100 text-black border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='recipeReadyInMinutes'
                  name='readyInMinutes'
                  type='number'
                  placeholder='Hvor lang tid tager opskriften at lave?'
                />
              </div>
              <div className='flex text-start ml-12 items-center mr-5'>
                <label
                  htmlFor='recipeReadyInMinutes'
                  className='uppercase w-1/4 font-title text-sm'
                >
                  Vigtige oplysninger
                </label>
                <RecipeValues />
              </div>
              <div className='flex text-start ml-12 items-center mr-5'>
                <label
                  htmlFor='newIngredient'
                  className='uppercase w-1/4 font-title text-sm self-start'
                >
                  Ny ingrediens
                </label>
                <SearchBar
                  placeholder={'Søg efter en ingrediens...'}
                  data={state.foods}
                  handleOnAdd={() => console.log('hi')}
                />
                <button
                  onClick={() => dispatch({ type: actions.NEW_INSTRUCTION })}
                  className='ml-4 bg-button text-sm font-title uppercase text-white self-start p-2 rounded w-[80px]'
                >
                  Tilføj
                </button>
                <button
                  onClick={() =>
                    dispatch({
                      type: actions.SHOW_INSTRUCTION_MODAL,
                      payload: true,
                    })
                  }
                  className='ml-4 bg-green-300 text-sm font-title uppercase text-black self-start p-2 rounded w-[50px]'
                >
                  VIS
                </button>
              </div>
              <div className='flex text-start ml-12 items-center mr-5'>
                <label
                  htmlFor='newInstruction'
                  className='uppercase w-1/4 font-title text-sm self-start'
                >
                  Ny instruktion
                </label>
                <textarea
                  className='flex-1 text-sm font-text appearance-none min-h-[52px] h-[52px] block bg-gray-100 text-black border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
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
                  placeholder='Angiv en instruks til hvordan skal opskriften følges! Rækkefølge kan ændres i "Vis"!'
                />
                <button
                  onClick={() => dispatch({ type: actions.NEW_INSTRUCTION })}
                  className='ml-4 bg-button text-sm font-title uppercase text-white self-start p-2 rounded w-[80px]'
                >
                  Tilføj
                </button>
                <button
                  onClick={() =>
                    dispatch({
                      type: actions.SHOW_INSTRUCTION_MODAL,
                      payload: true,
                    })
                  }
                  className='ml-4 bg-green-300 text-sm font-title uppercase text-black self-start p-2 rounded w-[50px]'
                >
                  VIS
                </button>
              </div>

              <div className='flex text-start ml-12 items-center mr-5'>
                <div className='w-1/4'></div>
                <button className='flex-1 mb-5 bg-red-300 text-sm font-title font-bold uppercase text-black self-start p-2 rounded'>
                  Upload opskrift
                </button>
              </div>
            </div>
          </div>
          <div className='min-h-[72%] mr-4 w-1/5'>
            <h1 className='self-start text-lg font-title uppercase font-bold'>
              FAQ
            </h1>
            <h1 className='self-start text-md font-title uppercase font-bold'>
              Hvorfor uploade en opskrift?
            </h1>
            <p className='text-xs font-text text-gray-500 text-justify'>
              Hos Min Kostplan går vi meget op i, at have en varieret række
              skræddersyet opskrifter lavet af vores team samt forbrugere. Dette
              kræver også en indsats fra vores brugere, og derfor har vi valgt,
              at for hver opskrift der uploades optjenes der 5 point, hvor at
              man til sidst efter 50 optjente point, kan få gratis medlemsskab.
              Som tak for ens bidrag.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  borderRadius: 7,
  // change background colour if dragging
  color: isDragging ? 'black' : 'white',
  background: isDragging ? 'lightgreen' : 'rgb(31 41 55)',
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.43) 0px 3px 6px',

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '#ffffff' : '#ffffff',
  borderRadius: 7,
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.53) 0px 3px 6px',
  padding: grid * 4,
});

const InstructionModal = () => {
  const { state, dispatch } = useRecipeReducer();

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(state.form.instructions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch({ type: actions.UPDATE_INSTRUCTIONS, payload: items });
  }

  return (
    <>
      <div
        className={`fixed w-[calc(100%-5rem)] h-full duration-[450ms] overflow-y-auto ${
          !state.showInstructionModal && 'transform scale-0 opacity-0'
        } bg-primary`}
      >
        <header className='flex flex-col'>
          <div className='m-2 flex justify-between'>
            <h1 className='font-title font-bold ml-6 tracking-widest uppercase text-2xl'>
              Instruktioner
            </h1>
            <BsX
              size={30}
              onClick={() =>
                dispatch({
                  type: actions.SHOW_INSTRUCTION_MODAL,
                  payload: false,
                })
              }
              className='hover:animate-spin cursor-pointer fill-red-700 hover:fill-red-900'
            />
          </div>
          <hr className='border-red-700' />
          <div className='flex justify-center m-6 text-white'>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable
                key='new-recipe-instructions'
                droppableId='new-recipe-instructions'
              >
                {(provided, snapshot) => (
                  <div
                    className='w-full'
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {state.form.instructions.length > 0 ? (
                      state.form.instructions.map((instruction, index) => (
                        <Draggable
                          key={instruction.id}
                          draggableId={instruction.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <div className='relative'>
                                <h1 className='font-title text-md font-bold'>
                                  {index + 1}.
                                </h1>
                                <p className='font-title text-sm'>
                                  {instruction.instruction}
                                </p>
                                <AiTwotoneDelete
                                  onClick={() => {
                                    dispatch({
                                      type: actions.DELETE_INSTRUCTION_BY_INSTRUCTION,
                                      payload: instruction.instruction,
                                    });
                                  }}
                                  className='absolute top-2 right-2 hover:fill-red-500 cursor-pointer hover:scale-105'
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <div>
                        <h1 className='text-black font-title text-red-800'>
                          Der er ingen instruktioner på hvordan retten skal
                          laves!
                        </h1>
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </header>
      </div>
    </>
  );
};

const RecipeValues = () => {
  const { state, dispatch } = useRecipeReducer();
  return (
    <fieldset className='flex-1'>
      <div className='flex'>
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
              <label htmlFor='isVegetarian' className='font-medium text-black'>
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
              <label htmlFor='isVegan' className='font-medium text-black'>
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
              <label htmlFor='isGlutenFree' className='font-medium text-black'>
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
              <label htmlFor='isDairyFree' className='font-medium text-black'>
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
              <label htmlFor='isHealthy' className='font-medium text-black'>
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
              <label htmlFor='isCheap' className='font-medium text-black'>
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
              <label htmlFor='isPopular' className='font-medium text-black'>
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
              <label htmlFor='isSustainable' className='font-medium text-black'>
                Er et bæredygtigt måltid?
              </label>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default RecipeWrapper;

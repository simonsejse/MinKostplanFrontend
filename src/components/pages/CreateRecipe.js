/**
 * React stuff
 */
import React, {
  useReducer,
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
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
import { v4 as uuidv4 } from 'uuid';

import recipeService from '../../services/recipe/recipe.service';
import foodService from '../../services/food/food.service';
import measurementService from '../../services/measures/measurement.service';
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
        console.log(res.data);
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
    measurementService
      .getAvailableMeasurements()
      .then((res) => {
        console.log(res.data);
        dispatch({ type: actions.SET_MEASUREMENTS, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: actions.CHANGE_ALERT_STATE,
          payload: {
            show: true,
            isError: true,
            isCloseable: false,
            title: 'Kunne ikke loade målinger!',
            message:
              'Kunne ikke loade mad målinger! Reload siden og sørg for at du er logget ind!',
          },
        });
      });
  }, []);
  /**
   * Lav et API request til RecipeType og så kan jeg tilføje til et "options" og vise til brugeren
   * og når jeg så sender request tilbage tjekker jeg allerede via @Valid om det er gyldigt
   */

  const createRecipeDTO = () => {
    return {
      name: state.form.name,
      description: state.form.description,
      type: state.form.type,
      image: 'DSC_0012.JPG',
      vegetarian: state.form.booleans.isVegetarian,
      vegan: state.form.booleans.isVegan,
      glutenFree: state.form.booleans.isGlutenFree,
      dairyFree: state.form.booleans.isDairyFree,
      veryHealthy: state.form.booleans.isHealthy,
      cheap: state.form.booleans.isCheap,
      veryPopular: state.form.booleans.isPopular,
      sustainable: state.form.booleans.isSustainable,
      readyInMinutes: state.form.readyInMinutes,
      pricePerServing: state.form.pricePerServing,
      instructions: `<ul>
        ${state.form.instructions.map((instruction) => {
          return `<li>${instruction.instruction}</li>`;
        })}</ul>`,
      ingredients: [
        ...state.form.ingredients.map((ingredient) => {
          return {
            foodId: ingredient.ingredientById,
            amount: ingredient.grams,
            measures: {
              type: ingredient.unit,
              amountOfType: ingredient.amountOwnUnit,
              amountInGrams: ingredient.grams,
            },
            meta: ingredient.metaList.map((meta) => meta.name),
          };
        }),
      ],
      analyzedInstructions: [
        ...state.form.instructions.map((instruction, idx) => {
          return {
            number: idx,
            step: instruction.instruction,
          };
        }),
      ],
    };
  };

  const submitRecipe = () => {
    const recipe = createRecipeDTO();
    recipeService.newRecipe(recipe).then(
      (res) => {
        console.log(recipe);
        console.log('success');
      },
      (error) => {
        console.log(error.response);
        dispatch({
          type: actions.CHANGE_ALERT_STATE,
          payload: {
            show: true,
            isError: true,
            isCloseable: true,
            title: 'Kunne ikke uploade ny opskrift!',
            message: error.response.data?.errors || error.response.data?.error,
          },
        });
      }
    );
  };
  const alertRef = useRef();
  return (
    <>
      <div className='flex-1 bg-primary'>
        <Alert
          ref={alertRef}
          isError={state.alert.isError}
          isCloseable={state.alert.isCloseable}
        >
          {state.alert.message}
        </Alert>

        <IngredientInstructionModal />
        <PickFoodModal />
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
                  value={state.form.name}
                  onChange={(e) => {
                    dispatch({
                      type: actions.CHANGE_FORM_DATA,
                      payload: {
                        dataToBeChanged: e.target.name,
                        value: e.target.value,
                      },
                    });
                  }}
                  type='text'
                  placeholder='Opskrift navn'
                />
              </div>
              <div className='flex text-start ml-12 items-center mr-5'>
                <label
                  htmlFor='foodDescription'
                  className='uppercase w-1/4 font-title text-sm self-start'
                >
                  Beskrivelse
                </label>
                <textarea
                  className='flex-1 text-sm font-text appearance-none min-h-[52px] h-[52px] block bg-gray-100 text-black border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='foodDescription'
                  name='description'
                  value={state.form.description}
                  onChange={(e) =>
                    dispatch({
                      type: actions.CHANGE_FORM_DATA,
                      payload: {
                        dataToBeChanged: e.target.name,
                        value: e.target.value,
                      },
                    })
                  }
                  placeholder='Giv kort introduktion til opskriften!'
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
                  value={state.form.type}
                  onChange={(e) => {
                    dispatch({
                      type: actions.CHANGE_FORM_DATA,
                      payload: {
                        dataToBeChanged: e.target.name,
                        value: e.target.value,
                      },
                    });
                  }}
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
                  value={state.form.pricePerServing}
                  onChange={(e) => {
                    dispatch({
                      type: actions.CHANGE_FORM_DATA,
                      payload: {
                        dataToBeChanged: e.target.name,
                        value: e.target.value,
                      },
                    });
                  }}
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
                  value={state.form.readyInMinutes}
                  onChange={(e) => {
                    dispatch({
                      type: actions.CHANGE_FORM_DATA,
                      payload: {
                        dataToBeChanged: e.target.name,
                        value: e.target.value,
                      },
                    });
                  }}
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
                  handleOnAdd={(food) => {
                    console.log('we call');
                    dispatch({
                      type: actions.SHOW_PICK_FOOD_MODAL,
                      payload: {
                        show: true,
                        currentFood: food,
                      },
                    });
                  }}
                />
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
              </div>
              <div className='flex text-start ml-12 items-center mr-5'>
                <label
                  htmlFor='newInstruction'
                  className='uppercase w-1/4 font-title text-sm self-start'
                >
                  Instruktioner
                  <br />
                  ingredienser
                </label>
                <button
                  onClick={() => {
                    dispatch({
                      type: actions.SHOW_INGREDIENTS_FOOD_MODAL,
                      payload: true,
                    });
                  }}
                  className='bg-green-300 text-sm font-title uppercase text-black self-start p-2 rounded flex-1'
                >
                  Vis ingredienser/instruktioner
                </button>
              </div>
              <div className='flex text-start ml-12 items-center mr-5'>
                <div className='w-1/4'></div>
                <button
                  onClick={() => {
                    submitRecipe();
                  }}
                  className='flex-1 mb-5 bg-red-300 text-sm font-title font-bold uppercase text-black self-start p-2 rounded'
                >
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
            <div className='w-[350px] min-h-[46px] max-h-[450px] overflow-y-auto mt-5 flex bg-secondary shadow-form p-2 rounded-lg'>
              <ul className='w-full flex-wrap flex -m-[10px] flex-row pl-0'>
                <h1 className='w-full m-[10px] font-extrabold font-title text-xl'>
                  Opskrift tags
                  <i className='flex font-title text-sm'>
                    Gør retten nemmere at finde ved hjælp af søge tags!
                  </i>
                </h1>

                {/*state.foodModal.form.metaList.map((meta) => {
                  return (
                    <li
                      key={meta.id}
                      className='m-[10px] relative flex items-center w-auto text-white mr-2 p-2 pr-8 bg-blue-500 hover:bg-blue-400 rounded-md'
                    >
                      <span className='font-title'>{meta.name}</span>
                      <BsX
                        size={35}
                        fill='white'
                        onClick={() => {
                          dispatch({
                            type: actions.DELETE_META_BY_ID,
                            payload: meta.id,
                          });
                        }}
                        className='absolute right-0 cursor-pointer'
                      />
                    </li>
                  );
                })*/}
                <input
                  type='text'
                  placeholder='Tilføj opskrift tag'
                  name='meta'
                  value={state.foodModal.form.meta}
                  onChange={(e) => {
                    dispatch({
                      type: actions.CHANGE_FOOD_MODAL_FORM,
                      payload: { name: e.target.name, value: e.target.value },
                    });
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      const newMeta = {
                        id: uuidv4(),
                        name: state.foodModal.form.meta,
                      };
                      dispatch({ type: actions.NEW_META, payload: newMeta });
                      dispatch({ type: actions.RESET_META_FORM });
                    }
                  }}
                  className='flex-1 border-0 focus:ring-0 focus:outline-none p-2 m-[10px]'
                />
              </ul>
            </div>
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
  color: 'black',
  background: isDragging ? 'lightgreen' : 'white',
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.43) 0px 3px 6px',

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'start',
  background: isDraggingOver ? 'transparent' : 'transparent',
  borderRadius: 7,
  //boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.53) 0px 3px 6px',
});

const PickFoodModal = () => {
  const { state, dispatch } = useRecipeReducer();

  const addNewIngredient = () => {
    const newIngredient = {
      id: uuidv4(),
      ingredientById: state.foodModal?.currentFood?.food_id,
      ingredientByName: state.foodModal?.currentFood?.food_name,
      grams: state.foodModal.form?.grams,
      amountOwnUnit: state.foodModal.form?.amountOwnUnit,
      unit: state.foodModal.form?.unit,
      metaList: state.foodModal.form?.metaList,
    };

    dispatch({ type: actions.NEW_INGREDIENT, payload: newIngredient });
    dispatch({ type: actions.RESET_INGREDIENT_FORM });
  };

  return (
    <div
      className={`fixed w-[calc(100%-5rem)] h-full duration-[450ms] overflow-y-auto ${
        !state.foodModal.show && 'transform scale-0 opacity-0'
      } bg-primary`}
    >
      <header className='relative'>
        <BsX
          size={35}
          onClick={() =>
            dispatch({
              type: actions.SHOW_PICK_FOOD_MODAL,
              payload: {
                show: false,
                currentFood: undefined,
              },
            })
          }
          className='absolute top-2 right-2 hover:animate-spin cursor-pointer fill-red-700 hover:fill-red-900'
        />
      </header>
      <form
        className='h-full flex flex-col justify-center items-center space-y-2'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className='bg-secondary shadow-form p-4 w-[500px] rounded'>
          <h1 className='font-bold tracking-wide text-xl font-text'>
            Ingrediens:
          </h1>
          <div className='flex'>
            <div className='w-1/3 ml-5 font-title'>
              <h1>Navn</h1>
            </div>
            <div className='flex-1'>
              <h1 className='font-title'>
                {state.foodModal.currentFood?.food_name}
              </h1>
            </div>
          </div>
          <div className='flex'>
            <div className='w-1/3 ml-5 font-title'>
              <h1 className='font-title'>ID</h1>
            </div>
            <div className='flex-1'>
              <h1 className='font-title'>
                {state.foodModal.currentFood?.food_id}
              </h1>
            </div>
          </div>
          <div className='flex'>
            <div className='w-1/3 ml-5 font-title'>
              <h1>Kj/Kcal</h1>
            </div>
            <div className='flex-1'>
              <h1 className='font-title'>
                {state.foodModal.currentFood?.food_kj}kJ/
                {state.foodModal.currentFood?.food_kcal}kcal
              </h1>
            </div>
          </div>
          <div className='flex'>
            <div className='w-1/3 ml-5 font-title'>
              <h1>Fedt</h1>
            </div>
            <div className='flex-1'>
              <h1 className='font-title'>
                {state.foodModal.currentFood?.food_fat} f.
              </h1>
            </div>
          </div>
          <div className='flex'>
            <div className='w-1/3 ml-5 font-title'>
              <h1>Kulhydrater</h1>
            </div>
            <div className='flex-1'>
              <h1 className='font-title'>
                {state.foodModal.currentFood?.food_carbs} k.
              </h1>
            </div>
          </div>
          <div className='flex'>
            <div className='w-1/3 ml-5 font-title'>
              <h1>Tilføjet sukkerarter</h1>
            </div>
            <div className='flex-1'>
              <h1 className='font-title'>
                {state.foodModal.currentFood?.food_added_sugars} s.
              </h1>
            </div>
          </div>
          <div className='flex'>
            <div className='w-1/3 ml-5 font-title'>
              <h1>Protein</h1>
            </div>
            <div className='flex-1'>
              <h1 className='font-title'>
                {state.foodModal.currentFood?.food_protein} p.
              </h1>
            </div>
          </div>
          <div className='flex'>
            <div className='w-1/3 ml-5 font-title'>
              <h1>Kostfibre</h1>
            </div>
            <div className='flex-1'>
              <h1 className='font-title'>
                {state.foodModal.currentFood?.food_fibers} kf.
              </h1>
            </div>
          </div>
        </div>
        <div className='w-[500px] min-h-[46px] flex bg-secondary shadow-lg p-2 rounded'>
          <ul className='w-full flex-wrap flex -m-[10px] flex-row pl-0'>
            {state.foodModal.form.metaList.map((meta) => {
              return (
                <li
                  key={meta.id}
                  className='m-[10px] relative flex items-center w-auto text-white mr-2 p-2 pr-8 bg-blue-500 hover:bg-blue-400 rounded-md'
                >
                  <span className='font-title'>{meta.name}</span>
                  <BsX
                    size={35}
                    fill='white'
                    onClick={() => {
                      dispatch({
                        type: actions.DELETE_META_BY_ID,
                        payload: meta.id,
                      });
                    }}
                    className='absolute right-0 cursor-pointer'
                  />
                </li>
              );
            })}
            <input
              type='text'
              placeholder='Tilføj ingrediens meta'
              name='meta'
              value={state.foodModal.form.meta}
              onChange={(e) => {
                dispatch({
                  type: actions.CHANGE_FOOD_MODAL_FORM,
                  payload: { name: e.target.name, value: e.target.value },
                });
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  const newMeta = {
                    id: uuidv4(),
                    name: state.foodModal.form.meta,
                  };
                  dispatch({ type: actions.NEW_META, payload: newMeta });
                  dispatch({ type: actions.RESET_META_FORM });
                }
              }}
              className='flex-1 border-0 focus:ring-0 focus:outline-none p-2 m-[10px]'
            />
          </ul>
        </div>
        <div className='w-[500px] flex'>
          <input
            value={state.foodModal.form.grams}
            name='grams'
            onChange={(e) => {
              dispatch({
                type: actions.CHANGE_FOOD_MODAL_FORM,
                payload: { name: e.target.name, value: e.target.value },
              });
            }}
            placeholder='Mængde i GRAM'
            step='0.01'
            type='number'
            className='w-full p-2 rounded shadow-lg border-0'
          />
        </div>
        <div className='w-[500px] flex justify-between'>
          <input
            value={state.foodModal.form.amountOwnUnit}
            name='amountOwnUnit'
            onChange={(e) => {
              dispatch({
                type: actions.CHANGE_FOOD_MODAL_FORM,
                payload: { name: e.target.name, value: e.target.value },
              });
            }}
            placeholder='Mængde i egen måling'
            step='0.01'
            type='number'
            className='p-2 rounded shadow-lg flex-1 mr-4 border-0'
          />

          <select
            name='unit'
            value={state.foodModal.form.unit}
            onChange={(e) => {
              dispatch({
                type: actions.CHANGE_FOOD_MODAL_FORM,
                payload: {
                  name: e.target.name,
                  value: e.target.value,
                },
              });
            }}
            className='border-0 rounded shadow-lg'
          >
            {state.measurements.map((measure) => {
              return (
                <option key={measure.name} value={measure.name}>
                  {measure.displayName}
                </option>
              );
            })}
          </select>
        </div>
        <button
          onClick={() => {
            addNewIngredient();
          }}
          className='w-[500px] bg-pink-300 p-4 rounded-lg font-title text-black tracking-wide font-extrabold uppercase shadow-pink transform duration-300 hover:bg-pink-400 hover:text-white hover:-translate-y-1'
        >
          Tilføj ingrediens
        </button>
      </form>
    </div>
  );
};

const IngredientInstructionModal = () => {
  const { state, dispatch } = useRecipeReducer();

  function handleOnDragEndInstructions(result) {
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
          !state.showFoodAndInstructionModal && 'transform scale-0 opacity-0'
        } bg-primary`}
      >
        <header className='flex h-full divide-x-2 divide-card divide-x-reverse relative'>
          <BsX
            size={30}
            onClick={() =>
              dispatch({
                type: actions.SHOW_INGREDIENTS_FOOD_MODAL,
                payload: false,
              })
            }
            className='absolute top-0 right-0 hover:animate-spin cursor-pointer fill-white hover:fill-gray-400'
          />

          <div className='w-full h-full bg-primary'>
            <div className='flex flex-col items-center text-white h-full'>
              <div className='w-full bg-card min-h-[150px] p-5'>
                <h1 className='font-title uppercase text-white font-extrabold text-2xl'>
                  Ingredienser
                </h1>
                <p className='text-gray-300 font-title font-extrabold font-extrabold tracking-widest text-sm text-start'>
                  Hver ingrediens er givet med en helt specifik instruktion for
                  den givne ingrediens! Ryk rundt på ingredienserne,
                </p>
              </div>
              <div className='w-full h-full p-5'>
                {state.form.ingredients.length > 0 ? (
                  state.form.ingredients.map((ingredient, index) => (
                    <div className='w-full'>
                      <div className='relative shadow-form bg-secondary rounded-lg p-5 text-black'>
                        <h1 className='font-title text-md font-bold'>
                          {index + 1}.
                        </h1>
                        <span className='flex justify-between w-full font-title text-sm'>
                          <h1>Ingrediens:</h1>
                          <h1>{ingredient?.ingredientByName}</h1>
                        </span>
                        <p className='flex justify-between w-full font-title text-sm'>
                          {ingredient?.grams} gram | {ingredient?.amountOwnUnit}{' '}
                          {
                            state.measurements.find((measure) => {
                              console.log(measure);
                              console.log(ingredient?.unit);
                              return measure.name === ingredient.unit;
                            })?.displayName
                          }
                        </p>
                        {ingredient.metaList.length > 0 && (
                          <p>
                            Tags:{' '}
                            {ingredient.metaList.map((meta) => {
                              return (
                                <span className='after:content-[",_"] last:after:content-["."]'>
                                  {meta.name}
                                </span>
                              );
                            })}
                          </p>
                        )}
                        <AiTwotoneDelete
                          onClick={() => {
                            dispatch({
                              type: actions.DELETE_INGREDIENT_BY_ID,
                              payload: ingredient.id,
                            });
                          }}
                          className='absolute top-2 right-2 hover:fill-red-500 cursor-pointer hover:scale-105'
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <h1 className='text-black font-title text-red-800'>
                      Der er ingen ingredienser på retten! Gå tilbage og tilføj
                      nogen!
                    </h1>
                  </div>
                )}
              </div>
              )}
            </div>
          </div>
          <div className='w-full h-full bg-primary'>
            <div className='flex flex-col items-center text-white h-full'>
              <DragDropContext onDragEnd={handleOnDragEndInstructions}>
                <div className='w-full bg-card min-h-[150px] p-5'>
                  <h1 className='font-title uppercase text-white font-extrabold text-2xl'>
                    Instruktion
                  </h1>
                  <p className='text-gray-300 font-title font-extrabold font-extrabold tracking-widest text-sm text-start'>
                    Hver instruktion her repræsentere samlet set hvordan hele
                    retten skal sammen sættes, og i hvilken rækkefølge de skal
                    udføres i. Ryk rundt på rækkefølge alt efter hvordan
                    instruktionerne skal følges.
                  </p>
                </div>
                <Droppable
                  key='new-recipe-instructions'
                  droppableId='new-recipe-instructions'
                >
                  {(provided, snapshot) => (
                    <div
                      className='w-full h-full p-5'
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
                                className='w-full'
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

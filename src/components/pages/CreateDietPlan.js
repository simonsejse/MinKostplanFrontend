/**
 * React stuff
 */
import React, { useEffect, useReducer, useRef, useState } from 'react';

/**
 * Contexts
 */
import { useAuth } from '../../contexts/auth.context';

/**
 * Components
 */
import DropDownSelect from '../DropDownSelect';

/* Reducers */
import {
  reducer,
  initialState,
  actions,
} from '../../reducers/create-diet-plan-reducer';
/**
 *
 * Stylesheets
 */
import '../../css/CreateRecipe.css';

import foodService from '../../services/food/food.service';

/**
 * icons
 */
import { FaUserCircle } from 'react-icons/fa';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsX } from 'react-icons/bs';
import {
  BiTime,
  BiDollarCircle,
  BiDialpad,
  BiBookBookmark,
  BiPlus,
  BiFoodMenu,
} from 'react-icons/bi';

import { MdClose } from 'react-icons/md';
import { FcCheckmark, FcCancel } from 'react-icons/fc';
import ingredients from '../../images/managerecipes/ingredients.png';
import instructions from '../../images/managerecipes/instructions.png';
import description from '../../images/managerecipes/description.png';
import about from '../../images/managerecipes/about.png';
import info from '../../images/managerecipes/info.png';

/**
 * Reusable Components
 */
import Alert, { useAlert } from '../reusable-components/Alert';
import Tags from '../reusable-components/Tags';
import SearchBar from '../reusable-components/SearchBar';
import HoverableCard from '../reusable-components/HoverableCard';
import RecipeModal from '../modals/RecipeModal';

import { motion, AnimatePresence } from 'framer-motion';

/**
 * Services
 */
import userService from '../../services/user/user.service';
import recipeService from '../../services/recipe/recipe.service';

/**
 * css
 */
import '../../css/CreateDietplan.css';
/**
 * utils
 */
import { calculateAgeFromBirthDate } from '../../utils/UserUtils';

/**
 * Mui
 */
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const sidebarVariants = {
  show: { width: '400px' },
  hide: { width: 0 },
};

const CreateDietPlan = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useAlert();

  const [state, dispatch] = useReducer(reducer, initialState);

  const modalRef = useRef();
  const tagsRef = useRef();

  useEffect(() => {
    const promise1 = userService.getUserInfoForSidebar().then((response) => {
      dispatch({
        type: actions.SET_USER_INFO,
        payload: {
          ...response.data,
          age: calculateAgeFromBirthDate(new Date(response.data.birthday)),
        },
      });
    });

    const promise2 = recipeService
      .getPageOfRecipesForCreateDietPlan(state.page)
      .then((recipes) => {
        dispatch({
          type: actions.SET_RECIPES,
          payload: recipes.data,
        });
      });

    const promise3 = foodService.getAllFoodDTOs().then((res) => {
      dispatch({ type: actions.UPDATE_FOOD, payload: res.data });
    });

    Promise.all([promise1, promise2, promise3]).catch((error) => {
      showError({
        message: 'Kunne ikke loade alt dataen!',
        closeable: false,
      });
    });
  }, []);

  const goToNextSection = () => {
    dispatch({ type: actions.NEXT_SECTION, payload: state.section });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const goToPreviousSection = () => {
    dispatch({ type: actions.PREV_SECTION, payload: state.section });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const changeValue = (name, value) => {
    dispatch({
      type: actions.CHANGE_SECTION_ONE_FORM_VALUES,
      payload: { name, value },
    });
  };

  const changeMealDistributions = (mealName, value) => {
    dispatch({
      type: actions.CHANGE_SECTION_ONE_FORM_MEAL_DISTRIBUTION_VALUES,
      payload: {
        name: mealName,
        value: value,
      },
    });
  };

  const setDropDownValue = (value) => {
    dispatch({
      type: actions.CHANGE_SECTION_ONE_FORM_VALUES,
      payload: { name: 'purpose', value },
    });
  };

  const fetchRecipeById = async (id) => {
    return recipeService.getRecipeById(id);
  };

  const items = [];
  for (let i = 0; i < state.sectionOne.mealCount; i++) {
    items.push(
      <div className='w-64' key={i}>
        <label
          className='block uppercase tracking-wide text-black text-xs font-bold'
          htmlFor='a-meal'
        >
          Måltid {i + 1}
        </label>
        <input
          className={`w-full appearance-none block bg-gray-200 border border-gray-300 shadow-lg text-gray-700 rounded-lg py-3 px-4 leading-tight focus:outline-none`}
          id={`a-meal-${i}`}
          name='a-meal'
          value={state.sectionOne.mealDistribution[`meal_${i + 1}`]}
          onChange={(e) =>
            changeMealDistributions(`meal_${i + 1}`, e.target.value)
          }
          type='number'
          placeholder='Måltid-fordeling i %'
        ></input>
      </div>
    );
  }

  return (
    <div className='flex-1 background-pattern-topography'>
      <RecipeReadMore modalRef={modalRef} recipe={state.currentRecipe} />
      <Sidebar tagsRef={tagsRef} state={state} dispatch={dispatch} />
      <div className='h-full flex flex-col justify-center space-y-4'>
        <StepperHeader state={state} dispatch={dispatch} />

        <section className='transform duration-300 mx-auto rounded-md w-full max-w-90 h-fit overflow-hidden'>
          <AnimatePresence>
            {state.section === 1 && (
              <motion.div
                key='section-one'
                initial={{
                  opacity: 0,
                  x: 1000,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: 0.6, duration: 0.4 },
                }}
                exit={{ opacity: 0, x: 1000 }}
                id='div-content'
                className='p-[50px] space-y-4 max-h-full'
              >
                <div id='form-row' className='flex items-center'>
                  <label
                    className='w-[200px] text-lg font-oswald font-normal uppercase text-gray-600 leading-none'
                    id='diet-plan-name'
                  >
                    Kostplan navn
                  </label>
                  <div className='flex-1'>
                    <input
                      type='text'
                      name='name'
                      value={state.sectionOne.name}
                      onChange={(e) =>
                        changeValue(e.target.name, e.target.value)
                      }
                      className='p-3 w-1/3 shadow-lg bg-gray-200 border rounded border-gray-300 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800'
                      aria-label='diet-plan-name'
                      aria-required='true'
                      placeholder='Navn på kostplan'
                    />
                  </div>
                </div>
                <div id='form-row' className='flex items-center'>
                  <label
                    className='w-[200px] text-lg font-oswald font-normal uppercase text-gray-600 leading-none'
                    id='diet-plan-name'
                  >
                    Formål
                  </label>
                  <div className='flex-1'>
                    <DropDownSelect
                      value={state.sectionOne.purpose}
                      setValue={setDropDownValue}
                    />
                  </div>
                </div>
                <div id='form-row' className='flex items-center'>
                  <label
                    className='w-[200px] text-lg font-oswald font-normal uppercase text-gray-600 leading-none'
                    id='diet-plan-name'
                  >
                    Tags
                  </label>
                  <div className='flex-1'>
                    <div className='w-1/2'>
                      <Tags
                        text='Tilføj opskrift tags! Eksempelvis. sundt, bla. bla.. osv.'
                        ref={tagsRef}
                      />
                    </div>
                  </div>
                </div>
                <div className='divide-y divide-gray-600 mb-5 mt-5'>
                  <div />
                  <div />
                </div>
                <section className='flex flex-col md:flex-row justify-between'>
                  <div className='m-4 md:m-0 md:w-1/2 md:divide-x-reverse md:divide-x-2 divide-gray-600'>
                    <h1 className='text-black font-poppins text-xl font-bold block uppercase tracking-wide'>
                      makrofordeling
                    </h1>
                    <p className='text-black font-poppins md:pr-4'>
                      Hvad er makrofordeling, og hvorfor er det relevant, når
                      jeg skal opbygge min kostplan. Makroer er en
                      fællesbetegnelse for kulhydrater, fedt og protein.
                      Fordelingen er så, hvordan vi fordeler hhv. protein,
                      kulhydrat og protein som udgør vores samlede mængde
                      kalorier. Derfor har vi fokus på, at du får dine kalorier
                      fra de rigtige makronæringsstoffer. Disse får du gennem
                      kulhydrat, protein og fedt. Og det er denne fordeling, som
                      kaldes for makrofordelingen (eller makrotal, hvis disse
                      regnes i tal). Herunder ses normale makrofordelinger for
                      hhv. vægttab, vedligeholdelse samt muskelopbygning.
                    </p>
                    <div className='pt-6 mb-4'>
                      <table className='w-full table-fixed transform duration-150 text-xs lg:text-[16px] text-center text-black divide-x-2 divide-y-2 divide-gray-600'>
                        <thead>
                          <tr>
                            <th className='break-all'>Vægttab</th>
                            <th className='break-all'>Vedligeholdelse</th>
                            <th className='break-all'>Muskelopbygning</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>35% Protein</td>
                            <td>15% Protein</td>
                            <td>25% Protein</td>
                          </tr>
                          <tr>
                            <td>50% Kulhydrat</td>
                            <td>55% Kulhydrat</td>
                            <td>40% Kulhydrat</td>
                          </tr>
                          <tr>
                            <td>
                              15% Fedt <br />
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: actions.CHANGE_MACROS,
                                    payload: {
                                      proteinMacro: 35,
                                      carbsMacro: 50,
                                      fatMacro: 15,
                                    },
                                  })
                                }
                                className='px-5 py-2 text-black rounded-full bg-cyan-500 hover:bg-cyan-700 hover:shadow-xl shadow-lg shadow-cyan-500/60 mt-2 transform duration-300 hover:tracking-widest hover:cursor-pointer font-bold '
                              >
                                Vælg
                              </button>
                            </td>
                            <td>
                              30% Fedt <br />
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: actions.CHANGE_MACROS,
                                    payload: {
                                      proteinMacro: 15,
                                      carbsMacro: 55,
                                      fatMacro: 30,
                                    },
                                  })
                                }
                                className='px-5 py-2 text-black rounded-full bg-cyan-500 hover:bg-cyan-700 hover:shadow-xl shadow-lg shadow-cyan-500/60 mt-2 transform duration-300 hover:tracking-widest hover:cursor-pointer font-bold '
                              >
                                Vælg
                              </button>
                            </td>
                            <td>
                              35% Fedt
                              <br />
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: actions.CHANGE_MACROS,
                                    payload: {
                                      proteinMacro: 25,
                                      carbsMacro: 40,
                                      fatMacro: 35,
                                    },
                                  })
                                }
                                className='px-5 py-2 text-black rounded-full bg-cyan-500 hover:bg-cyan-700 hover:shadow-xl shadow-lg shadow-cyan-500/60 mt-2 transform duration-300 hover:tracking-widest hover:cursor-pointer font-bold '
                              >
                                Vælg
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className='md:grid md:grid-rows-3 m-4 space-y-4 md:space-y-0 md:m-0 gap-4'>
                    <div className='w-full md:ml-4 md:w-64 md:mb-0'>
                      <label
                        className='block uppercase tracking-wide text-black text-xs font-bold mb-2'
                        htmlFor='proteinMacro'
                      >
                        Protein
                      </label>
                      <input
                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        id='proteinMacro'
                        name='proteinMacro'
                        value={state.sectionOne.proteinMacro}
                        onChange={(e) =>
                          changeValue(e.target.name, e.target.value)
                        }
                        type='number'
                        placeholder='Protein i %'
                      ></input>
                    </div>
                    <div className='w-full md:ml-4 md:w-64 md:mb-0'>
                      <label
                        className='block uppercase tracking-wide text-black text-xs font-bold mb-2'
                        htmlFor='carbsMacro'
                      >
                        Kulhydrat
                      </label>
                      <input
                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        id='carbsMacro'
                        name='carbsMacro'
                        value={state.sectionOne.carbsMacro}
                        onChange={(e) =>
                          changeValue(e.target.name, e.target.value)
                        }
                        type='number'
                        placeholder='Kulhydrat i %'
                      ></input>
                    </div>
                    <div className='w-full md:ml-4 md:w-64 md:mb-0'>
                      <label
                        className='block uppercase tracking-wide text-black text-xs font-bold mb-2'
                        htmlFor='fatMacro'
                      >
                        Fedt
                      </label>
                      <input
                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        id='fatMacro'
                        name='fatMacro'
                        value={state.sectionOne.fatMacro}
                        onChange={(e) =>
                          changeValue(e.target.name, e.target.value)
                        }
                        type='number'
                        placeholder='Fedt i %'
                      ></input>
                    </div>
                  </div>
                </section>
                <div className='divide-y divide-gray-600 mb-5 mt-5'>
                  <div></div>
                  <div></div>
                </div>
                <section className='h-[200px] overflow-y-auto'>
                  <header>
                    <h1 className='text-center md:text-left md:ml-4 text-gray-100 text-xl font-bold block uppercase tracking-wide'>
                      Måltider
                    </h1>
                  </header>
                  <div className='flex flex-col items-center md:items-start md:flex-row md:justify-between'>
                    <div className='md:w-2/5 m-4 md:m-0'>
                      <label
                        htmlFor='mealCount'
                        className='text-center ml-3 md:pl-4 text-black'
                      >
                        Antal måltider
                      </label>
                      <div className='flex justify-center md:justify-start md:ml-4 md:mt-2'>
                        <input
                          type='range'
                          className='hover:animate-pulse w-full transform duration-300 appearance-none bg-transparent px-4 py-1 border-4 border-double border-blue-500 shadow-blue-500/50 rounded-full shadow-lg'
                          value={state.sectionOne.mealCount}
                          onChange={(e) =>
                            changeValue(e.target.name, e.target.value)
                          }
                          name='mealCount'
                          min='1'
                          max='5'
                          step='1'
                          id='mealCount'
                        />
                        <output className='ml-3 text-black text-2xl font-bold'>
                          {state.sectionOne.mealCount}
                        </output>
                      </div>
                    </div>

                    <div className='flex flex-col space-y-4 mb-4'>{items}</div>
                  </div>
                </section>
                <div className='divide-y divide-gray-600 mb-5 mt-5'>
                  <div></div>
                  <div></div>
                </div>
                <section>
                  <header>
                    <h1 className='m-4 md:m-0 text-black text-xl font-bold block uppercase tracking-wide'>
                      Vægttab - Vedligeholdelse - Muskelopbygning
                    </h1>
                    <p className='m-4 md:m-0 text-black font-poppins text-[14px] block tracking-wide'>
                      Forestil dig din krop som et regnestykke. Er du en
                      gennemsnitlig mand forbrænder du ca. 2.200 kalorier
                      dagligt, og er du en gennemsnitlig kvinde forbrænder du
                      1.800 kalorier. Det vil sige, at hvis du indtager dette
                      antal kalorier på en dag, vil du hverken tabe dig eller
                      tage på (ligevægtsindtag). Indtager du flere kalorier, end
                      du forbrænder, tager du på. Indtager du færre kalorier,
                      taber du dig. Det er ikke sikkert, at du ligger inden for
                      gennemsnittet. Der er mange faktorer, der spiller ind på
                      hvilket vedligeholdelsesindtag, du har. Det kan f.eks.
                      være din alder, vægt, motion og hvor aktiv du er i
                      hverdagen.
                      <br />
                      Vil du gerne regulere din vægt, kan du enten øge dit
                      kalorieindtag eller reducere det. Ved et vægttab kan
                      kalorieindtaget reduceres med ca. 500 kcal dagligt. Det
                      vil give et vægttab på cirka 0,5 kg. om ugen. Er du
                      derimod i mellem 500 og 1000 kalorier i underskud om
                      dagen, vil dette give et vægttab på 0,5-1 kg pr uge. Denne
                      kaloriereduktion er langt nemmere at håndtere og bevare.
                      Som vægten falder, bliver det for mange sværere at tabe
                      sig. Du skal derfor være tålmodig og vedholdende.
                    </p>

                    <h1 className='m-4 md:m-0 md:mt-4 text-black text-xl font-bold block uppercase tracking-wide'>
                      Til det store spørgsmål - hvor mange kilo vil du
                      tabe/opbygge pr. uge?
                    </h1>
                    <p className='m-4 md:m-0 text-black text-[14px] block tracking-wide'>
                      (0 hvis vedligeholdelsesindtag)
                    </p>
                    <div className='flex justify-center md:justify-start'>
                      <input
                        className='appearance-none shadow-lg block w-60 bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        type='number'
                        placeholder='Kilo pr. uge'
                      />
                    </div>
                  </header>
                </section>

                <div className='w-full flex justify-end'>
                  <button
                    onClick={() => goToNextSection()}
                    className='flex self-end bg-accent p-4 text-right text-white rounded-md pr-6'
                  >
                    <svg
                      className='w-6 h-6 text-gray-400'
                      fill='white'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                        clip-rule='evenodd'
                      ></path>
                    </svg>
                    {state.section <= 2 ? 'Næste' : 'Færdiggør'}
                  </button>
                </div>
              </motion.div>
            )}
            {state.section === 2 && (
              <motion.div
                key='section-two'
                initial={{
                  opacity: 0,
                  x: 1000,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: 0.6, duration: 0.4 },
                }}
                exit={{ opacity: 0, x: 1000 }}
                id='div-content'
                className='p-[50px] space-y-4 h-full'
              >
                <SectionTwo
                  fetchRecipeById={fetchRecipeById}
                  modalRef={modalRef}
                  goToPreviousSection={goToPreviousSection}
                  goToNextSection={goToNextSection}
                  state={state}
                  dispatch={dispatch}
                />
              </motion.div>
            )}
            {state.section === 3 && (
              <motion.div
                key='section-three'
                initial={{
                  opacity: 0,
                  x: 1000,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: 0.6, duration: 0.4 },
                }}
                exit={{ opacity: 0, x: 1000 }}
              >
                <SectionThree />
              </motion.div>
            )}
            {state.section === 4 && (
              <motion.div
                key='section-four'
                initial={{
                  opacity: 0,
                  x: 1000,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: 0.6, duration: 0.4 },
                }}
                exit={{ opacity: 0, x: 1000 }}
              >
                section 4
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

const Sidebar = ({ state, dispatch, tagsRef }) => {
  console.log(tagsRef);

  return (
    <motion.section
      animate={state.showSidebar ? 'show' : 'hide'}
      variants={sidebarVariants}
      transitionEnd={{ display: 'none' }}
      className='fixed right-0 h-full max-h-full z-50 backdrop-blur-sm background-pattern-temple'
    >
      <div className='-z-10 absolute bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-500 h-full w-full opacity-60' />
      <header>
        <MdClose
          onClick={() => dispatch({ type: actions.TOGGLE_SIDEBAR })}
          fill='white'
          size={45}
          className='cursor-pointer'
        />
      </header>
      <div id='sidebar-content' className='p-5 text-white'>
        <header className='space-y-2 pb-4 border-b-2'>
          <div className='max-w-full break-words'>
            <div className='w-full p-3 mb-4 rounded-md bg-gradient-to-r from-purple-300'>
              <h1 className='text-lg uppercase text-[#212127] tracking-wide font-["Nunito_Sans"]'>
                Bruger info
              </h1>
            </div>
            <div className='max-w-full break-words divide-y divide-gray-300'>
              <h1 className='uppercase text-gray-200 font-["Nunito_Sans"] flex justify-between'>
                <span>Navn</span>
                <span>📛</span>
              </h1>
              <p>{state.user.username}</p>
            </div>
            <div className='max-w-full break-words divide-y divide-gray-300'>
              <h1 className='uppercase text-gray-200 font-["Nunito_Sans"] flex justify-between'>
                <span>Alder</span>
                <span>🔞</span>
              </h1>
              <p>{state.user.age} år</p>
            </div>
            <div className='max-w-full break-words divide-y divide-gray-300'>
              <h1 className='uppercase text-gray-200 font-["Nunito_Sans"] flex justify-between'>
                <span>Højde</span>
                <span>📏</span>
              </h1>
              <p>{state.user.height}cm</p>
            </div>
            <div className='max-w-full break-words divide-y divide-gray-300'>
              <h1 className='uppercase text-gray-200 font-["Nunito_Sans"] flex justify-between'>
                <span>Vægt</span>
                <span>⚖️</span>
              </h1>
              <p>{state.user.weight}kg</p>
            </div>
            <div className='max-w-full break-words divide-y divide-gray-300'>
              <h1 className='uppercase text-gray-200 font-["Nunito_Sans"] flex justify-between'>
                <span>Aktivitetsniveau</span>
                <span>🏋️‍♂️</span>
              </h1>
              <p>{state.user.activity}</p>
            </div>
            <div className='max-w-full break-words divide-y divide-gray-300'>
              <h1 className='uppercase text-gray-200 font-["Nunito_Sans"] flex justify-between'>
                <span>Køn</span>
                <span>👫</span>
              </h1>
              <p>{state.user.gender}</p>
            </div>
          </div>
        </header>
        <section id='headerinfo' className='mt-4 space-y-2 pb-4 border-b-2'>
          <div className='w-full p-3 mb-4 rounded-md bg-gradient-to-r from-purple-300'>
            <h1 className='text-lg uppercase text-[#212127] tracking-wide font-["Nunito_Sans"]'>
              Kostplan info
            </h1>
          </div>

          <div className='max-w-full break-words divide-y divide-gray-300'>
            <h1 className='uppercase text-gray-200 font-["Nunito_Sans"] flex justify-between'>
              <span>kostplan navn</span>
              <span>🌿</span>
            </h1>
            <p>{state.sectionOne.name || 'Navn endnu ikke valgt'}</p>
          </div>
          <div className='max-w-full break-words divide-y divide-gray-300'>
            <h1 className='uppercase text-gray-200 font-["Nunito_Sans"] flex justify-between'>
              <span>Formål</span>
              <span>🌱</span>
            </h1>
            <p>{state.sectionOne.purpose || 'Fejl..'}</p>
          </div>
          <div className='max-w-full break-words divide-y divide-gray-300'>
            <h1 className='uppercase text-gray-200 font-["Nunito_Sans"] flex justify-between'>
              <span>Tags</span>
              <span>🏷️</span>
            </h1>
            <p>
              {tagsRef?.current
                ?.getTags()
                ?.map((tag) => tag.name)
                .join(', ') || 'Ingen'}
              .
            </p>
          </div>
          <div className='max-w-full break-words divide-y divide-gray-300'>
            <h1 className='uppercase text-gray-200 font-["Nunito_Sans"] flex justify-between'>
              <span>Makrofordeling</span> <span>🍔</span>
            </h1>
            <p>
              {' '}
              {state.sectionOne.proteinMacro}prot. | {state.sectionOne.fatMacro}
              fedt | {state.sectionOne.carbsMacro}
              kulh
            </p>
          </div>
          <div className='max-w-full break-words'>
            <h1 className='uppercase text-gray-200 font-["Nunito_Sans"] border-b border-gray-300 flex justify-between'>
              <span>Måltider samt fordeling</span>
              <span>🍳</span>
            </h1>
            <p>{state.sectionOne.mealCount} måltid(er)</p>
            <p className='text-sm'>Måltid 1: 10%</p>
            <p className='text-sm'>Måltid 2: 60%</p>
            <p className='text-sm'>Måltid 3: 30%</p>
          </div>
        </section>
        <footer className='mt-4'>
          <div className='w-full p-3 mb-4 rounded-md bg-gradient-to-r from-purple-300'>
            <h1 className='text-lg uppercase text-[#212127] tracking-wide font-["Nunito_Sans"]'>
              Dine opskrifter
            </h1>
          </div>
        </footer>
      </div>
    </motion.section>
  );
};

const RecipeReadMore = ({ recipe, modalRef }) => {
  return (
    <RecipeModal ref={modalRef}>
      <header className='flex border-b-2'>
        <h1 className='xl:max-w-[1000px] lg:max-w-[500px] uppercase font-title2 font-semibold text-gray-700 text-xl lg:text-2xl'>
          {recipe?.name}
        </h1>
        <span className='font-text font-bold self-center ml-auto'>
          ID: {recipe?.id}
        </span>
      </header>
      <section
        id='calorie-wrapper'
        className='grid grid-cols-2 md:grid-cols-4 divide-x-2'
      >
        <h1 className='font-title2 font-semibold text-gray-400 uppercase'>
          {recipe?.macros?.default?.calories} kalorier
        </h1>
        <h1 className='font-title2 font-semibold text-gray-400 uppercase pl-4'>
          {recipe?.macros?.default?.protein} protein
        </h1>
        <h1 className='font-title2 font-semibold text-gray-400 uppercase pl-4'>
          {recipe?.macros?.default?.carbs} kulhydrater
        </h1>
        <h1 className='font-title2 font-semibold text-gray-400 uppercase pl-4'>
          {recipe?.macros?.default?.fat} fedt
        </h1>
      </section>
      <main className='mt-10'>
        <div
          id='ingredient-instruction-wrapper'
          className='flex flex-col lg:flex-row'
        >
          <div id='ingredient-wrapper' className='w-full'>
            <div id='logo-title-wrapper' className='flex space-x-2'>
              <img
                alt='logo'
                src={ingredients}
                className='w-[35px] h-[35px] object-contain'
              />
              <h2 className='uppercase text-xl lg:text-2xl font-title2 text-gray-700 self-center'>
                <span className='border-b-2 border-black'>Ingredienser</span>
              </h2>
            </div>
            <ul className='mt-4 list-disc list-inside text-gray-500 font-extrabold font-title text-sm lg:text-md ingredient-list'>
              {recipe?.ingredients?.map((ingredient) => {
                return (
                  <li
                    key={ingredient.id}
                    id='ingredient-item'
                    className='flex flex-col justify-center whitespace-normal'
                  >
                    <span className='before:content-["○_"] before:text-black ingredient-name'>
                      {ingredient?.measures?.amountOfType}
                      {ingredient?.measures.type}, {ingredient?.food?.food_name}
                      , {ingredient?.measures?.amountInGrams}
                      gram.
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div id='instruction-wrapper' className='w-full mt-5 lg:mt-0'>
            <div id='logo-title-wrapper' className='flex space-x-2'>
              <img
                alt='instructions logo'
                src={instructions}
                className='w-[31px] h-[31px] object-contain'
              />
              <h2 className='uppercase text-xl lg:text-2xl font-title2 text-gray-700 self-center'>
                <span className='border-b-2 border-black'>Instruktioner</span>
              </h2>
            </div>

            <ul className='mt-4 list-decimal list-inside text-gray-500 font-extrabold font-title text-sm lg:text-md instruction-list'>
              {recipe?.analyzedInstructions?.map((instruction) => {
                return (
                  <li key={instruction.id} className='instruction-item'>
                    <span className='instruction-name'>{instruction.step}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div id='desc-wrapper' className='mt-5'>
          <div id='logo-title-wrapper' className='flex space-x-2'>
            <img
              alt='logo'
              src={description}
              className='w-[31px] h-[31px] object-contain'
            />
            <h2 className='uppercase text-xl lg:text-2xl font-title2 text-gray-700 self-center'>
              <span className='border-b-2 border-black'>Beskrivelse</span>
            </h2>
          </div>

          <p className='mt-4 text-gray-500 font-extrabold font-title text-sm lg:text-md'>
            {recipe?.description}
          </p>
        </div>
        <div id='other-desc-wrapper' className='mt-5'>
          <div id='readyInWrapper'>
            <div id='logo-title-wrapper' className='flex space-x-2'>
              <img
                alt='about logo'
                src={about}
                className='w-[31px] h-[31px] object-contain'
              />
              <h2 className='uppercase text-xl lg:text-2xl font-title2 text-gray-700 self-center'>
                <span className='border-b-2 border-black'>Om</span>
              </h2>
            </div>

            <span className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
              Retten koster i gns. {recipe?.pricePerServing} DKK at lave, samt
              tager omtrent {recipe?.readyInMinutes} minutter at lave og er klar
              til at implementere til
              <p className='lowercase'> {recipe?.type}.</p>
            </span>
          </div>
        </div>
        <div id='boolean-value-wrapper' className='mt-5'>
          <div id='logo-title-wrapper' className='flex space-x-2'>
            <img
              alt='about logo'
              src={info}
              className='w-[31px] h-[31px] object-contain'
            />
            <h2 className='uppercase text-xl lg:text-2xl font-title2 text-gray-700 self-center'>
              <span className='border-b-2 border-black'>Info</span>
            </h2>
          </div>

          <div
            id='boolean-value-list-wrapper'
            className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 mt-4'
          >
            <div
              id='boolean-value-item-wrapper'
              className='flex items-center space-x-2'
            >
              {recipe?.vegetarian ? <FcCheckmark /> : <FcCancel />}
              <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                vegetarisk
              </h1>
            </div>
            <div
              id='boolean-value-item-wrapper'
              className='flex items-center space-x-2'
            >
              {recipe?.vegan ? <FcCheckmark /> : <FcCancel />}
              <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                vegansk
              </h1>
            </div>
            <div
              id='boolean-value-item-wrapper'
              className='flex items-center space-x-2'
            >
              {recipe?.glutenFree ? <FcCheckmark /> : <FcCancel />}
              <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                glutenfri
              </h1>
            </div>
            <div
              id='boolean-value-item-wrapper'
              className='flex items-center space-x-2'
            >
              {recipe?.dairyFree ? <FcCheckmark /> : <FcCancel />}
              <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                mælkefri
              </h1>
            </div>
            <div
              id='boolean-value-item-wrapper'
              className='flex items-center space-x-2'
            >
              {recipe?.veryHealthy ? <FcCheckmark /> : <FcCancel />}
              <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                sundt
              </h1>
            </div>
            <div
              id='boolean-value-item-wrapper'
              className='flex items-center space-x-2'
            >
              {recipe?.cheap ? <FcCheckmark /> : <FcCancel />}
              <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                billigt
              </h1>
            </div>
            <div
              id='boolean-value-item-wrapper'
              className='flex items-center space-x-2'
            >
              {recipe?.veryPopular ? <FcCheckmark /> : <FcCancel />}
              <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                populært
              </h1>
            </div>
            <div
              id='boolean-value-item-wrapper'
              className='flex items-center space-x-2'
            >
              {recipe?.sustainable ? <FcCheckmark /> : <FcCancel />}
              <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                bæredygtigt
              </h1>
            </div>
          </div>
        </div>
      </main>
    </RecipeModal>
  );
};

const StepperHeader = ({ state, dispatch }) => (
  <header className='w-full flex'>
    <div id='section-wrapper' className='mt-5 mb-5 w-full flex justify-center'>
      <div className='flex w-[1000px] bg-white shadow-md divide-x divide-gray-300 rounded-lg border border-gray-300'>
        <div className='w-full p-5 flex items-center space-x-2'>
          {state.section <= 1 ? (
            <div className='rounded-full border-2 border-purple-600 text-purple-600 flex items-center justify-center h-[40px] w-[40px]'>
              01
            </div>
          ) : (
            <AiFillCheckCircle className='fill-purple-600' size={40} />
          )}
          <h1
            className={`font-poppins ${
              state.section <= 1 ? 'text-purple-600' : 'text-black'
            }`}
          >
            Information
          </h1>
        </div>
        <div className='w-full p-5 flex items-center space-x-2'>
          {state.section > 2 ? (
            <AiFillCheckCircle className='fill-purple-600' size={40} />
          ) : (
            <div
              className={`rounded-full border-2 ${
                state.section < 2
                  ? 'border-gray-600 text-gray-600'
                  : 'border-purple-600 text-purple-600'
              } flex items-center justify-center h-[40px] w-[40px]`}
            >
              02
            </div>
          )}
          <h1
            className={`font-poppins ${
              state.section > 2
                ? 'text-black'
                : state.section < 2
                ? 'text-gray-600'
                : 'text-purple-600'
            }`}
          >
            Vælg måltider
          </h1>
        </div>
        <div className='w-full p-5 flex items-center space-x-2'>
          {state.section > 3 ? (
            <AiFillCheckCircle className='fill-purple-600' size={40} />
          ) : (
            <div
              className={`rounded-full border-2 ${
                state.section < 3
                  ? 'border-gray-600 text-gray-600'
                  : 'border-purple-600 text-purple-600'
              } flex items-center justify-center h-[40px] w-[40px]`}
            >
              03
            </div>
          )}
          <h1
            className={`font-poppins ${
              state.section > 3
                ? 'text-black'
                : state.section < 3
                ? 'text-gray-600'
                : 'text-purple-600'
            }`}
          >
            Forhåndsvisning
          </h1>
        </div>
      </div>
      <div className='ml-10 my-auto flex'>
        <BiFoodMenu
          onClick={() => {
            dispatch({ type: actions.TOGGLE_SIDEBAR });
          }}
          size={35}
          className='transform duration-300 fill-indigo-600 hover:scale-110 cursor-pointer'
        />
        <span className='font-poppins my-auto text-indigo-700'>Info</span>
      </div>
    </div>
  </header>
);

const SectionTwo = ({
  state,
  dispatch,
  modalRef,
  fetchRecipeById,
  goToPreviousSection,
  goToNextSection,
}) => {
  const { showSuccess, showError } = useAlert();
  return (
    <>
      <header className='mx-auto w-fit space-y-2'>
        <h1 className='text-2xl font-title font-extrabold'>Vælg Opskrift</h1>
        <div className='mx-auto w-1/2 border-b-4 border-green-300' />
      </header>
      <main className='flex flex-col'>
        <section id='searchbar' className='mt-6 flex flex-col w-full'>
          <Autocomplete
            freeSolo={true}
            id='search-by-ingredients'
            disableClearable
            options={state.foods.map((food) => food.food_name)}
            groupBy={(option) => option[0]}
            className='bg-white shadow-md'
            renderInput={(params) => (
              <TextField
                {...params}
                label='Søg med ingredienser'
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
          <div className='font-poppins'>
            Søg ved ingredienser:{' '}
            {state?.searchByIngredients?.length > 0 ? (
              state?.searchByIngredients?.map((ingredient) => (
                <span
                  onClick={() => {
                    dispatch({
                      type: actions.REMOVE_SEARCH_BY_INGREDIENT_ID,
                      payload: ingredient.id,
                    });
                  }}
                  className='delete-cursor first:before:content-[""] before:content-["_|_"] last:after:content-["."] focus:bg-red-500 text-sm font-semibold'
                >
                  {ingredient.name}
                </span>
              ))
            ) : (
              <span className='text-sm font-semibold'>Ingen ingredienser</span>
            )}
          </div>
        </section>
        <section
          id='all-recipes-section'
          className='mt-6 grid place-items-center grid-cols-1 xl:grid-cols-3 gap-4'
        >
          {[
            {
              id: 1,
              name: 'Pasta med pikantost, grønsager og skinkePasta med pikantost, grønsager og skinke',
              time: 15,
              price: 34,
              calories: 500,
              protein: 20,
              fat: 10,
              carbs: 30,
            },
            {
              id: 2,
              name: 'test2',
              time: 21,
              price: 23,
              calories: 200,
              protein: 40,
              fat: 50,
              carbs: 10,
            },
            {
              id: 3,
              name: 'test2',
              time: 45,
              price: 55,
              calories: 700,
              protein: 60,
              fat: 10,
              carbs: 40,
            },
            {
              id: 4,
              name: 'test2',
              time: 21,
              price: 12,
              calories: 700,
              protein: 50,
              fat: 10,
              carbs: 30,
            },
            {
              id: 5,
              name: 'test2',
              time: 21,
              price: 23,
              calories: 200,
              protein: 40,
              fat: 50,
              carbs: 10,
            },
            {
              id: 6,
              name: 'test2',
              time: 45,
              price: 55,
              calories: 700,
              protein: 60,
              fat: 10,
              carbs: 40,
            },
            {
              id: 7,
              name: 'test2',
              time: 21,
              price: 12,
              calories: 700,
              protein: 50,
              fat: 10,
              carbs: 30,
            },
          ].map((recipe) => (
            <div
              key={recipe.id}
              id='item'
              className='flex w-full max-h-[350px]'
            >
              <img
                alt='recipe'
                src='https://www.kitchensanctuary.com/wp-content/uploads/2020/04/Chicken-Fried-Rice-square-FS-.jpg'
                className='w-60 object-cover rounded-tl-lg rounded-bl-lg shadow-form'
              />

              <div className='p-5 text-black bg-white shadow-form my-auto flex flex-col text-sm font-poppins rounded-tr-lg rounded-br-lg max-h-full'>
                <div id='content' className='z-50 flex flex-col overflow-auto'>
                  <div className='flex justify-between space-x-4'>
                    <div className='flex flex-col'>
                      <span className='font-bold'>Navn</span>
                      <span className='mr-auto'>{recipe.name}</span>
                      <span className='font-bold'>Tid</span>
                      <span className='mr-auto'>{recipe.time} min.</span>
                      <span className='font-bold'>Pris</span>
                      <span className='mr-auto'>{recipe.price} DKK</span>
                    </div>
                    <div className='flex flex-col'>
                      <span className='font-bold'>Kalorier</span>
                      <span className='mr-auto'>{recipe.calories} kcal</span>
                      <span className='font-bold'>Protein</span>
                      <span className='mr-auto'>{recipe.protein} g</span>
                      <span className='font-bold'>Fedt</span>
                      <span className='mr-auto'>{recipe.fat} g</span>
                      <span className='font-bold'>Karbohydrater</span>
                      <span className='mr-auto'>{recipe.carbs} g</span>
                    </div>
                  </div>

                  <footer className='mt-auto pt-2'>
                    <div
                      onClick={() => {
                        fetchRecipeById(recipe.id).then(
                          (recipe) => {
                            dispatch({
                              type: actions.UPDATE_RECIPE,
                              payload: recipe.data,
                            });
                            modalRef.current.open();
                          },
                          (err) => {
                            showError({
                              message: 'Kunne ikke hente info om opskriften!',
                            });
                          }
                        );
                      }}
                      className='mt-auto text-accent font-bold flex space-x-2'
                    >
                      <BiBookBookmark fill='black' size={20} />
                      <span>Læs mere...</span>
                    </div>
                    <div className='flex items-center'>
                      {true ? (
                        <>
                          <button className='flex items-center p-3 w-full rounded-md bg-accent font-poppins text-md text-white'>
                            <BiPlus size={20} />
                            <span>Tilføj opskrift til din kostplan</span>
                          </button>
                        </>
                      ) : (
                        <h1>dsa</h1>
                      )}
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          ))}
        </section>
        <Stack className='mt-4 p-2 w-fit mx-auto bg-white shadow-form rounded-md'>
          <Pagination size='large' count={10} showFirstButton showLastButton />
        </Stack>
        <footer className='w-full flex justify-between'>
          {state.section > 0 && (
            <button
              onClick={() => goToPreviousSection()}
              className='flex self-end bg-accent p-4 text-right text-white rounded-md pr-6'
            >
              <svg
                className='w-6 h-6 text-gray-400'
                fill='white'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                  clip-rule='evenodd'
                ></path>
              </svg>
              Forrige
            </button>
          )}
          <button
            onClick={() => goToNextSection()}
            className='flex self-end bg-accent p-4 text-right text-white rounded-md pr-6'
          >
            <svg
              className='w-6 h-6 text-gray-400'
              fill='white'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clip-rule='evenodd'
              ></path>
            </svg>
            {state.section <= 2 ? 'Næste' : 'Færdiggør'}
          </button>
        </footer>
      </main>
    </>
  );
};

const SectionThree = () => {
  return (
    <div className='flex flex-col'>
      <h1>Vælg Opskrift</h1>
    </div>
  );
};

export default CreateDietPlan;

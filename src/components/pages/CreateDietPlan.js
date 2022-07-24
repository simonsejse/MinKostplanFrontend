/**
 * React stuff
 */
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

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

import {
  BiTime,
  BiDollarCircle,
  BiDialpad,
  BiBookBookmark,
  BiPlus,
  BiFoodMenu,
} from 'react-icons/bi';
import { GrStatusInfo, GrContactInfo, GrMoney } from 'react-icons/gr';

import { MdClose } from 'react-icons/md';
import loading from '../../images/loading.png';
import slice from '../../images/slice.png';
/**
 * Reusable Components
 */
import Alert, { useAlert } from '../reusable-components/Alert';
import Tags from '../reusable-components/Tags';
import SearchBar from '../reusable-components/SearchBar';
import HoverableCard from '../reusable-components/HoverableCard';

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
import { calculateAgeFromBirthDate, truncateText } from '../../utils/Utils';

/**
 * Mui
 */
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
} from '@mui/material';
import { createContext } from 'react';

/** */
import { BsX } from 'react-icons/bs';
import { useSnackbar } from 'notistack';

/** */
import { useRecipeReadMore } from '../reusable-components/ReadMoreContext';
import { red } from '@mui/material/colors';

const sidebarVariants = {
  show: { width: '400px' },
  hide: { width: 0 },
};

const DietPlanContext = createContext();

const DietPlanProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const tagsRef = useRef();

  const fetchRecipeById = async (id, calories) => {
    return recipeService.getRecipeById(id, calories);
  };

  return (
    <DietPlanContext.Provider
      value={{ state, dispatch, tagsRef, fetchRecipeById }}
    >
      {children}
    </DietPlanContext.Provider>
  );
};

const useDietPlanProvider = () => {
  return useContext(DietPlanContext);
};

const CreateDietPlanWrapper = () => {
  return (
    <DietPlanProvider>
      <CreateDietPlan />
    </DietPlanProvider>
  );
};

const CreateDietPlan = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useAlert();

  const { dispatch, state } = useDietPlanProvider();

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

    const promise2 = foodService.getAllFoodDTOs().then((res) => {
      dispatch({ type: actions.UPDATE_FOOD, payload: res.data });
    });

    Promise.all([promise1, promise2]).catch((error) => {
      showError({
        message: 'Kunne ikke loade alt dataen!',
        closeable: false,
      });
    });
  }, []);

  return (
    <div className='flex-1 bg-primary'>
      <Sidebar />
      <div className='h-full flex flex-col'>
        <BiFoodMenu
          className='mx-auto mt-4 duration-300 hover:scale-110 hover:cursor-pointer bg-white hover:bg-black fill-accent hover:fill-white shadow-form p-4 rounded-full'
          size={75}
          onClick={() => dispatch({ type: actions.TOGGLE_SIDEBAR })}
        />
        <HorizontalLinearStepper />
      </div>
    </div>
  );
};

const Sidebar = () => {
  const { state, dispatch, tagsRef } = useDietPlanProvider();

  return (
    <motion.section
      animate={state.showSidebar ? 'show' : 'hide'}
      variants={sidebarVariants}
      transitionEnd={{ display: 'none' }}
      className='fixed right-0 h-full max-h-full z-[100] backdrop-blur-sm background-pattern-temple'
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
              <p>{state.staticData.user.username}</p>
            </div>
            <div className='max-w-full break-words divide-y divide-gray-300'>
              <h1 className='uppercase text-gray-200 font-["Nunito_Sans"] flex justify-between'>
                <span>Alder</span>
                <span>🔞</span>
              </h1>
              <p>{state.staticData.user.age} år</p>
            </div>
            <div className='max-w-full break-words divide-y divide-gray-300'>
              <h1 className='uppercase text-gray-200 font-["Nunito_Sans"] flex justify-between'>
                <span>Højde</span>
                <span>📏</span>
              </h1>
              <p>{state.staticData.user.height}cm</p>
            </div>
            <div className='max-w-full break-words divide-y divide-gray-300'>
              <h1 className='uppercase text-gray-200 font-["Nunito_Sans"] flex justify-between'>
                <span>Vægt</span>
                <span>⚖️</span>
              </h1>
              <p>{state.staticData.user.weight}kg</p>
            </div>
            <div className='max-w-full break-words divide-y divide-gray-300'>
              <h1 className='uppercase text-gray-200 font-["Nunito_Sans"] flex justify-between'>
                <span>Aktivitetsniveau</span>
                <span>🏋️‍♂️</span>
              </h1>
              <p>{state.staticData.user.activity}</p>
            </div>
            <div className='max-w-full break-words divide-y divide-gray-300'>
              <h1 className='uppercase text-gray-200 font-["Nunito_Sans"] flex justify-between'>
                <span>Køn</span>
                <span>👫</span>
              </h1>
              <p>{state.staticData.user.gender}</p>
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
            <p>{state.form.dietPlanName || 'Navn endnu ikke valgt'}</p>
          </div>
          <div className='max-w-full break-words divide-y divide-gray-300'>
            <h1 className='uppercase text-gray-200 font-["Nunito_Sans"] flex justify-between'>
              <span>Formål</span>
              <span>🌱</span>
            </h1>
            <p>{state.form.dietPlanPurpose || 'Fejl..'}</p>
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
            <p>5prot. | 5 fedt | 3 kulh</p>
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

const steps = [
  'Vælg oplysninger om kostplan',
  'Vælg dine ønskede måltider ',
  'Se en forhåndsvisning samt godkend',
];

function HorizontalLinearStepper() {
  const components = [<SectionOne />, <SectionTwo />];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        sx={{
          '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
            borderColor: '#DC143C',
          },
        }}
        activeStep={activeStep}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step sx={{ padding: 10 }} key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ paddingLeft: 10, paddingRight: 10 }}>
            {components[activeStep]}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                paddingTop: 2,
              }}
            >
              <Button
                color='inherit'
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Forrige
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Færdig' : 'Næste'}
              </Button>
            </Box>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

const SectionOne = () => {
  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      <TextField
        helperText='Indtast venligst navn på kostplan'
        type='text'
        label='Navn'
        variant='filled'
        required
      />
      <TextField
        helperText='Indtast venligst navn på kostplan'
        type='text'
        label='Navn'
        variant='filled'
        required
      />
      <TextField
        helperText='Indtast venligst navn på kostplan'
        type='text'
        label='Navn'
        variant='filled'
        required
      />
    </Box>
  );
};

const SectionTwo = () => {
  const { showSuccess, showError } = useAlert();
  const { state, dispatch } = useDietPlanProvider();
  const didMount = useRef(false);

  const handleChange = (event, value) => {
    dispatch({ type: actions.SET_CURRENT_PAGE, payload: value });
  };

  const getPage = () => {
    return state.currentPage - 1;
  };

  const handleFormChange = (whichValue) => (evt) => {
    dispatch({
      type: actions.CHANGE_FORM_DATA,
      payload: { whichValue: whichValue, value: evt.target.value },
    });
  };

  const fetchData = async () => {
    dispatch({ type: actions.SET_IS_PAGE_DATA_LOADING, payload: true });
    const recipes = await recipeService
      .getPageOfRecipesForCreateDietPlan(
        getPage(),
        state.form.searchByName,
        state.form.caloriesWanted
      )
      .catch((err) => {
        showError({
          message: err.response.data.errors[0],
        });
      });
    dispatch({
      type: actions.SET_PAGE_DATA,
      payload: recipes.data,
    });
    dispatch({
      type: actions.SET_IS_PAGE_DATA_LOADING,
      payload: false,
    });
  };

  useEffect(() => {
    if (didMount.current) {
      fetchData();
    } else {
      didMount.current = true;
    }
  }, [state.currentPage]);

  const handleResetPage = () => {
    handleChange({}, 1);
  };

  const handleResetRecipes = () => {
    dispatch({ type: actions.RESET_LOADED_RECIPES });
  };

  return (
    <>
      <header className='mx-auto w-fit space-y-2'>
        <h1 className='text-2xl font-title font-extrabold'>Vælg Opskrift</h1>
        <div className='mx-auto w-1/2 border-b-4 border-green-300' />
      </header>
      <main className='flex flex-col'>
        <section id='searchbar' className='mt-6 flex flex-col w-full'>
          <Stack className='mt-4 p-5 w-full bg-white shadow-form rounded-md space-y-4'>
            <Stack direction='row'>
              <div>
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
                  <span className='text-sm font-semibold'>
                    Ingen ingredienser
                  </span>
                )}
              </div>
            </Stack>
            <form
              className='space-y-2'
              onSubmit={(e) => {
                e.preventDefault();
                fetchData();
                handleResetPage();
              }}
            >
              <Stack direction='row' sx={{ width: '100%' }}>
                <FormControl sx={{ width: '100%', marginRight: '0.5rem' }}>
                  <InputLabel htmlFor='my-input'>Navn</InputLabel>
                  <Input
                    id='my-input'
                    aria-describedby='name-helper-text'
                    onChange={handleFormChange('searchByName')}
                    value={state.form.searchByName}
                  />
                  <FormHelperText id='name-helper-text'>
                    Søg på en bestemt ret ved navn
                  </FormHelperText>
                </FormControl>
                <FormControl sx={{ marginRight: '0.5rem' }}>
                  <InputLabel htmlFor='my-input'>Antal kalorier</InputLabel>
                  <Input
                    id='number'
                    aria-describedby='calories-helper-text'
                    type='number'
                    onChange={handleFormChange('caloriesWanted')}
                    value={state.form.caloriesWanted}
                  />
                  <FormHelperText id='calories-helper-text'>
                    Antal kalorier retterne skal have
                  </FormHelperText>
                </FormControl>
              </Stack>
              <FormControl sx={{ width: '100%', marginRight: '0.5rem' }}>
                <Autocomplete
                  freeSolo={true}
                  id='search-by-ingredients'
                  sx={{ width: '100%' }}
                  disableClearable
                  options={state.staticData.foods.map((food) => food.food_name)}
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
              </FormControl>
              <Pagination
                size='large'
                shape='rounded'
                onChange={handleChange}
                count={state.pageData.totalPages}
                showFirstButton
                showLastButton
              />
              <Stack direction='row'>
                <Button
                  type='submit'
                  sx={{ width: '100%' }}
                  size='large'
                  onClick={(e) => {
                    e.preventDefault();
                    fetchData();
                    handleResetPage();
                  }}
                >
                  Søg
                </Button>
                <Button
                  sx={{ width: '100%' }}
                  size='large'
                  onClick={() => handleResetRecipes()}
                >
                  Ryd
                </Button>
              </Stack>
            </form>
          </Stack>
        </section>

        {state.isPageDataLoading ? (
          <div className='mt-5 flex justify-center'>
            <img
              className='h-[100px] object-contain loading opacity-100'
              src={loading}
              alt='loading'
            />
            <h1>{state.isPageDataLoading}</h1>
          </div>
        ) : state.pageData &&
          state.pageData.content &&
          state.pageData.content.length > 0 ? (
          <RecipeList />
        ) : (
          <Stack sx={{ marginTop: '1.5rem' }}>
            <Typography variant='h5' color='text.primary'>
              Ingen opskrifter...
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Indtast kritierne ovenover, derefter klik 'Søg'
            </Typography>
          </Stack>
        )}
      </main>
    </>
  );
};

const RecipeList = () => {
  const { state, dispatch, fetchRecipeById } = useDietPlanProvider();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { open } = useRecipeReadMore();

  const { showError } = useAlert();

  const addRecipeToCart = (recipe) => (event) => {
    if (state.pickedRecipes.length >= 5) {
      return enqueueSnackbar('Du kan maksimum have 5 måltider!', {
        variant: 'error',
      });
    }
    dispatch({
      type: actions.ADD_RECIPE,
      payload: recipe,
    });
    enqueueSnackbar('Du har tilføjet opskriften som et måltid!', {
      variant: 'info',
    });
  };

  const removeRecipeToCart = (recipe) => (event) => {
    dispatch({
      type: actions.REMOVE_RECIPE,
      payload: recipe.id,
    });
    enqueueSnackbar('Du har fjernet opskriften som et måltid!', {
      variant: 'default',
    });
  };
  return (
    <section
      id='all-recipes-section'
      className='mt-6 grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
    >
      {state.pageData.content.map((recipe) => (
        <Card
          sx={{
            maxWidth: 300,
            minHeight: 600,
            maxHeight: 600,
            overflowY: 'scroll',
          }}
        >
          <CardHeader
            sx={{ overflowWrap: 'break-word' }}
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                {recipe.createdBy.substring(0, 1).toUpperCase()}
              </Avatar>
            }
            title={`${recipe.name} (${recipe.id})`}
            subheader={`Af ${recipe.createdBy}`}
          />
          <CardMedia
            component='img'
            height='1'
            image='https://www.kitchensanctuary.com/wp-content/uploads/2020/04/Chicken-Fried-Rice-square-FS-.jpg' //
            alt='picture of the food'
          />
          <CardContent>
            <Stack spacing={1.4}>
              <Stack direction='column'>
                <Stack
                  direction='row'
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant='overline' color='text.primary'>
                    portion
                  </Typography>
                  <img src={slice} style={{ width: 21, height: 21 }} />
                </Stack>
                <Typography variant='caption' color='text.secondary'>
                  {parseFloat(recipe.ratio.toFixed(2))}x en 1 portion
                </Typography>
              </Stack>
              <Stack direction='column'>
                <Stack
                  direction='row'
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant='overline' color='text.primary'>
                    beskrivelse
                  </Typography>
                  <GrStatusInfo size={18} />
                </Stack>
                <Typography variant='caption' color='text.secondary'>
                  {recipe.description}
                </Typography>
              </Stack>
              <Stack direction='column'>
                <Stack
                  direction='row'
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant='overline' color='text.primary'>
                    Info
                  </Typography>
                  <GrContactInfo size={20} />
                </Stack>
                <Typography variant='caption' color='text.secondary'>
                  Retten indeholder {recipe.calories} kalorier. Derudover, har
                  makrofordeling på {recipe.protein} protein, {recipe.fat} fedt
                  samt {recipe.carbs} kulhydrater.
                </Typography>
              </Stack>
              <Stack direction='column'>
                <Stack
                  direction='row'
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant='overline' color='text.primary'>
                    Yderligere
                  </Typography>
                  <GrMoney size={16} />
                </Stack>
                <Typography variant='caption' color='text.secondary'>
                  Retten er klar på {recipe.readyInMinutes} og koster i gns.{' '}
                  {recipe.pricePerServing} pr person.
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
          <CardActions>
            {state.pickedRecipes.some(
              (pickedRecipe) => pickedRecipe.id === recipe.id
            ) ? (
              <Button size='small' onClick={removeRecipeToCart(recipe)}>
                Fjern
              </Button>
            ) : (
              <Button size='small' onClick={addRecipeToCart(recipe)}>
                Tilføj
              </Button>
            )}
            <Button
              size='small'
              onClick={() => {
                const ratio = recipe.ratio;
                const wantedCalories = recipe.calories * ratio;
                fetchRecipeById(recipe.id, wantedCalories).then(
                  (recipe) => open(recipe.data),
                  (err) => {
                    showError({
                      message: 'Kunne ikke hente info om opskriften!',
                    });
                  }
                );
              }}
            >
              Læs mere..
            </Button>
          </CardActions>
        </Card>
      ))}
    </section>
  );
};

const SectionThree = () => {
  return (
    <div className='flex flex-col'>
      <h1>Vælg Opskrift</h1>
    </div>
  );
};

export default CreateDietPlanWrapper;

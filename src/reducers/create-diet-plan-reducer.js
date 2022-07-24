const DEFAULT_USER_ID = 0;
const DEFAULT_USER_USERNAME = '';
const DEFAULT_USER_ACTIVITY = '';
const DEFAULT_USER_GENDER = '';
const DEFAULT_USER_HEIGHT = 0;
const DEFAULT_USER_WEIGHT = 0;
const DEFAULT_USER_AGE = 0;

const DEFAULT_INGREDIENTS = [];

const DEFAULT_PAGE = 1;

const DEFAULT_CALORIES = 50;
const DEFAULT_DIET_PLAN_PURPOSE = 'LOSS';
const DEFAULT_DIET_PLAN_NAME = '';
const DEFAULT_SEARCH_BY_NAME = '';

const DEFAULT_PAGEABLE_DATA = [];
const DEFAULT_IS_PAGE_DATA_LOADING = false;
const DEFAULT_PICKED_RECIPES = [];

export const actions = {
  UPDATE_FOOD: 1,
  TOGGLE_SIDEBAR: 2,
  SET_USER_INFO: 3,
  SET_RECIPES: 4,
  SET_CURRENT_PAGE: 5,
  SET_PAGE_DATA: 6,
  ADD_RECIPE: 7,
  REMOVE_RECIPE: 8,
  CHANGE_FORM_DATA: 9,
  RESET_LOADED_RECIPES: 10,
  RESET_CALORIES_TO_DEFAULT: 11,
  SET_IS_PAGE_DATA_LOADING: 12,
  RESET_PAGE: 13,
};

export const initialState = {
  staticData: {
    user: {
      id: DEFAULT_USER_ID,
      username: DEFAULT_USER_USERNAME,
      activity: DEFAULT_USER_ACTIVITY,
      gender: DEFAULT_USER_GENDER,
      height: DEFAULT_USER_HEIGHT,
      weight: DEFAULT_USER_WEIGHT,
      age: DEFAULT_USER_AGE,
    },
    foods: DEFAULT_INGREDIENTS,
  },
  form: {
    dietPlanName: DEFAULT_DIET_PLAN_NAME,
    dietPlanPurpose: DEFAULT_DIET_PLAN_PURPOSE,
    searchByName: DEFAULT_SEARCH_BY_NAME,
    caloriesWanted: DEFAULT_CALORIES,
  },
  currentPage: DEFAULT_PAGE,
  pageData: DEFAULT_PAGEABLE_DATA,
  isPageDataLoading: DEFAULT_IS_PAGE_DATA_LOADING,
  pickedRecipes: DEFAULT_PICKED_RECIPES,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_FOOD:
      return {
        ...state,
        staticData: {
          ...state.staticData,
          foods: action.payload,
        },
      };
    case actions.TOGGLE_SIDEBAR: {
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    }
    case actions.SET_USER_INFO: {
      const userProperties = action.payload;
      return {
        ...state,
        user: {
          ...userProperties,
        },
      };
    }
    case actions.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    case actions.SET_PAGE_DATA: {
      return {
        ...state,
        pageData: action.payload,
      };
    }
    case actions.ADD_RECIPE: {
      const recipe = action.payload;
      return {
        ...state,
        pickedRecipes: [...state.pickedRecipes, recipe],
      };
    }
    case actions.REMOVE_RECIPE: {
      const recipe_id = action.payload;
      return {
        ...state,
        pickedRecipes: state.pickedRecipes.filter(
          (recipe) => recipe.id !== recipe_id
        ),
      };
    }
    case actions.CHANGE_FORM_DATA: {
      const { whichValue, value } = action.payload;
      return {
        ...state,
        form: {
          ...state.form,
          [whichValue]: value,
        },
      };
    }
    case actions.RESET_LOADED_RECIPES: {
      return {
        ...state,
        pageData: DEFAULT_PAGEABLE_DATA,
      };
    }
    case actions.RESET_CALORIES_TO_DEFAULT: {
      return {
        ...state,
        form: {
          ...state.form,
          caloriesWanted: DEFAULT_CALORIES,
        },
      };
    }
    case actions.SET_IS_PAGE_DATA_LOADING: {
      const trueOrFalse = action.payload;
      return {
        ...state,
        isPageDataLoading: trueOrFalse,
      };
    }
    case actions.RESET_PAGE: {
      return {
        ...state,
        currentPage: 1,
      };
    }
    default:
      throw new Error('Burde ikke ende her?:' + action.type);
  }
};

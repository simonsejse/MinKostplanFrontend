export const actions = {
  SHOW_ALERT: 'SHOW_ALERT',
  HIDE_ALERT: 'HIDE_ALERT',
  UPDATE_FOOD: 'UPDATE_FOOD',
  REMOVE_SEARCH_BY_INGREDIENT_ID: 'REMOVE_SEARCH_BY_INGREDIENT',
  ADD_SEARCH_BY_INGREDIENT: 'ADD_SEARCH_BY_INGREDIENT',
  UPDATE_RECIPE: 'UPDATE_RECIPE',
  CHANGE_SECTION_ONE_FORM_VALUES: 'CHANGE_SECTION_ONE_FORM_VALUES',
  CHANGE_SECTION_ONE_FORM_MEAL_DISTRIBUTION_VALUES:
    'CHANGE_SECTION_ONE_FORM_MEAL_DISTRIBUTION_VALUES',
  NEXT_SECTION: 'NEXT_SECTION',
  PREV_SECTION: 'PREV_SECTION',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_USER_INFO: 'SET_USER_INFO',
  SET_RECIPES: 'SET_RECIPES',
};

export const initialState = {
  section: 1,
  showSidebar: false,
  foods: [],
  page: 0,
  recipes: [],
  user: {
    id: 0,
    username: '',
    activity: '',
    gender: '',
    height: 0,
    weight: 0,
    age: 0,
  }, //
  sectionOne: {
    name: '',
    purpose: 'Muskelopbygning',
    proteinMacro: 0,
    fatMacro: 0,
    carbsMacro: 0,
    mealDistribution: {
      meal_1: 0,
      meal_2: 0,
      meal_3: 0,
      meal_4: 0,
      meal_5: 0,
    },
    mealCount: 1,
    weightPerWeek: 0,
  },
  searchByIngredients: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_FOOD:
      return {
        ...state,
        foods: action.payload,
      };
    case actions.ADD_SEARCH_BY_INGREDIENT: {
      const { id, name } = action.payload;

      if (
        state.searchByIngredients
          .map((ingredient) => ingredient.name)
          .includes(name)
      ) {
        return {
          ...state,
        };
      }

      const newSearchByIngredients = {
        id,
        name,
      };

      return {
        ...state,
        searchByIngredients: [
          ...state.searchByIngredients,
          newSearchByIngredients,
        ],
      };
    }
    case actions.REMOVE_SEARCH_BY_INGREDIENT_ID: {
      const searchByIngredientId = action.payload;
      return {
        ...state,
        searchByIngredients: state.searchByIngredients.filter(
          (ingredient) => ingredient.id !== searchByIngredientId
        ),
      };
    }
    case actions.UPDATE_RECIPE:
      return {
        ...state,
        currentRecipe: action.payload,
      };
    case actions.CHANGE_SECTION_ONE_FORM_VALUES:
      return {
        ...state,
        sectionOne: {
          ...state.sectionOne,
          [action.payload.name]: action.payload.value,
        },
      };
    case actions.CHANGE_SECTION_ONE_FORM_MEAL_DISTRIBUTION_VALUES:
      return {
        ...state,
        sectionOne: {
          ...state.sectionOne,
          mealDistribution: {
            ...state.sectionOne.mealDistribution,
            [action.payload.name]: action.payload.value,
          },
        },
      };
    case actions.NEXT_SECTION:
      const currentSection = action.payload;

      return {
        ...state,
        section: currentSection + 1,
      };
    case actions.PREV_SECTION: {
      const currentSection = action.payload;
      return {
        ...state,
        section: currentSection - 1,
      };
    }
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
    case actions.SET_RECIPES: {
      return {
        ...state,
        recipes: action.payload,
      };
    }
    default:
      throw new Error('Burde ikke ende her?:' + action.type);
  }
};

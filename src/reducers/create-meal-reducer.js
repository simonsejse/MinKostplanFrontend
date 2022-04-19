export const actions = {
  CHANGE_ALERT_STATE: 1,
  CHANGE_FORM_DATA: 2,
  CHANGE_FORM_BOOLEAN_DATA: 3,
  SET_CATEGORIES: 4,
};

export const initialState = {
  alert: {
    show: false,
    isError: false,
    title: '',
    message: '',
    isCloseable: true,
  },
  categories: [],
  form: {
    name: '',
    picture: null,
    booleans: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isDairyFree: false,
      isHealthy: false,
      isCheap: false,
      isPopular: false,
      isSustainable: false,
    },
    type: '',
    pricePerServing: 0,
    readyInMinutes: 0,
    instructions: [],
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_ALERT_STATE:
      const alert = action.payload;
      return {
        ...state,
        alert: {
          ...alert,
        },
      };
    case actions.CHANGE_FORM_DATA:
      const form = action.payload;
      return {
        ...state,
        form: {
          ...state.form,
          [form.dataToBeChanged]: form.value,
        },
      };
    case actions.CHANGE_FORM_BOOLEAN_DATA:
      const payload = action.payload;
      return {
        ...state,
        form: {
          ...state.form,
          booleans: {
            ...state.form.booleans,
            [payload.dataToBeChanged]: payload.value,
          },
        },
      };
    case actions.SET_CATEGORIES:
      console.log(action.payload);
      return {
        ...state,
        categories: action.payload,
      };
    default:
      throw new Error('');
  }
};

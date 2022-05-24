export const actions = {
  SHOW_ALERT: 'SHOW_ALERT',
  HIDE_ALERT: 'HIDE_ALERT',
  CHANGE_FORM_VALUES: 'CHANGE_FORM_VALUES',
  CHANGE_MACROS: 'CHANGE_MACROS',
};

export const initialState = {
  section: 1,
  form: {
    dropdownValue: 'Vedligeholdelse',
    proteinMacro: 0,
    carbsMacro: 0,
    fatMacro: 0,
    mealCount: 1,
    mealDistribution: {
      meal_1: 0,
      meal_2: 0,
      meal_3: 0,
      meal_4: 0,
      meal_5: 0,
    },
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_FORM_VALUES:
      return {
        ...state,
        form: { ...state.form, [action.payload.name]: action.payload.value },
      };
    case actions.CHANGE_MACROS:
      return { ...state, form: { ...state.form, ...action.payload } };
    default:
      throw new Error('Burde ikke ende her?');
  }
};

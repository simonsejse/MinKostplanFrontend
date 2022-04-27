export const actions = {
  CHANGE_ALERT_STATE: 1,
  CHANGE_FORM_DATA: 2,
  CHANGE_FORM_BOOLEAN_DATA: 3,
  SET_CATEGORIES: 4,
  UPDATE_INSTRUCTIONS: 5,
  SHOW_INSTRUCTION_MODAL: 6,
  NEW_INSTRUCTION: 7,
  DELETE_INSTRUCTION_BY_INSTRUCTION: 8,
  UPDATE_FOOD: 9,
};

export const initialState = {
  alert: {
    show: false,
    isError: false,
    title: '',
    message: '',
    isCloseable: true,
  },
  showInstructionModal: false,
  categories: [],
  foods: [],
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
    newInstruction: '',
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
    case actions.UPDATE_INSTRUCTIONS:
      const items = action.payload;
      return { ...state, form: { ...state.form, instructions: items } };
    case actions.SHOW_INSTRUCTION_MODAL:
      const shouldShow = action.payload;
      return {
        ...state,
        showInstructionModal: shouldShow,
      };
    case actions.NEW_INSTRUCTION:
      const instructions = Array.from(state.form.instructions);
      instructions.push({
        id: `${instructions.length}`,
        instruction: state.form.newInstruction,
      });
      return {
        ...state,
        alert: {
          show: true,
          isError: false,
          title: 'Ny instruktion!',
          message:
            'Du har nu tilføjet en ny instruktion: "' +
            state.form.newInstruction +
            '" og der er nu ' +
            instructions.length +
            ' instruktion(er) i alt!',
          isCloseable: true,
        },
        form: {
          ...state.form,
          newInstruction: '',
          instructions: instructions,
        },
      };
    case actions.DELETE_INSTRUCTION_BY_INSTRUCTION: {
      const instructions = state.form.instructions.filter(
        (instruction) => instruction.instruction !== action.payload
      );
      return {
        ...state,
        alert: {
          show: true,
          isError: true,
          title: 'Fjernet instruktion!',
          message:
            'Du har nu fjernet instruktion (ID:' +
            action.payload +
            ') og der er nu ' +
            instructions.length +
            ' instruktion(er) tilbage!',

          isCloseable: true,
        },
        form: {
          ...state.form,
          instructions: instructions,
        },
      };
    }
    case actions.UPDATE_FOOD: {
      const foods = action.payload;
      return {
        ...state,
        foods: foods,
      };
    }
    default:
      throw new Error('');
  }
};

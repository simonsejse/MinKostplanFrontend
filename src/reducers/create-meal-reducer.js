export const actions = {
  CHANGE_ALERT_STATE: 1,
  CHANGE_FORM_DATA: 2,
  CHANGE_FORM_BOOLEAN_DATA: 3,
  CHANGE_FOOD_MODAL_FORM: 4,
  SET_CATEGORIES: 5,
  UPDATE_INSTRUCTIONS: 6,
  UPDATE_INGREDIENT: 7,
  SHOW_INGREDIENTS_FOOD_MODAL: 8,
  NEW_INSTRUCTION: 9,
  NEW_INGREDIENT: 10,
  NEW_META: 11,
  DELETE_INSTRUCTION_BY_INSTRUCTION: 12,
  DELETE_INGREDIENT_BY_ID: 13,
  UPDATE_FOOD: 14,
  SHOW_PICK_FOOD_MODAL: 15,
  SET_MEASUREMENTS: 16,
  RESET_INGREDIENT_FORM: 17,
  RESET_META_FORM: 18,
};
export const initialState = {
  alert: {
    show: false,
    isError: false,
    title: '',
    message: '',
    isCloseable: true,
  },
  showFoodAndInstructionModal: false,
  foodModal: {
    show: false,
    currentFood: undefined,
    form: {
      grams: '',
      amountOwnUnit: '',
      metaList: [],
      meta: '',
      unit: 'GRAMS',
    },
  },
  categories: [],
  foods: [],
  measurements: [],
  pricePerServing: 0,
  readyInMinutes: 0,
  form: {
    name: '',
    description: '',
    type: '',
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
    newInstruction: '',
    instructions: [],
    ingredients: [],
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
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.dataToBeChanged]: action.payload.value,
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
      return {
        ...state,
        form: { ...state.form, instructions: action.payload },
      };
    case actions.UPDATE_INGREDIENT:
      return { ...state, form: { ...state.form, ingredients: action.payload } };
    case actions.SHOW_INGREDIENTS_FOOD_MODAL: {
      const shouldShow = action.payload;
      return {
        ...state,
        showFoodAndInstructionModal: shouldShow,
      };
    }
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
    case actions.NEW_META:
      const meta = action.payload;
      return {
        ...state,
        foodModal: {
          ...state.foodModal,
          form: {
            ...state.foodModal.form,
            metaList: [...state.foodModal.form.metaList, meta],
          },
        },
      };
    case actions.DELETE_INGREDIENT_BY_ID:
      return {
        ...state,
        alert: {
          show: true,
          isError: true,
          title: 'Slettet ingrediens!',
          message: `Du har slettet ingrediens med (ID:${action.payload}) fra din ret.`,
          isCloseable: true,
        },
        form: {
          ...state.form,
          ingredients: [
            ...state.form.ingredients.filter(
              (ingredient) => ingredient.id !== action.payload
            ),
          ],
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
    case actions.DELETE_META_BY_ID: {
      return {
        ...state,
        foodModal: {
          ...state.foodModal,
          form: {
            ...state.foodModal.form,
            metaList: [
              ...state.foodModal.form.metaList.filter(
                (meta) => meta.id !== action.payload
              ),
            ],
          },
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
    case actions.SHOW_PICK_FOOD_MODAL:
      /**
       * currentFood and show
       * */
      const values = action.payload;

      return {
        ...state,
        foodModal: {
          ...state.foodModal,
          ...values,
        },
      };
    case actions.SET_MEASUREMENTS: {
      return { ...state, measurements: action.payload };
    }
    case actions.CHANGE_FOOD_MODAL_FORM: {
      return {
        ...state,
        foodModal: {
          ...state.foodModal,
          form: {
            ...state.foodModal.form,
            [action.payload.name]: action.payload.value,
          },
        },
      };
    }
    case actions.RESET_INGREDIENT_FORM: {
      return {
        ...state,
        foodModal: {
          show: false,
          currentFood: undefined,
          form: {
            grams: '',
            amountOwnUnit: '',
            metaList: [],
            meta: '',
            unit: 'GRAMS',
          },
        },
      };
    }
    case actions.RESET_META_FORM: {
      return {
        ...state,
        foodModal: {
          ...state.foodModal,
          form: {
            ...state.foodModal.form,
            meta: '',
          },
        },
      };
    }
    case actions.NEW_INGREDIENT: {
      const newIngredient = action.payload;

      return {
        ...state,
        form: {
          ...state.form,
          ingredients: [...state.form.ingredients, newIngredient],
        },
      };
    }
    default:
      throw new Error('');
  }
};

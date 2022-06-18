export const actions = {
  CHANGE_FORM_VALUES: 'CHANGE_FORM_VALUES',
  LOGIN_STARTS: 'LOGIN_STARTS',
  RESET_MESSAGE: 'RESET_MESSAGE',
  TOGGLE_REMEMBER_ME: 'TOGGLE_REMEMBER_ME',
  LOGIN_FAILED: 'LOGIN_FAILED',
  FORGOT_PWD_SECTION: 'FORGOT_PWD_SECTION',
  LOGIN_SECTION: 'LOGIN_SECTION',
};

export const initialState = {
  section: 1,
  isLoading: false,
  message: '',
  form: {
    email: '',
    password: '',
    remember_me: false,
    forgotEmail: '',
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.LOGIN_STARTS:
      return {
        ...state,
        isLoading: true,
        message: '',
      };
    case actions.RESET_MESSAGE:
      return {
        ...state,
        message: '',
      };
    case actions.CHANGE_FORM_VALUES:
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.name]: action.payload.value,
        },
      };
    case actions.TOGGLE_REMEMBER_ME:
      return {
        ...state,
        form: {
          ...state.form,
          remember_me: !state.form.remember_me,
        },
      };
    case actions.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
      };
    case actions.FORGOT_PWD_SECTION:
      return {
        ...state,
        section: 2,
      };
    case actions.LOGIN_SECTION:
      return {
        ...state,
        section: 1,
      };
    default:
      throw new Error('Burde ikke ende her?');
  }
};

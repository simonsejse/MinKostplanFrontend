export const actions = {
  CHANGE_FORM: 'CHANGE_FORM',
  NEXT_SECTION: 'NEXT_SECTION',
  PREVIOUS_SECTION: 'PREVIOUS_SECTION',
};

export const initialState = {
  section: 1, // 1 = password,email etc.. 2=is male/female and height, weight etc..
  form: {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    weight: 0,
    height: 0,
    gender: '',
    activity: '',
    birthday: Date.now(),
    showPassword: false,
    showConfirmedPassword: false,
  }, //change all input value={state.email} to state.form.email
  error: '',
  loading: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_FORM:
      const formInput = action.payload.name;
      const formValue = action.payload.value;
      return {
        ...state,
        form: {
          ...state.form,
          [formInput]: formValue,
        },
      };
    case actions.NEXT_SECTION:
      return {
        ...state,
        section: state.section + 1,
      };
    case actions.PREVIOUS_SECTION:
      return {
        ...state,
        section: state.section - 1,
      };

    default:
      console.log('Du forsøgte at bruge ' + action.type);
      throw new Error('Du burde ikke ende her? Wtf?');
  }
};

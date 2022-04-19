export const actions = {
  CHANGE_FORM: 'CHANGE_FORM',
};

export const initialState = {
  email: '',
  username: '',
  password: '',
  password2: '',
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
        [formInput]: formValue,
      };
    default:
      console.log('Du forsøgte at bruge ' + action.type);
      throw new Error('Du burde ikke ende her? Wtf?');
  }
};

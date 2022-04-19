import Progression from '../config/progression';

export const actions = {
  FETCH_USER_DATA: 'FETCH_USER_DATA',
  FETCH_USER_DATA_SUCCESS: 'FETCH_USER_DATA_SUCCESS',
  FETCH_USER_DATA_ERROR: 'FETCH_USER_DATA_ERROR',
};

export const initialState = {
  progression: null,
  body: '',
  error: {
    message: '',
    statusCode: 0,
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.FETCH_USER_DATA:
      return {
        ...state,
        progression: Progression.LOADING,
      };
    case actions.FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        progression: Progression.SUCCESS,
        body: action.payload,
      };
    case actions.FETCH_USER_DATA_ERROR:
      return {
        ...state,
        progression: Progression.ERROR,
        error: action.payload,
      };
    default:
      throw new Error('Du burde ikke komme her!');
  }
};

import {
  SET_LOGIN_ERROR,
  SET_LOGIN_LOADING,
  SET_LOGIN_STATUS,
} from "../loginTypes";

const intialState = {
  isLoggedIn: false,
  error: null,
  loading: false,
};
export const loginReducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return { ...state, isLoggedIn: action.payload };
    case SET_LOGIN_LOADING:
      return { ...state, loading: action.payload };
    case SET_LOGIN_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

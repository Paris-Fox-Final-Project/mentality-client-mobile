import {
  SET_REGISTER_ERROR,
  SET_REGISTER_LOADING,
  SET_REGISTER_SUCCESS,
} from "../registerTypes";

const initialState = {
  isSuccess: false,
  isLoading: false,
  error: null,
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGISTER_ERROR:
      return { ...state, error: action.payload };
    case SET_REGISTER_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_REGISTER_SUCCESS:
      return { ...state, isSuccess: action.payload };
    default:
      return state;
  }
};

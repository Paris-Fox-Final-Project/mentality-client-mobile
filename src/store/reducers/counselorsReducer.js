import {
  SET_COUNSELOR_ERROR,
  SET_COUNSELOR_LOADING,
  SET_COUNSELOR_DATA,
} from "../counselorsTypes";

const intialState = {
  counselors: [],
  error: null,
  loading: false,
};
export const counselorsReducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_COUNSELOR_DATA:
      return { ...state, counselors: action.payload };
    case SET_COUNSELOR_LOADING:
      return { ...state, loading: action.payload };
    case SET_COUNSELOR_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

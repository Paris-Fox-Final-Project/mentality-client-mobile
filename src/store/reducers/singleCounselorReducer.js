import {
  SET_SINGLE_COUNSELOR_ERROR,
  SET_SINGLE_COUNSELOR_LOADING,
  SET_SINGLE_COUNSELOR_DATA,
} from "../counselorsTypes";

const intialState = {
  counselor: {},
  error: null,
  loading: false,
};
export const singleCounselorReducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_SINGLE_COUNSELOR_DATA:
      return { ...state, counselor: action.payload };
    case SET_SINGLE_COUNSELOR_LOADING:
      return { ...state, loading: action.payload };
    case SET_SINGLE_COUNSELOR_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

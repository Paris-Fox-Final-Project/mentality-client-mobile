import {
  SET_SINGLE_COUNSELOR_ERROR,
  SET_SINGLE_COUNSELOR_LOADING,
  SET_SINGLE_COUNSELOR_DATA,
} from "../singleCounselorTypes";

const intialState = {
  singleCounselor: {},
  error: null,
  loading: false,
};
export const singleCounselorReducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_SINGLE_COUNSELOR_DATA:
      return { ...state, singleCounselor: action.payload };
    case SET_SINGLE_COUNSELOR_LOADING:
      return { ...state, loading: action.payload };
    case SET_SINGLE_COUNSELOR_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

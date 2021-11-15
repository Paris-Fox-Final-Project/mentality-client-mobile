import {
  SET_CREATED_SCHEDULE_COUNSELING,
  SET_ERROR_CREATE_SCHEDULE_COUNSELING,
  SET_LOADING_CREATE_SCHEDULE_COUNSELING,
  SET_SUCCESS_CREATE_SCHEDULE_COUNSELING,
} from "../counselingTypes";

const initialState = {
  isSuccess: false,
  error: "",
  isLoading: false,
  createdCounseling: null,
};

export const counselingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUCCESS_CREATE_SCHEDULE_COUNSELING:
      return { ...state, isSuccess: action.payload };
    case SET_LOADING_CREATE_SCHEDULE_COUNSELING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR_CREATE_SCHEDULE_COUNSELING:
      return { ...state, error: action.payload };
    case SET_CREATED_SCHEDULE_COUNSELING:
      return { ...state, createdCounseling: action.payload };
    default:
      return state;
  }
};

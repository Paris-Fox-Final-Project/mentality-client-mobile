import {
  SET_HISTORIES_DATA,
  SET_HISTORIES_DATA_HISTORY_BY_ID,
  SET_HISTORIES_ERROR,
  SET_HISTORIES_LOADING,
} from "./historyTypes";

const initialState = {
  histories: [],
  isLoading: false,
  error: false,
  history: null,
};

export const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HISTORIES_DATA:
      return { ...state, histories: action.payload };
    case SET_HISTORIES_ERROR:
      return { ...state, error: action.payload };
    case SET_HISTORIES_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_HISTORIES_DATA_HISTORY_BY_ID:
      return { ...state, history: action.payload };
    default:
      return state;
  }
};

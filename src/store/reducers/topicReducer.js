import {
  SET_TOPICS_DATA,
  SET_TOPICS_ERROR,
  SET_TOPICS_LOADING,
} from "../topicTypes";

const initialState = {
  topics: [],
  isLoading: false,
  error: "",
};

export const topicReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOPICS_DATA: {
      return { ...state, topics: action.payload };
    }

    case SET_TOPICS_ERROR: {
      return { ...state, error: action.payload };
    }

    case SET_TOPICS_LOADING: {
      return { ...state, isLoading: action.payload };
    }

    default: {
      return state;
    }
  }
};

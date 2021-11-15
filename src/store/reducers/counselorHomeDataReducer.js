import {
    SET_COUNSELOR_HOME_DATA,
    SET_COUNSELOR_HOME_ERROR,
    SET_COUNSELOR_HOME_LOADING,
    SET_COUNSELOR_PROFILE_DATA
} from "../counselorHomeTypes"

const initialState = {
    homeData: [],
    isLoading: false,
    error: null,
    profile: {}
};

export const counselorHomeDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COUNSELOR_HOME_ERROR:
            return { ...state, error: action.payload };
        case SET_COUNSELOR_HOME_LOADING:
            return { ...state, isLoading: action.payload };
        case SET_COUNSELOR_HOME_DATA:
            return { ...state, homeData: action.payload };
        case SET_COUNSELOR_PROFILE_DATA:
            return { ...state, profile: action.payload };
        default:
            return state;
    }
};
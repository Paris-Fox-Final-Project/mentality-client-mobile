import {SET_COUNSELOR_COUNSELING_DETAIL_DATA,
    SET_COUNSELOR_COUNSELING_DETAIL_ERROR,
    SET_COUNSELOR_COUNSELING_DETAIL_LOADING
} from "../counselorCounselingDetailTypes"

const initialState = {
    isLoading: false,
    error: null,
    detail: ''
}

export const counselorCounselingDetailDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COUNSELOR_COUNSELING_DETAIL_ERROR:
            return { ...state, error: action.payload };
        case SET_COUNSELOR_COUNSELING_DETAIL_LOADING:
            return { ...state, isLoading: action.payload };
        case SET_COUNSELOR_COUNSELING_DETAIL_DATA:
            return { ...state, detail: action.payload };
        default:
            return state;
    }
};
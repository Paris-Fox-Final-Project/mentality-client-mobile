import { IS_LOADING_LOGIN, ERROR_STATE_LOGIN } from "../ActionType";

const initialState = {
    isLoading: false,
    error: ''
}

function reducer(state = initialState, action){
    if(action.type === IS_LOADING_LOGIN){
        return {...state, isLoading: action.payload}
    }else if(action.type === ERROR_STATE_LOGIN){
        return {...state, error: action.payload}
    }
    return state
}

export default reducer
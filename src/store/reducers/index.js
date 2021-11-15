import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { registerReducer } from "./registerReducer";
import {counselorHomeDataReducer} from "./counselorHomeDataReducer";
import {counselorCounselingDetailDataReducer} from "./counselorCounselingReducer" 
import { counselorsReducer } from "./counselorsReducer"
import { singleCounselorReducer } from "./singleCounselorReducer"

export default reducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  counselorHome: counselorHomeDataReducer,
  detail: counselorCounselingDetailDataReducer,
  counselors: counselorsReducer,
  singleCounselor: singleCounselorReducer
})

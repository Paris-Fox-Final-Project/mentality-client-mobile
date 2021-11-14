import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { registerReducer } from "./registerReducer";
import {counselorHomeDataReducer} from "./counselorHomeDataReducer";

export default reducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  counselorHome: counselorHomeDataReducer
});

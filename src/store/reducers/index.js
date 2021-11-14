import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { registerReducer } from "./registerReducer";

export default reducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
});

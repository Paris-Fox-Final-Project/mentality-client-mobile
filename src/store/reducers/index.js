import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { registerReducer } from "./registerReducer";
import { counselorsReducer } from "./counselorsReducer"
import { singleCounselorReducer } from "./singleCounselorReducer"

export default reducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  counselors: counselorsReducer,
  counselor: singleCounselorReducer
});

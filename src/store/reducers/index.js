import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { registerReducer } from "./registerReducer";
import { topicReducer } from "./topicReducer";

import { counselorHomeDataReducer } from "./counselorHomeDataReducer";
import { counselorCounselingDetailDataReducer } from "./counselorCounselingReducer";
export default reducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  counselorHome: counselorHomeDataReducer,
  detail: counselorCounselingDetailDataReducer,
  topic: topicReducer,
});

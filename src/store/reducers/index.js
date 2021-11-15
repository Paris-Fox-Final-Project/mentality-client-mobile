import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { registerReducer } from "./registerReducer";
import { topicReducer } from "./topicReducer";

import { counselorHomeDataReducer } from "./counselorHomeDataReducer";
import { counselorCounselingDetailDataReducer } from "./counselorCounselingReducer";
import { counselingReducer } from "./counselingReducer";
import { counselorsReducer } from "./counselorsReducer";
import { singleCounselorReducer } from "./singleCounselorReducer";
import { counselorHomeDataReducer } from "./counselorHomeDataReducer";
import { counselorCounselingDetailDataReducer } from "./counselorCounselingReducer";

export default reducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  counselors: counselorsReducer,
  singleCounselor: singleCounselorReducer,
  counselorHome: counselorHomeDataReducer,
  detail: counselorCounselingDetailDataReducer,
  topic: topicReducer,
  counseling: counselingReducer,
});

import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { registerReducer } from "./registerReducer";
import { topicReducer } from "./topicReducer";

export default reducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  topic: topicReducer,
});

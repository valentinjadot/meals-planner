import { combineReducers } from "redux";

import { baseReducer } from "./base/baseSlice";

const rootReducer = combineReducers({
  base: baseReducer,
});

export default rootReducer;

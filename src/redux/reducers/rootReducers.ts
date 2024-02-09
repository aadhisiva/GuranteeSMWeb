import { combineReducers } from "redux";
import { userReducers } from "./userReducer";

const rootReducers = combineReducers({
    auth: userReducers
});

export default rootReducers;
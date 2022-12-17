import { combineReducers } from "redux";

import authReducer from "./authReducer";
import loaderReducer from "./loaderReducer";

export default combineReducers({
    auth: authReducer,
    loader: loaderReducer
});
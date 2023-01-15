import { combineReducers } from "redux";

import authReducer from "./authReducer";
import loaderReducer from "./loaderReducer";
import blogsReducer from "./blogsReducer";
import usersReducer from "./usersReducer";
import themeReducer from "./themeReducer";

export default combineReducers({
    auth: authReducer,
    loader: loaderReducer,
    blogs: blogsReducer,
    users: usersReducer,
    theme: themeReducer
});
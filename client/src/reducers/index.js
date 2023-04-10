import { combineReducers } from "redux";

import authReducer from "./authReducer";
import loaderReducer from "./loaderReducer";
import blogsReducer from "./blogsReducer";
import usersReducer from "./usersReducer";
import interactionsReducer from "./interactionsReducer";
import commentsReducer from "./commentsReducer";
import readListReducer from "./readListReducer";
import themeReducer from "./themeReducer";

export default combineReducers({
    auth: authReducer,
    loader: loaderReducer,
    blogs: blogsReducer,
    users: usersReducer,
    interactions: interactionsReducer,
    comments: commentsReducer,
    readList: readListReducer,
    theme: themeReducer
});
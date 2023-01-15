import { LOG_IN, LOG_IN_ERROR, LOG_OUT } from "../actions/types";

const INITIAL_STATE = {
    isLoggedIn: null,
    userId: null,
    loginError: null
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOG_IN:
            return { ...state, isLoggedIn: true, userId: action.payload };
        case LOG_OUT:
            return { ...state, isLoggedIn: false, userId: null };
        case LOG_IN_ERROR:
            return { ...state, isLoggedIn: false, loginError: action.payload };
        default:
            return state;
    }
};

export default authReducer;
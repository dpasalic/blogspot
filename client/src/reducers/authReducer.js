import { LOG_IN, LOG_IN_ERROR, LOG_OUT } from "../actions/types";

const INITIAL_STATE = {
    isLoggedIn: null,
    userId: null,
    loginError: null
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOG_IN:
            return { isLoggedIn: true, userId: action.payload, loginError: null };
        case LOG_OUT:
            return { isLoggedIn: false, userId: null, loginError: null };
        case LOG_IN_ERROR:
            return { isLoggedIn: false, userId: null, loginError: action.payload };
        default:
            return state;
    }
};

export default authReducer;
import { LOG_IN, LOG_IN_ERROR, LOG_OUT } from "../actions/types";

const INITIAL_STATE = {
    isLoggedIn: null,
    loginError: null
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOG_IN:
            return { ...state, isLoggedIn: true };
        case LOG_OUT:
            return { ...state, isLoggedIn: false };
        case LOG_IN_ERROR:
            return { isLoggedIn: false, loginError: action.payload };
        default:
            return state;
    }
}; // call action creators from login component

export default authReducer;
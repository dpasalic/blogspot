import { SET_THEME } from "../actions/types";

const themeReducer = (state = "light", action) => {
    switch(action.type) {
        case SET_THEME:
            return action.payload;
        default:
            return state;
    }
};

export default themeReducer;
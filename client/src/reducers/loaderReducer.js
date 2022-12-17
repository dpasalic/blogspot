import { SHOW_LOADER } from "../actions/types";

const loaderReducer = (state = false, action) => {
    if (action.type === SHOW_LOADER) {
        return action.payload;
    }

    return state;
};

export default loaderReducer;
import _ from "lodash";
import {
    CREATE_BLOG,
    GET_BLOG,
    GET_BLOGS,
    EDIT_BLOG,
    DELETE_BLOG
} from "../actions/types";

// Blogs are stored in object instead of array
// because it is easier to handle data changes

const blogsReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_BLOG:
            return { ...state, [action.payload.id]: action.payload };
        case GET_BLOG:
            return { ...state, [action.payload.id]: action.payload };
        case GET_BLOGS:
            return { ...state, ..._.mapKeys(action.payload, "id") };
        case EDIT_BLOG:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_BLOG:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};

export default blogsReducer;
import _ from "lodash";
import {
    ADD_AS_READ,
    ADD_READING_BLOG,
    ADD_TO_READ_LIST
} from "../actions/types";

const INITIAL_STATE = {
    readBlogs: [],
    currentBlog: null,
    blogsToRead: []
};

const readListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_AS_READ:
            return {
                ...state,
                readBlogs: [ ...state.readBlogs, action.payload ],
                blogsToRead: state.blogsToRead.filter(e => !(_.isEqual(e, action.payload)))
            };
        case ADD_READING_BLOG:
            return { ...state, currentBlog: action.payload };
        case ADD_TO_READ_LIST:
            return {
                ...state,
                blogsToRead: [ ...state.blogsToRead, action.payload ],
                readBlogs: state.readBlogs.filter(e => !(_.isEqual(e, action.payload)))
            };
        default:
            return state;
    }
};

export default readListReducer;
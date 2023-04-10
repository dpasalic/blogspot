import _ from "lodash";
import { GET_COMMENTS, CREATE_COMMENT } from "../actions/types";

const commentsReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_COMMENTS:
            return { ...state, ..._.mapKeys(action.payload, "id") };
        case CREATE_COMMENT:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
};

export default commentsReducer;
import _ from "lodash";
import {
    GET_BLOG_INTERACTIONS, GET_ALL_INTERACTIONS,
    CREATE_INTERACTION, DELETE_INTERACTION
 } from "../actions/types";

const interactionsReducer = (state = [], action) => {
    switch(action.type) {
        case GET_BLOG_INTERACTIONS:
            return [ ...state, action.payload ];
        case GET_ALL_INTERACTIONS:
            return [ ...state, ...action.payload ];
        case CREATE_INTERACTION:
            return [ ...state, action.payload ];
        case DELETE_INTERACTION:
            return state.filter(intr => intr.id !== action.payload);
        default:
            return state;
    }
};

export default interactionsReducer;
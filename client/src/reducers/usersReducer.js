import { GET_USER } from "../actions/types";

const usersReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_USER:
            const user = {
                id: action.payload.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName
            };
            return { ...state, [user.id]: user };
        default:
            return state;
    }
};

export default usersReducer;
import blogspotAPI from "../api/blogspotAPI";
import { getRandomInt, parseJwt } from "../helpers";
import {
    SET_THEME, SHOW_LOADER,
    SIGN_UP, LOG_IN, LOG_IN_ERROR, LOG_OUT,
    CREATE_USER, GET_USER,
    CREATE_BLOG, GET_BLOG, GET_BLOGS
} from "./types";

// Action creators

export const setTheme = (theme) => {
    return { type: SET_THEME, payload: theme };
};

export const showLoader = (showLoaderBool) => {
    return { type: SHOW_LOADER, payload: showLoaderBool };
};

// Action creators that call API use Redux Thunk
// They return function with dispatch function as parameter
// to manually dispatch the results of API call to the reducers
export const signUp = (formValues) => async dispatch => {
    const response = await blogspotAPI.post("/users", {
        ...formValues,
        id: getRandomInt(10000, 99999),
        role: "user"
    });

    dispatch({ type: SIGN_UP, payload: response.data });
};

export const logIn = (formValues) => async dispatch => {
    try {
        const response = await blogspotAPI.post("/login", formValues);

        // Storing JWT inside local storage
        localStorage.setItem("accessToken", response.data.accessToken);
        dispatch({ type: LOG_IN });
        dispatch(showLoader(false));
    } catch (err) {
        console.log(err);
        dispatch({ type: LOG_IN_ERROR, payload: err.response.data });
        dispatch(showLoader(false));
    }

};

export const logOut = () => { return { type: LOG_OUT } };

export const authUser = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        const parsedToken = parseJwt(accessToken);
        const timeNow = new Date().getTime() / 1000;

        // Checking if JWT expired
        if (parsedToken.exp < timeNow) {
            localStorage.removeItem("accessToken");
            return { type: LOG_OUT };
        } else {
            return { type: LOG_IN };
        }
    }

    return { type: LOG_OUT };
};

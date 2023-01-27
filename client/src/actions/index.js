import {
    logIn as login,
    createBlog as crtBlg, getBlog as getBlg, getBlogs as getBlgs,
    editBlog as edtBlg, deleteBlog as dltBlg,
    getUser as getUsr
} from "../api";
import { parseJwt } from "../helpers";
import {
    SET_THEME, SHOW_LOADER,
    LOG_IN, LOG_IN_ERROR, LOG_OUT,
    CREATE_USER, GET_USER,
    CREATE_BLOG, GET_BLOG, GET_BLOGS, EDIT_BLOG, DELETE_BLOG
} from "./types";

// Action creators

// Action creators that call API use Redux Thunk
// They return function with dispatch function as parameter
// to manually dispatch the results of API call to the reducers


// AC for changing theme
export const setTheme = (theme = "") => {
    if (!theme) {
        const savedTheme = localStorage.getItem("theme");
        if (!savedTheme) {
            localStorage.setItem("theme", "light");
            return { type: SET_THEME, payload: "light" };
        } else {
            return { type: SET_THEME, payload: savedTheme };
        }
    }

    localStorage.setItem("theme", theme);
    return { type: SET_THEME, payload: theme };
};

// AC for changing loader bool state
// Using with redux level api calls
export const showLoader = (showLoaderBool) => {
    return { type: SHOW_LOADER, payload: showLoaderBool };
};

// AC for logging in
export const logIn = (values) => async dispatch => {
    try {
        const response = await login(values);

        // Storing JWT inside local storage
        localStorage.setItem("accessToken", response.data.accessToken);
        dispatch({ type: LOG_IN, payload: response.data.user.id });
        dispatch(showLoader(false));
    } catch (err) {
        console.log(err);
        dispatch({ type: LOG_IN_ERROR, payload: err.response.data });
        dispatch(showLoader(false));
    }

};

// AC for logging out
export const logOut = () => {
    localStorage.removeItem("accessToken");

    return { type: LOG_OUT }
};

// AC for authenticating user
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
            return { type: LOG_IN, payload: parsedToken.sub };
        }
    }

    localStorage.removeItem("accessToken");
    return { type: LOG_OUT };
};

export const getUser = (id) => async dispatch => {
    const response = await getUsr(id);

    dispatch({ type: GET_USER, payload: response.data });
};

// AC for creating a blog
export const createBlog = (values) => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await crtBlg(values, userId);

    dispatch({ type: CREATE_BLOG, payload: response.data });
};

// AC for getting a blog
export const getBlog = (id) => async dispatch => {
    const response = await getBlg(id);

    dispatch({ type: GET_BLOG, payload: response.data });
};

// AC for getting blogs
export const getBlogs = () => async dispatch => {
    const response = await getBlgs();

    dispatch({ type: GET_BLOGS, payload: response.data });
};

export const editBlog = (id, values) => async dispatch => {
    const response = await edtBlg(id, values);

    dispatch({ type: EDIT_BLOG, payload: response.data });
};

export const deleteBlog = (id) => async dispatch => {
    await dltBlg(id);

    dispatch({ type: DELETE_BLOG, payload: id });
};

export const getBlogsAndUsers = () => async (dispatch, getState) => {
    await dispatch(getBlogs());

    let userIds = [];
    Object.values(getState().blogs).forEach(blog => {
        if (!userIds.includes(blog.userId)) {
            dispatch(getUser(blog.userId));
            userIds.push(blog.userId);
        }
    });
};

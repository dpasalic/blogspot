import {
    logIn as login, getUser as getUsr, editUser as edtUsr,
    createBlog as crtBlg, getBlog as getBlg, getBlogs as getBlgs,
    editBlog as edtBlg, deleteBlog as dltBlg,
    getBlogInteractionsOfUser as getBlgIntrOfUsr, getAllInteractionsOfUser as getAllIntrOfUsr,
    createInteraction as crtIntr, deleteInteraction as dltIntr,
    getComments as getCmmts, createComment as crtCmmt
} from "../api";
import { parseJwt } from "../helpers";
import {
    SET_THEME, SHOW_LOADER,
    LOG_IN, LOG_IN_ERROR, LOG_OUT, GET_USER, EDIT_USER,
    CREATE_BLOG, GET_BLOG, GET_BLOGS, EDIT_BLOG, DELETE_BLOG,
    ADD_TO_READ_LIST, ADD_AS_READ, ADD_READING_BLOG,
    GET_BLOG_INTERACTIONS, GET_ALL_INTERACTIONS,
    CREATE_INTERACTION, DELETE_INTERACTION,
    GET_COMMENTS, CREATE_COMMENT
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
export const showLoader = showLoaderBool => {
    return { type: SHOW_LOADER, payload: showLoaderBool };
};

// AC for logging in
export const logIn = values => async dispatch => {
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

    return { type: LOG_OUT };
};

// AC for authenticating user
export const authUser = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        const parsedToken = parseJwt(accessToken);
        const timeNow = new Date().getTime() / 1000;

        // Check if JWT expired
        if (parsedToken.exp < timeNow) {
            localStorage.removeItem("accessToken");
            return { type: LOG_OUT };
        } else {
            return { type: LOG_IN, payload: Number(parsedToken.sub) };
        }
    }

    localStorage.removeItem("accessToken");
    return { type: LOG_OUT };
};

// AC for getting a user
export const getUser = id => async dispatch => {
    const response = await getUsr(id);

    dispatch({ type: GET_USER, payload: response.data });
};

// AC for updating user data in Redux state
export const editUserReduxState = user => async dispatch => {
    dispatch({ type: EDIT_USER, payload: user });
};

// AC for creating a blog
export const createBlog = values => async (dispatch, getState) => {
    const { userId } = getState().auth;

    const response = await crtBlg(values, userId);

    dispatch({ type: CREATE_BLOG, payload: response.data });
};

// AC for getting a blog
export const getBlog = id => async dispatch => {
    const response = await getBlg(id);

    dispatch({ type: GET_BLOG, payload: response.data });
};

// AC for getting blogs
export const getBlogs = () => async dispatch => {
    const response = await getBlgs();

    dispatch({ type: GET_BLOGS, payload: response.data });
};

// AC for inserting blogs that are not fetched through action creator into Redux state
export const getBlogsToReduxState = (payload) => {
    return { type: GET_BLOGS, payload: payload };
};

// AC for editting a blog, used only for increasing interactions count of a blog
export const editBlog = (id, values) => async dispatch => {
    const response = await edtBlg(id, values);

    dispatch({ type: EDIT_BLOG, payload: response.data });
};

// AC for deleting a blog
export const deleteBlog = (id) => async dispatch => {
    await dltBlg(id);

    dispatch({ type: DELETE_BLOG, payload: id });
};

// AC for getting interactions of a user, used only in other action creator
export const getBlogInteractionsOfUser = (userId, blogId) => async dispatch => {
    const response = await getBlgIntrOfUsr(userId, blogId);

    if (response.data.length > 0) {
        dispatch({ type: GET_BLOG_INTERACTIONS, payload: response.data[0] });
    }
};

// AC for getting all interactions of logged user
export const getAllInteractionsOfUser = (userId) => async dispatch => {
    const response = await getAllIntrOfUsr(userId);

    if (response.data.length > 0) {
        dispatch({ type: GET_ALL_INTERACTIONS, payload: response.data });
    }
};

// AC for getting blog's comments
export const getComments = (blogId) => async dispatch => {
    const response = await getCmmts(blogId);

    dispatch({ type: GET_COMMENTS, payload: response.data });
};

// AC for getting blog and its author, as well as logged user's interaction with blog if exists
// UI - User, Interactions
export const getBlogAndUI = blogId => async (dispatch, getState) => {
    await dispatch(getBlog(blogId));

    const currentBlog = getState().blogs[blogId];
    dispatch(addReadingBlog(currentBlog));

    await dispatch(getUser(currentBlog.userId));

    dispatch(getBlogInteractionsOfUser(getState().auth.userId, blogId));
};

// AC for getting blogs for main page
export const getBlogsAndUI = () => async (dispatch, getState) => {
    await dispatch(getBlogs());

    let userIds = [getState().auth.userId];
    Object.values(getState().blogs).forEach(blog => {
        if (!userIds.includes(blog.userId)) {
            dispatch(getUser(blog.userId));
            userIds.push(blog.userId);
        }
    });

    dispatch(getAllInteractionsOfUser(getState().auth.userId));
};

// AC for adding a blog to the readlist
export const addToReadList = blog => {
    return { type: ADD_TO_READ_LIST, payload: blog };
};

// AC for adding blog as already read
export const addAsRead = blog => {
    return { type: ADD_AS_READ, payload: blog };
};

// AC for adding current reading blog
export const addReadingBlog = blog => {
    return { type: ADD_READING_BLOG, payload: blog };
};

// AC for creating an interaction - like or dislike
export const createInteraction = (blogId, liked, disliked) => async (dispatch, getState) => {
    const { userId } = getState().auth;

    // Check for already existing interaction
    const interactionAlreadyExisting = getState().interactions
        .find(intr => intr.blogId === blogId && intr.userId === userId);
    // Delete if exists
    if (interactionAlreadyExisting) {
        const interactionTypeDelete = liked ? "dislike" : "like";
        dispatch(deleteInteraction(interactionAlreadyExisting.id, blogId, interactionTypeDelete));
    }
    
    // Create new interaction
    const responseIntr = await crtIntr(userId, blogId, liked, disliked);
    dispatch({ type: CREATE_INTERACTION, payload: responseIntr.data });

    // Update interactions counter of blog
    const { likes, dislikes } = getState().blogs[blogId];
    if (liked) {
        dispatch(editBlog(blogId, { likes: likes + 1, }));
    } else if (disliked) {
        dispatch(editBlog(blogId, { dislikes: dislikes + 1 }));
    }
};

// AC for deleting an interaction
export const deleteInteraction = (id, blogId, interactionType) => async (dispatch, getState) => {
    await dltIntr(id);
    dispatch({ type: DELETE_INTERACTION, payload: id });

    // Update interactions counter of blog
    const { likes, dislikes } = getState().blogs[blogId];
    if (interactionType === "like") {
        dispatch(editBlog(blogId, { likes: likes - 1 }));
    } else if (interactionType === "dislike") {
        dispatch(editBlog(blogId, { dislikes: dislikes - 1 }));
    }
};

// AC for creating a comment
export const createComment = (blogId, body) => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const { comments } = getState().blogs[blogId];

    const response = await crtCmmt(userId, blogId, body);
    dispatch({ type: CREATE_COMMENT, payload: response.data });

    // Update comments counter of blog
    dispatch(editBlog(blogId, { comments: comments + 1 }));
};

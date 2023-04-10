import blogspot from "./blogspot";
import { getRandomInt } from "../helpers";

// API calls used in action creators

// Users are given random 5 digit number as id
export const createUser = values => {
    return blogspot.post("/users", {
        ...values,
        id: getRandomInt(10000, 99999),
        role: "user"
    });
};

export const getUser = id => {
    return blogspot.get(`/users/${id}`);
};

// PATCH method used for updating only part of user data
export const editUser = (id, values) => {
    return blogspot.patch(`/users/${id}`, values);
};

export const logIn = values => {
    return blogspot.post("/login", values);
};

// Blogs have 6 digits number id
// createdAt property is formatted on client to show time passed from blog creation
export const createBlog = (values, userId) => {
    return blogspot.post("/blogs", {
        ...values,
        id: getRandomInt(100000, 999999),
        userId: userId,
        createdAt: new Date().valueOf() / 1000,
        likes: 0,
        dislikes: 0,
        comments: 0
    });
};

export const getBlog = id => {
    return blogspot.get(`/blogs/${id}`);
};

export const getBlogs = () => {
    return blogspot.get("/blogs");
};

export const getBlogsOfUser = userId => {
    return blogspot.get(`/blogs?userId=${userId}`);
};

export const editBlog = (id, values) => {
    return blogspot.patch(`/blogs/${id}`, values);
};

export const deleteBlog = id => {
    return blogspot.delete(`/blogs/${id}`);
};

export const getAllInteractionsOfUser = userId => {
    return blogspot.get(`/interactions?userId=${userId}`);
};

export const getBlogInteractionsOfUser = (userId, blogId) => {
    return blogspot.get(`/interactions?userId=${userId}&blogId=${blogId}`);
};

export const getComments = blogId => {
    return blogspot.get(`/comments?blogId=${blogId}`);
};

// Comments have id of 7 digits
export const createComment = (userId, blogId, body) => {
    return blogspot.post("/comments", {
        id: getRandomInt(1000000, 9999999),
        userId: userId,
        blogId: blogId,
        body: body,
        createdAt: new Date().valueOf() / 1000
    });
};

// Interaction's id is 8 digits number
export const createInteraction = (userId, blogId, liked, disliked) => {
    return blogspot.post("/interactions", {
        id: getRandomInt(10000000, 99999999),
        userId: userId,
        blogId: blogId,
        liked: liked,
        disliked: disliked,
        createdAt: new Date().valueOf() / 1000
    });
};

export const deleteInteraction = id => {
    return blogspot.delete(`/interactions/${id}`);
};
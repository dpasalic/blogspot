import blogspot from "./blogspot";
import { getRandomInt } from "../helpers";

export const createUser = (values) => {
    return blogspot.post("/users", {
        ...values,
        id: getRandomInt(10000, 99999),
        role: "user"
    });
};

export const getUser = (id) => {
    return blogspot.get(`/users/${id}`);
};

export const logIn = (values) => {
    return blogspot.post("/login", values);
};

export const createBlog = (values, userId) => {
    return blogspot.post("/blogs", {
        ...values,
        id: getRandomInt(100000, 999999),
        userId: userId,
        createdAt: new Date(),
        likes: 0,
        dislikes: 0,
        comments: 0
    });
};

export const getBlog = (id) => {
    return blogspot.get(`/blogs/${id}`);
};

export const getBlogs = () => {
    return blogspot.get("/blogs");
};

export const editBlog = (id, values) => {
    return blogspot.patch(`/blogs/${id}`, values);
};

export const deleteBlog = (id) => {
    return blogspot.delete(`/blogs/${id}`);
};
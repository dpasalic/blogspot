import blogspotAPI from "./blogspotAPI";
import { getRandomInt } from "../helpers";

export const createUser = (values) => {
    return blogspotAPI.post("/users", {
        ...values,
        id: getRandomInt(10000, 99999),
        role: "user"
    });
};
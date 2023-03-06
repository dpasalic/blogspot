import ErrorPage from "../pages/ErrorPage";
import BlogList from "../pages/BlogList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserShow from "../pages/UserShow";
import ReadList from "../pages/ReadList";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Valid routes throughout the app

const BLOG_LIST = "/";
const LOGIN = "/login";
const SIGNUP = "/signup";
const USER = "/users/:userId";
const READ_LIST = "/readlist";

export default [
    // Passed ErrorPage component to "/" route for handling requests to unexisting routes
    {
        path: BLOG_LIST,
        element: <ProtectedRoute><BlogList /></ProtectedRoute>,
        errorElement: <ErrorPage />
    },
    { path: SIGNUP, element: <PublicRoute><Signup /></PublicRoute> },
    { path: LOGIN, element: <PublicRoute><Login /></PublicRoute> },

    { path: USER, element: <ProtectedRoute><UserShow /></ProtectedRoute> },
    { path: READ_LIST, element: <ProtectedRoute><ReadList /></ProtectedRoute> }
];

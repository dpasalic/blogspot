import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { authUser } from "../actions";

// Component that serves as an abstraction layer
// for protecting routes from users that are not logged in

const ProtectedRoute = ({ authUser, isLoggedIn, children }) => {
    const navigate = useNavigate();
    // Getting path using useLocation hook and passing it to login page
    // so after logging in user is redirected to the desired page
    const { pathname } = useLocation();

    // Calling authUser action creator that checks and validates JWT token
    useEffect(() => { authUser(); }, []);

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate("/login", { state: { requestedPath: pathname } });
        }
    }, [isLoggedIn]);

    return children;
};

const mapStateToProps = (state) => {
    return { isLoggedIn: state.auth.isLoggedIn };
};

export default connect(
    mapStateToProps,
    { authUser }
)(ProtectedRoute);
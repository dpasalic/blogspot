import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { authUser } from "../actions";

// Component that serves as an abstraction layer for managing
// behaviour of public routes

const PublicRoute = ({ authUser, isLoggedIn, children }) => {
    const navigate = useNavigate();
    const { state } = useLocation();
    useEffect(() => { authUser(); }, []);

    useEffect(() => {
        if (isLoggedIn) {
            // Checking if user visited protected page before logging in
            // and redirecting there, if not redirecting to home page
            const path = state ? state.requestedPath : "/";
            navigate(path);
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
)(PublicRoute);
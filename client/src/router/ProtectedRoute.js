import { useEffect } from "react";
import { useNavigate, useLocation, ScrollRestoration } from "react-router-dom";
import { connect } from "react-redux";
import { authUser, getUser } from "../actions";
import Navigation from "../components/Navigation";

// Component that serves as an abstraction layer
// for routes that require user to be logged in

const ProtectedRoute = ({ authUser, getUser, auth, children }) => {
    const navigate = useNavigate();

    const { pathname, search } = useLocation();

    // Call authUser action creator that checks and validates JWT token
    useEffect(() => { authUser() }, []);

    useEffect(() => {
        if (auth.isLoggedIn === false) {
            // When user isnt logged in and tries to access protected route
            // redirect him to login route and pass the requested route
            // so after logging in user is automatically redirected to the desired route
            navigate("/login", { state: { requestedPath: pathname + search } });
        } else if (auth.isLoggedIn === true) {
            getUser(auth.userId);
        }
    }, [auth.isLoggedIn]);

    return (
        <div className="glass-wrapper">
            <ScrollRestoration />
            <Navigation />
            <div className="container">
                {children}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        users: state.users
    };
};

export default connect(
    mapStateToProps,
    { authUser, getUser }
)(ProtectedRoute);
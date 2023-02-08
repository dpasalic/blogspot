import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { authUser, getUser } from "../actions";
import Navigation from "../components/Navigation";

// Component that serves as an abstraction layer
// for protecting routes from users that are not logged in

const ProtectedRoute = ({ authUser, getUser, auth, users, children }) => {
    const navigate = useNavigate();
    // Getting path using useLocation hook and passing it to login page
    // so after logging in user is redirected to the desired page
    const { pathname } = useLocation();

    // Calling authUser action creator that checks and validates JWT token
    useEffect(() => { authUser() }, []);

    useEffect(() => {
        if (auth.isLoggedIn === false) {
            navigate("/login", { state: { requestedPath: pathname } });
        } else if (auth.isLoggedIn === true) {
            getUser(auth.userId);
        }
    }, [auth.isLoggedIn]);

    return (
        <div className="glass-wrapper">
            <Navigation />
            <div className="container">
                {children}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        users: state.users
    };
};

export default connect(
    mapStateToProps,
    { authUser, getUser }
)(ProtectedRoute);
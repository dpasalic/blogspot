import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { authUser } from "../actions";
import Navigation from "../components/Navigation";

// Component that serves as an abstraction layer
// for public routes

const PublicRoute = ({ authUser, isLoggedIn, children }) => {
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => { authUser(); }, []);

    useEffect(() => {
        if (isLoggedIn) {
            // Check if user visited protected page before logging in
            // and redirect there, if not redirect to home page
            const path = state && state.requestedPath ? state.requestedPath : "/";
            
            // prevPath is set for horizontal menu indicator handling
            navigate(path, { state: { prevPath: "/login" } });
        }
    }, [isLoggedIn]);

    return (
        <div className="glass-wrapper">
            <Navigation />
            <div className="container">
                {children}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return { isLoggedIn: state.auth.isLoggedIn };
};

export default connect(
    mapStateToProps,
    { authUser }
)(PublicRoute);
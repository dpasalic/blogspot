import { useEffect } from "react";
import { connect } from "react-redux";
import { useRouteError } from "react-router-dom";
import { authUser } from "../../actions";
import Navigation from "../../components/Navigation";
import lightError404 from "../../assets/light-error-404.svg";
import darkError404 from "../../assets/dark-error-404.svg";
import verdantError404 from "../../assets/verdant-error-404.svg";
import "./error-page.scss";

const ErrorPage = ({ authUser, theme }) => {
    const error = useRouteError();
    console.log(error);

    useEffect(() => { authUser() }, []);

    // Continue checking code
    // Implement readlist notification

    return (
        <div className="glass-wrapper">
            <Navigation />
            <div className="container">
                <div className="error-page-wrapper">
                    {error.status === 404 ?
                        <img
                            src={theme === "light" ? lightError404 :
                                theme === "dark" ? darkError404 : verdantError404}
                            alt="404 illustration"
                            className="error-illustration" /> : null}
                    <h2 className="error-page-h2-first">Oops! An error has occurred.</h2>
                    <h2 className="error-page-h2-second">
                        <i>{error.status} {error.statusText || error.message}</i>
                    </h2>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { theme: state.theme };
};

export default connect(
    mapStateToProps,
    { authUser }
)(ErrorPage);
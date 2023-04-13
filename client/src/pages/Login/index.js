import { connect } from "react-redux";
import { logIn, showLoader } from "../../actions";
import LoginForm from "./LoginForm"

const Login = ({ logIn, loginError, showLoader, loader }) => {
    const onFormSubmit = (email, password) => {
        showLoader(true);
        // Timeout to showcase loader
        setTimeout(() => logIn({ email, password }), 500);
    };

    return <LoginForm
            onFormSubmit={onFormSubmit}
            loginError={loginError}
            loader={loader} />;
};

const mapStateToProps = state => {
    return {
        loginError: state.auth.loginError,
        loader: state.loader
    };
};

export default connect(
    mapStateToProps,
    { logIn, showLoader }
)(Login);
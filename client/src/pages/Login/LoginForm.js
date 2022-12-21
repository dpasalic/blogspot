import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "../../components/Inputs/TextInput";
import PasswordInput from "../../components/Inputs/PasswordInput";
import Loader from "../../components/Loader";
import { validateLoginForm } from "../../helpers";
import "./Login.scss";

const LoginForm = ({ onFormSubmit, loginError, loader }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validate, setValidate] = useState(false);
    const [errors, setErrors] = useState({});

    const onSubmit = (event) => {
        event.preventDefault();

        if (!validate) { setValidate(true); }

        const errors = validateLoginForm(email, password);
        if (Object.keys(errors).length === 0) {
            onFormSubmit(email, password);
        } else {
            setErrors(errors);
        }
    };

    useEffect(() => {
        if (validate) {
            const errors = validateLoginForm(email, password);
            setErrors(errors);
        }
    }, [email, password]);

    return (
        <div className="login-form-wrapper">
            <h1 className="login-header">Log in</h1>

            <form onSubmit={onSubmit} noValidate>
                <TextInput
                    id="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    autoFocus />
                <PasswordInput
                    id="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password} />

                <button type="submit">
                    <div>
                        <span className="material-symbols-outlined login-submit-icon">login</span>
                        Submit
                    </div>
                </button>

                <div className="login-helper-text">
                    Don't have an account?
                    <Link to="/signup" className="login-link">Sign up!</Link>
                </div>

                {loader || loginError ?
                    <div className="login-submit-error">
                        {loader ? <Loader /> :
                            <span>
                                <span className="material-symbols-outlined login-error-icon">info</span>
                                {loginError}
                            </span>}
                    </div> : null}
            </form>
        </div>
    );
};

export default LoginForm;
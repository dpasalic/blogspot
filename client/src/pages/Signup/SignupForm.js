import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "../../components/Inputs/TextInput";
import PasswordInput from "../../components/Inputs/PasswordInput";
import EmailInput from "./EmailInput";
import Buttons from "./Buttons";
import Loader from "../../components/Loader";
import { validateSignupFirstSection, validateSignupSecondSection } from "../../helpers";
import "./signup.scss";

const SignupForm = ({ onFormSubmit, signupError, loader }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validate, setValidate] = useState({ firstSection: false, secondSection: false });
    const [errors, setErrors] = useState({});
    const [switchSection, setSwitchSection] = useState(false);
    const [transitionEnd, setTransitionEnd] = useState(false);

    useEffect(() => {
        if (validate.firstSection) {
            const err = validateSignupFirstSection(firstName, lastName);
            setErrors(err);
        }
    }, [firstName, lastName]);

    useEffect(() => {
        if (validate.secondSection) {
            const err = validateSignupSecondSection(email, password);
            setErrors(err);
        }
    }, [email, password]);

    const onSubmit = (event) => {
        event.preventDefault();

        const err = validateSignupSecondSection(email, password);
        if (Object.keys(err).length === 0) {
            onFormSubmit(firstName, lastName, email, password);
        } else { setErrors(err) }

        if (!validate.secondSection) { setValidate({ firstSection: false, secondSection: true }) }
    };

    const onSectionSwitch = () => {
        const err = validateSignupFirstSection(firstName, lastName);
        if (Object.keys(err).length === 0) { setSwitchSection(!switchSection) }
        else { setErrors(err) }

        if (!validate.firstSection) { setValidate({ firstSection: true, secondSection: false }) }
    };

    const switchSectionClassName = switchSection ? "switch-section" : "";

    return (
        <div className="signup-form-wrapper">
            <h1 className="signup-header">Sign up</h1>

            <form onSubmit={onSubmit} noValidate>
                <div className="section-container">
                    <div className={`section ${switchSectionClassName}`}>
                        <TextInput
                            id="firstName"
                            label="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            tabIndex={switchSection ? "-1" : "0"}
                            error={errors.firstName}
                            autoFocus />
                        <TextInput
                            id="lastName"
                            label="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            tabIndex={switchSection ? "-1" : "0"}
                            error={errors.lastName} />
                    </div>
                    <div className={`section ${switchSectionClassName}`}
                        onTransitionEnd={(e) =>
                            e.propertyName === "transform" ? setTransitionEnd(true) : null}>
                        <EmailInput
                            id="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            tabIndex={switchSection ? "0" : "-1"}
                            transitionEnd={transitionEnd}
                            error={errors.email} />
                        <PasswordInput
                            id="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            tabIndex={switchSection ? "0" : "-1"}
                            error={errors.password} />
                    </div>
                </div>

                <Buttons
                    switchSection={switchSection}
                    onSectionSwitch={onSectionSwitch} />

                <div className="signup-helper-text">
                        Already have an account?
                        <Link to="/login" state={{ prevPath: "/signup" }} className="login-link">Log in!</Link>
                    </div>

                    {loader || signupError ?
                        <div className="login-submit-error">
                            {loader ? <Loader /> :
                                <span>
                                    <span className="material-symbols-outlined login-error-icon">info</span>
                                    {signupError}
                                </span>}
                        </div> : null}
            </form>
        </div>
    );
};

export default SignupForm;
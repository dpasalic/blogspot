import { useState, useRef } from "react";
import "./Input.scss";

// Input used for login and signup forms

const PasswordInput = ({ type, id, label, value, onChange, tabIndex, autoFocus, error }) => {
    const [labelFocused, setLabelFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const ref = useRef(null);

    const onInputFocusChange = () => {
        if (value) {
            setLabelFocused(true);
        } else {
            setLabelFocused(!labelFocused);
        }
    };

    const onPasswordVisibilityChange = () => {
        setPasswordVisible(!passwordVisible);
        ref.current.focus();
    };

    return (
        <div className="input-wrapper">
            <label
                htmlFor={id}
                className={labelFocused ? "focused" : ""}>
                {label}
            </label>
            <input
                ref={ref}
                id={id}
                type={passwordVisible ? "text" : "password"}
                value={value}
                onChange={onChange}
                onFocus={onInputFocusChange}
                onBlur={onInputFocusChange}
                // tabIndex={tabIndex}
                autoFocus={autoFocus}
                autoComplete="new-password"
            />

            <div className="toggle-visibility">
                <span
                    onClick={onPasswordVisibilityChange}
                    className="material-symbols-outlined password-visibility-button">
                    visibility
                </span>
                <span onClick={onPasswordVisibilityChange} className="crossing-line-wrapper">
                    <span className={`crossing-line ${passwordVisible ? "visible" : "hidden"}`}></span>
                </span>
            </div>

            <div className="input-error">
                {error ?
                    <div>
                        <span className="material-symbols-outlined input-error-icon">info</span>
                        {error}
                    </div> : ""}
            </div>
        </div>
    );
};

export default PasswordInput;
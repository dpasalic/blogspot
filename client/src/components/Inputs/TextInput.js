import { useState, useRef } from "react";
import "./input.scss";

// Input used for login and signup forms

const TextInput = ({ id, label, value, onChange, tabIndex, autoFocus, error }) => {
    const [labelFocused, setLabelFocused] = useState(false);

    const onInputFocusChange = () => {
        if (value) {
            setLabelFocused(true);
        } else {
            setLabelFocused(!labelFocused);
        }
    };

    return (
        <div className="input-wrapper">
            <label
                htmlFor={id}
                className={labelFocused ? "focused" : ""}>
                {label}
            </label>
            <input
                id={id}
                type="text"
                value={value}
                onChange={onChange}
                onFocus={onInputFocusChange}
                onBlur={onInputFocusChange}
                tabIndex={tabIndex}
                autoFocus={autoFocus}
                autoComplete="new-password"
            />

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

export default TextInput;
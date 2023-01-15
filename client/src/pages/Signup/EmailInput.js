import { useState, useRef, useEffect } from "react";
import "../../components/Inputs/input.scss";

// Input used for email inside signup form
// Made separately to implement focus on input
// field after switching to second form section

const EmailInput = ({ id, label, value, onChange, tabIndex, error, transitionEnd }) => {
    const [labelFocused, setLabelFocused] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (transitionEnd) { ref.current.focus() }
    }, [transitionEnd]);

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
                ref={ref}
                id={id}
                type="email"
                value={value}
                onChange={onChange}
                onFocus={onInputFocusChange}
                onBlur={onInputFocusChange}
                tabIndex={tabIndex}
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

export default EmailInput;
import { useState } from "react";
import "./input.scss";

const TextArea = ({ id, label, value, onChange, tabIndex, autoFocus, error }) => {
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
            <textarea
                id={id}
                type="text"
                value={value}
                onChange={onChange}
                onFocus={onInputFocusChange}
                onBlur={onInputFocusChange}
                tabIndex={tabIndex}
                autoFocus={autoFocus}
                autoComplete="new-password">
            </textarea>

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

export default TextArea;
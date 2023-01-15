import { useState } from "react";

const SwitchButton = ({ onThemeChange }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const onPickerDrag = (event) => {
        // onThemeChange("dark");
console.log(event)
        setPosition({
            x: event.clientX,
            y: event.clientY
        });
    };

    //console.log(position)

    return (
        <div className="switch-button-path">
            <div
                className="switch-button-picker"
                onDrag={onPickerDrag}
                style={{
                    top: `${position.y}px`,
                    left: `${position.x}px`
                }}
            >
            </div>
        </div>
    );
};

export default SwitchButton;
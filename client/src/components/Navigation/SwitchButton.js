import { useEffect, useState } from "react";
import Draggable from "react-draggable";

const SwitchButton = ({ changeTheme, theme }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "light") {
            setPosition({ x: 0, y: 0 });
        } else if (savedTheme === "dark") {
            setPosition({ x: 35, y: 0 });
        } else {
            setPosition({ x: 70, y: 0 });
        }
    }, []);

    const setTheme = (theme) => {
        if (theme === "light") {
            setPosition({ x: 0, y: 0 });
            changeTheme("light");
        } else if (theme === "dark") {
            setPosition({ x: 35, y: 0 });
            changeTheme("dark");
        } else {
            setPosition({ x: 70, y: 0 });
            changeTheme("verdant");
        }
    };

    const onButtonDrag = (event, data) => {
        if (data.x < 20) {
            setTheme("light");
        } else if (data.x < 52) {
            setTheme("dark");
        } else {
            setTheme("verdant");
        }
    };

    const onKeySwitch = (event) => {
        if (event.keyCode === 39) {
            if (theme === "light") {
                setTheme("dark");
            } else if (theme === "dark") {
                setTheme("verdant");
            }
        } else if (event.keyCode === 37) {
            if (theme === "verdant") {
                setTheme("dark");
            } else if (theme === "dark") {
                setTheme("light");
            }
        }
    };

    return (
        <div className="switch-button-path">
            <Draggable
                axis="x"
                bounds="parent"
                position={position}
                onStop={onButtonDrag}>
                <button
                    onKeyDown={onKeySwitch}
                    className="switch-button-picker"></button>
            </Draggable>

            <div
                onClick={() => setTheme("light")}
                className="switch-button-option">●</div>
            <div
                onClick={() => setTheme("dark")}
                className="switch-button-option">●</div>
            <div
                onClick={() => setTheme("verdant")}
                className="switch-button-option">●</div>
        </div>
    );
};

export default SwitchButton;
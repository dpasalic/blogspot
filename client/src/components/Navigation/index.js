import { useEffect } from "react";
import { connect } from "react-redux";
import { setTheme } from "../../actions";
import SwitchButton from "./SwitchButton";
import useScrollPos from "../../hooks/useScrollPos";
import useViewportDimensions from "../../hooks/useViewportDimensions";
import logo from "../../assets/dark-logo.png";
import "./navigation.scss";

const Navigation = ({ setTheme }) => {
    const SCROLL_STEP = 45;
    const scrollPos = useScrollPos(SCROLL_STEP);
    const viewportDims = useViewportDimensions();

    const onThemeChange = (theme) => {
        setTheme(theme);
    };

    useEffect(() => {
        setTheme();
    }, []);

    return (
        <div className={`navigation
            ${scrollPos > SCROLL_STEP ? "navigation-low" : "navigation-high"}
        `}>
            <div className="logo">
                <img src={logo} />
            </div>

            <SwitchButton
                onThemeChange={onThemeChange} />
            
            <div>asd</div>
        </div>
    );
};

export default connect(
    null,
    { setTheme }
)(Navigation);

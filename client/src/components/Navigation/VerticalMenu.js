import { useState } from "react";
import { useLocation } from "react-router-dom";
import NavigationLink from "./NavigationLink";
import FocusTrap from "focus-trap-react";
import "./vertical-menu.scss";

const VerticalMenu = ({ logOut, isLoggedIn, children }) => {
    const [menuActive, setMenuActive] = useState(false);
    const [menuClassName, setMenuClassName] = useState("hide-vertical-menu");
    const [barClassName, setBarClassName] = useState("");
    const [trapActive, setTrapActive] = useState(false);

    const location = useLocation();

    const onMenuActivityChange = (e) => {
        const menuButtonIcon = e ? e.target.innerHTML : null;
        
        if (menuButtonIcon === "clear_all") {
            setMenuClassName("show-vertical-menu");
            setBarClassName("bar-slide-in");
            setTrapActive(true);
        } else {
            setMenuClassName("visually-hide-vertical-menu");
            setBarClassName("bar-slide-out");
            setTrapActive(false);
        }

        setMenuActive(!menuActive);
    };

    const onMenuAnimationEnd = (e) => {
        if (e.animationName === "visually-hide-vertical-menu") {
            setMenuClassName("hide-vertical-menu");
        }
    };

    return (
        <FocusTrap active={trapActive}>
            <div className="vertical-menu-wrapper">
                <button
                    onClick={onMenuActivityChange}
                    className={`material-symbols-outlined menu-icon
                            ${menuActive ? "menu-icon-fade1" : "menu-icon-fade2"}`}>
                    {!menuActive ? "clear_all" : "close"}
                </button>

                <div
                    onClick={onMenuActivityChange}
                    onAnimationEnd={onMenuAnimationEnd}
                    className={`vertical-menu ${menuClassName}`}>
                    <div
                        onClick={e => e.stopPropagation()}
                        className={`bar first-bar first-${barClassName}`}></div>
                    <div
                        onClick={e => e.stopPropagation()}
                        className={`bar second-bar second-${barClassName}`}>
                        {isLoggedIn ?
                            <>
                                <NavigationLink
                                    to="/"
                                    icon="home"
                                    onLinkClick={onMenuActivityChange}
                                    currentRoute={location.pathname} />
                                <NavigationLink
                                    to={`/users/99`}
                                    icon="person"
                                    onLinkClick={onMenuActivityChange}
                                    currentRoute={location.pathname} />
                                <NavigationLink
                                    to="/login"
                                    icon="logout"
                                    onLinkClick={() => { logOut(); }}
                                    currentRoute={location.pathname} />
                            </> :
                            <>
                                <NavigationLink
                                    to="/login"
                                    icon="login"
                                    onLinkClick={onMenuActivityChange}
                                    currentRoute={location.pathname} />
                                <NavigationLink
                                    to="/signup"
                                    icon="person_add"
                                    onLinkClick={onMenuActivityChange}
                                    currentRoute={location.pathname} />
                            </>}
                    </div>
                    <div
                        onClick={e => e.stopPropagation()}
                        className={`bar third-bar third-${barClassName}`}>
                        {children}
                    </div>
                </div>
            </div>
        </FocusTrap >
    );
};

export default VerticalMenu;
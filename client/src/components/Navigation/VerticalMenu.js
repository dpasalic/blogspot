import { useState } from "react";
import { useLocation } from "react-router-dom";
import NavigationLink from "./NavigationLink";
import FocusTrap from "focus-trap-react";
import "./vertical-menu.scss";
import { conforms } from "lodash";

const VerticalMenu = ({ logOut, isLoggedIn, children }) => {
    const [menuButtonClick, setMenuButtonClick] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [animationActive, setAnimationActive] = useState(false);
    const [trapActive, setTrapActive] = useState(false);

    const location = useLocation();

    let verticalMenuClassName = "";
    if (!menuActive) {
        verticalMenuClassName = "hide-vertical-menu";
    } else if (animationActive) {
        verticalMenuClassName = "show-vertical-menu";
    } else {
        verticalMenuClassName = "visually-hide-vertical-menu";
    }

    let barClassName = "";
    if (menuActive && animationActive) {
        barClassName = "bar-slide-in";
    } else if (menuActive && !animationActive) {
        barClassName = "bar-slide-out";
    }

    const onMenuIconClick = () => {
        setMenuButtonClick(!menuButtonClick);

        if (!menuActive) {
            setMenuActive(true);
            setAnimationActive(true);
            setTrapActive(true);
        } else {
            setAnimationActive(false);
        }
    };

    const onMenuAnimationEnd = (e) => {
        if (e.animationName === "visually-hide-vertical-menu") {
            setMenuActive(false);
            setTrapActive(false);
        }
    };

    return (
        <div className="vertical-menu-wrapper">
            <FocusTrap active={trapActive}>
                <div>
                    <button
                        onClick={onMenuIconClick}
                        className={`material-symbols-outlined menu-icon
                    ${menuButtonClick ? "menu-icon-fade1" : "menu-icon-fade2"}`}>
                        {!animationActive ? "clear_all" : "close"}
                    </button>

                    <div
                        onClick={() => setAnimationActive(false)}
                        onAnimationEnd={onMenuAnimationEnd}
                        className={`vertical-menu ${verticalMenuClassName}`}>
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
                                        onLinkClick={() => setAnimationActive(false)}
                                        currentRoute={location.pathname} />
                                    <NavigationLink
                                        to={`/users/99`}
                                        icon="person"
                                        onLinkClick={() => setAnimationActive(false)}
                                        currentRoute={location.pathname} />
                                    <NavigationLink
                                        to="/login"
                                        icon="logout"
                                        onLinkClick={() => { logOut() }}
                                        currentRoute={location.pathname} />
                                </> :
                                <>
                                    <NavigationLink
                                        to="/login"
                                        icon="login"
                                        onLinkClick={() => setAnimationActive(false)}
                                        currentRoute={location.pathname} />
                                    <NavigationLink
                                        to="/signup"
                                        icon="person_add"
                                        onLinkClick={() => setAnimationActive(false)}
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
            </FocusTrap>
        </div>
    );
};

export default VerticalMenu;
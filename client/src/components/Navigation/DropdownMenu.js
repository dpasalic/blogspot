import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useOutsideClickAlert from "../../hooks/useOutsideClickAlert";
import NavigationLink from "./NavigationLink";
import "./dropdown-menu.scss";

const DropdownMenu = ({ logOut, isLoggedIn, userId, currentBlog }) => {
    const [menuButtonClick, setMenuButtonClick] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [animationActive, setAnimationActive] = useState(false);

    const dropdownRef = useRef(null);
    const outsideClickAlert = useOutsideClickAlert(dropdownRef);

    const location = useLocation();

    // Detect click outside of dropdown and hide it
    useEffect(() => {
        if (outsideClickAlert) {
            setAnimationActive(false);
        }
    }, [outsideClickAlert]);

    let dropdownMenuClassName = "";
    if (!menuActive) {
        dropdownMenuClassName = "hide-menu";
    } else if (animationActive) {
        dropdownMenuClassName = "show-menu";
    } else {
        dropdownMenuClassName = "visually-hide-menu";
    }

    const onMenuIconClick = () => {
        setMenuButtonClick(!menuButtonClick);

        if (!menuActive) {
            setMenuActive(true);
            setAnimationActive(true);
        } else {
            setAnimationActive(false);
        }
    };

    // Set menu "display: none" after visually hides
    const onMenuAnimationEnd = e => {
        if (e.animationName === "hide-dropdown-bg") {
            setMenuActive(false);
        }
    };

    return (
        <div ref={dropdownRef} className="dropdown-menu-wrapper">
            <button
                onClick={onMenuIconClick}
                className={`material-symbols-outlined menu-icon
                    ${menuButtonClick ? "menu-icon-fade1" : "menu-icon-fade2"}`}>
                {!animationActive ? "expand_more" : "expand_less"}
            </button>
            <div className="dropdown-indicator"></div>

            <div
                onAnimationEnd={onMenuAnimationEnd}
                className={`dropdown-menu ${dropdownMenuClassName}`}>
                <div className={`dropdown-bg ${animationActive ? "show-dropdown-bg" : "hide-dropdown-bg"}`}></div>
                {isLoggedIn ?
                    <>
                        <NavigationLink
                            to="/"
                            icon="home"
                            onLinkClick={() => setAnimationActive(false)}
                            currentRoute={location.pathname} />
                        <NavigationLink
                            to={currentBlog ? `/readlist?blogId=${currentBlog.id}` : "/readlist"}
                            icon="chrome_reader_mode"
                            onLinkClick={() => setAnimationActive(false)}
                            currentRoute={location.pathname} />
                        <NavigationLink
                            to={`/users/${userId}`}
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
                            className="signup"
                            onLinkClick={() => setAnimationActive(false)}
                            currentRoute={location.pathname} />
                    </>}
            </div>
        </div>
    );
};

export default DropdownMenu;
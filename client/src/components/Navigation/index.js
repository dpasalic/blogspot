import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setTheme, logOut } from "../../actions";
import useScrollPos from "../../hooks/useScrollPos";
import useViewportDimensions from "../../hooks/useViewportDimensions";
import SwitchButton from "./SwitchButton";
import HorizontalMenu from "./HorizontalMenu";
import DropdownMenu from "./DropdownMenu";
import VerticalMenu from "./VerticalMenu";
import lightLogo from "../../assets/light-logo.png";
import darkLogo from "../../assets/dark-logo.png";
import verdantLogo from "../../assets/verdant-logo.png";
import "./navigation.scss";

const Navigation = ({
    setTheme, logOut, isLoggedIn, userId,
    theme, currentBlog, numberOfBlogsInReadlist
}) => {
    const SCROLL_STEP = 45;
    const scrollPos = useScrollPos(SCROLL_STEP);
    const viewportDims = useViewportDimensions();

    const location = useLocation();

    useEffect(() => {
        setTheme();
    }, []);

    const onThemeChange = (theme) => {
        setTheme(theme);
    };

    return (
        <div className={`navigation
            ${scrollPos > SCROLL_STEP ? "navigation-low" : "navigation-high"}
        `}>
            <Link
                to="/"
                state={{ prevPath: location.pathname }}
                className="logo">
                <img src={theme === "light" ? lightLogo :
                    theme === "dark" ? darkLogo : verdantLogo} />
                {viewportDims.width <= 640 || viewportDims.width >= 1500 ?
                    <div className="logo-text">Blogspot</div> : null}
            </Link>

            {viewportDims.width > 640 ?
                <SwitchButton
                    theme={theme}
                    changeTheme={onThemeChange} /> : null}

            {viewportDims.width > 1500 ?
                <HorizontalMenu
                    logOut={logOut}
                    isLoggedIn={isLoggedIn}
                    userId={userId}
                    currentBlog={currentBlog}
                    numberOfBlogsInReadlist={numberOfBlogsInReadlist} /> :
                viewportDims.width > 640 ?
                    <DropdownMenu
                        logOut={logOut}
                        isLoggedIn={isLoggedIn}
                        userId={userId}
                        currentBlog={currentBlog}
                        numberOfBlogsInReadlist={numberOfBlogsInReadlist} /> :
                    <VerticalMenu
                        logOut={logOut}
                        isLoggedIn={isLoggedIn}
                        userId={userId}
                        currentBlog={currentBlog}
                        numberOfBlogsInReadlist={numberOfBlogsInReadlist}>
                        <SwitchButton
                            theme={theme}
                            changeTheme={onThemeChange} />
                    </VerticalMenu>}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        userId: state.auth.userId,
        theme: state.theme,
        currentBlog: state.readList.currentBlog,
        numberOfBlogsInReadlist: state.readList.blogsToRead.length
    };
};

export default connect(
    mapStateToProps,
    { setTheme, logOut }
)(Navigation);

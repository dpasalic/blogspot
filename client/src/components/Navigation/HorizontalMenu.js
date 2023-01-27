import { useLocation } from "react-router-dom";
import NavigationLink from "./NavigationLink";
import "./horizontal-menu.scss";

const HorizontalMenu = ({ logOut, isLoggedIn }) => {
    const location = useLocation();

    const addPickerClassName = () => {
        const currentPath = location.pathname;
        const prevPath = location.state ? location.state.prevPath : null

        if (!prevPath) {
            return "";
        } else if (currentPath === "/") {
            return "blog-list-from-right";
        } else if (currentPath.includes("users") && prevPath === "/login") {
            return "standing-still";
        } else if (currentPath.includes("users")) {
            return "user-show-from-left";
        } else if (currentPath === "/login" && prevPath === "/") {
            return "login-from-left";
        } else if (currentPath === "/login" && prevPath.includes("users")) {
            return "standing-still";
        } else if (currentPath === "/login") {
            return "login-from-right";
        } else if (currentPath === "/signup") {
            return "signup-from-left";
        }
    };

    return (
        <div className="horizontal-menu-wrapper">
            <div className="horizontal-menu">
                {isLoggedIn ?
                    <>
                        <NavigationLink
                            to="/"
                            icon="home"
                            currentRoute={location.pathname} />
                        <NavigationLink
                            to={`/users/99`}
                            icon="person"
                            currentRoute={location.pathname} />
                        <NavigationLink
                            to="/login"
                            icon="logout"
                            onLinkClick={() => logOut()}
                            currentRoute={location.pathname} />
                    </> :
                    <>
                        <NavigationLink
                            to="/login"
                            icon="login"
                            currentRoute={location.pathname} />
                        <NavigationLink
                            to="/signup"
                            icon="person_add"
                            currentRoute={location.pathname} />
                    </>}
            </div>

            {/* {isLoggedIn ?
                <div className={`page-indicator ${location.pathname === "/" ? "/" : "/users/id"}`}>
                </div> :
                <div className={`page-indicator ${
                        location.state && location.state.prevPath === "/" ? "/login-from-left" :
                            location.state && /\/users\//.test(location.state.prevPath) ? "login-standing" : location.pathname
                    }`}></div>} */}
            
            <div className={`
                    page-indicator
                    ${location.pathname.includes("users") ? "/users/id" : location.pathname}
                    ${addPickerClassName()}
                `}></div>
        </div>
    );
};

export default HorizontalMenu;
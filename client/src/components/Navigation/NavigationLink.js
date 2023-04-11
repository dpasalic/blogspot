import { Link, useLocation } from "react-router-dom";

const NavigationLink = ({ to, icon, onLinkClick, currentRoute, className }) => {
    const location = useLocation();

    const isActive = currentRoute === to;

    // Finish implementing readlist notification
    // Fix readlist bug where readlist appears empty on direct click
    // even tho there are blogs to read

    return (
        <Link
            to={to}
            state={{ prevPath: location.pathname }}
            onClick={onLinkClick}
            className={`${isActive ? "active" : ""} ${className}`}>
            <div className="material-symbols-outlined">
                {icon}
            </div>
        </Link>
    );
};

export default NavigationLink;
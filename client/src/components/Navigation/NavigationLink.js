import { Link, useLocation } from "react-router-dom";

// Navigation link button

const NavigationLink = ({ to, icon, onLinkClick, currentRoute, className }) => {
    const location = useLocation();

    const isActive = currentRoute === to;

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
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Navigation link button for Readlist
// Made separate because of notification implementation

const ReadListNavigationLink = ({
    to, icon, onLinkClick, currentRoute,
    numberOfBlogsInReadlist, className
}) => {
    const [increaseNotificationClassName, setIncreaseNotificationClassName] = useState("");
    const location = useLocation();

    const isActive = currentRoute === to;

    // Extract readlist string from "to" prop
    const isReadListLink = to.substr(1, 8) === "readlist";

    useEffect(() => {
        // Fire animation of notification increasing
        // on every new blog added to Readlist
        // Remove animation class after timeout
        // so animation can fire again
        if (numberOfBlogsInReadlist > 1) {
            setIncreaseNotificationClassName("readlist-increase-notification");

            setTimeout(() => setIncreaseNotificationClassName(""), 300);
        }
    }, [numberOfBlogsInReadlist]);

    return (
        <Link
            to={to}
            state={{ prevPath: location.pathname }}
            onClick={onLinkClick}
            data-readlist-blogs-number={numberOfBlogsInReadlist}
            className={`
                ${isActive ? "active" : ""}
                ${isReadListLink && numberOfBlogsInReadlist > 0 ? "readlist-notification" : ""}
                ${isReadListLink && numberOfBlogsInReadlist === 1 ? "readlist-show-notification" : ""}
                ${increaseNotificationClassName}
                ${className}
            `}>
            <div className="material-symbols-outlined">
                {icon}
            </div>
        </Link>
    );
};

export default ReadListNavigationLink;
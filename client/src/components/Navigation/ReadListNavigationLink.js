import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavigationLink = ({ to, icon, onLinkClick, currentRoute, numberOfBlogsInReadlist, className }) => {
    const [increaseNotificationClassName, setIncreaseNotificationClassName] = useState("");
    const location = useLocation();

    const isActive = currentRoute === to;
    const isReadListLink = to.substr(1, 8) === "readlist";

    useEffect(() => {
        if (numberOfBlogsInReadlist > 1) {
            setIncreaseNotificationClassName("readlist-increase-notification");

            setTimeout(() => setIncreaseNotificationClassName(""), 300);
        }
    }, [numberOfBlogsInReadlist]);

    // Finish implementing readlist notification
    // Fix readlist bug where readlist appears empty on direct click
    // even tho there are blogs to read

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

export default NavigationLink;
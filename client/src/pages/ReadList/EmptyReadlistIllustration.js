import { Link } from "react-router-dom";
import lightEmptyReadListSVG from "../../assets/light-empty-readlist.svg";
import darkEmptyReadListSVG from "../../assets/dark-empty-readlist.svg";
import verdantEmptyReadListSVG from "../../assets/verdant-empty-readlist.svg";

const EmptyReadListIllustration = ({ theme }) => {
    return (
        <div className="empty-readlist-illustration-wrapper">
            <img
                src={theme === "light" ? lightEmptyReadListSVG :
                    theme === "dark" ? darkEmptyReadListSVG : verdantEmptyReadListSVG}
                alt="empty-readlist-illustration"
                className="empty-readlist-svg" />
            <div className="empty-readlist-message">
                <span>Your readlist is empty!</span>
                <br />
                Here, you can read blogs you desire as well as blogs you have already read or added for reading.
                <br />
                Explore blogs <Link to="/">here</Link>
            </div>
        </div>
    );
};

export default EmptyReadListIllustration;
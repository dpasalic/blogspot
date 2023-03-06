import { useState, useEffect } from "react";

const ListIndicator = ({ list, currentPosition, readBlogsLength, switchClick }) => {
    const [listOffset, setListOffset] = useState(20 * readBlogsLength + 10);
    const [mainDotAnimation, setMainDotAnimation] = useState("");

    useEffect(() => {
        if (switchClick.left) {
            setListOffset(listOffset - 20);
        } else if (switchClick.right) {
            setListOffset(listOffset + 20);
        }

        setMainDotAnimation("list-indicator-main-dot-animation");
        setTimeout(() => setMainDotAnimation(""), 300);
    }, [switchClick]);

    if (list.length === 0) {
        return null;
    }

    const renderListDots = () => {
        return list.map(i => {
            return <div key={i.id} className="dot-wrapper">
                <div className="dot"></div>
            </div>;
        });
    };

    return (
        <div className="list-indicator-wrapper">
            <div
                style={{ transform: `translateX(-${listOffset}px)` }}
                className="list-indicator-dots">{renderListDots()}</div>
            <div className="list-indicator-main-dot-wrapper">
                <div className={`list-indicator-main-dot ${mainDotAnimation}`}></div>
            </div>
        </div>
    );
};

export default ListIndicator;
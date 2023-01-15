import "./tooltip.scss";

const Tooltip = ({ message }) => {
    return (
        <div className="tooltip">
            <div className="tooltip-message">
                {message}
            </div>
        </div>
    );
};

export default Tooltip;
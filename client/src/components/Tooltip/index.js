import "./tooltip.scss";

const Tooltip = ({ message, position }) => {
    return (
        <div className={`tooltip ${position}`}>
            <div className="tooltip-message">
                {message}
            </div>
        </div>
    );
};

export default Tooltip;
const Buttons = ({ switchSection, onSectionSwitch }) => {
    const onSwitchButtonClick = () => {
        onSectionSwitch();
    };

    return (
        <div className={`buttons-section ${switchSection ? "switched" : ""}`}>
            <button
                type="button"
                disabled={false}
                className="switch-button"
                onClick={onSwitchButtonClick}
                tabIndex="0"
            >
                <span className="material-symbols-outlined arrow-switch-icon">
                    {switchSection ? "arrow_back" : "arrow_forward"}
                </span>
                <span>
                    {!switchSection ? "Continue" : ""}
                </span>
            </button>

            <button
                type="submit"
                disabled={!switchSection ? true : false}
                className={!switchSection ? "hide-submit-button" : ""}
                tabIndex={!switchSection ? "-1" : "0"}
            >
                <span className="material-symbols-outlined signup-submit-icon">input</span>
                <span>Submit</span>
            </button>
        </div>
    );
};

export default Buttons;
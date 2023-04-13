import { useState } from "react";
import useViewportDimensions from "../../hooks/useViewportDimensions";
import Tooltip from "../../components/Tooltip";

const SwitchButtons = ({ isLeftButtonActive, isRightButtonActive, onSwitchLeft, onSwitchRight }) => {
    const [activeSwitchButton, setActiveSwitchButton] = useState("");

    const { width: viewportWidth } = useViewportDimensions();

    const onSwitchButtonClick = e => {
        if (e.currentTarget.id === "left-button") {
            setActiveSwitchButton("left");
            onSwitchLeft();
        } else {
            setActiveSwitchButton("right");
            onSwitchRight();
        }

        setTimeout(() => {
            setActiveSwitchButton("");
        }, 300);
    };

    // Render different set of buttons for desktop and mobile screen
    if (viewportWidth > 960) {
        return <ButtonsForDesktop
            onSwitchButtonClick={onSwitchButtonClick}
            activeSwitchButton={activeSwitchButton}
            isLeftButtonActive={isLeftButtonActive}
            isRightButtonActive={isRightButtonActive} />;
    } else {
        return <ButtonsForMobile
            onSwitchButtonClick={onSwitchButtonClick}
            isLeftButtonActive={isLeftButtonActive}
            isRightButtonActive={isRightButtonActive} />;
    }
};

const ButtonsForDesktop = ({ onSwitchButtonClick, activeSwitchButton, isLeftButtonActive, isRightButtonActive }) => {
    const [disableTooltips, setDisableTooltips] = useState(false);

    const onSwitchDesktopButtonClick = (e) => {
        setDisableTooltips(true);
        onSwitchButtonClick(e);
    };

    return (
        <>
            <div className="desktop-button-wrapper desktop-left-button-wrapper">
                <button
                    id="left-button"
                    onClick={onSwitchDesktopButtonClick}
                    tabIndex={!isLeftButtonActive ? "-1" : "0"}
                    className={`desktop-button desktop-left-button ${!isLeftButtonActive ? "disabled-desktop-button" : ""}`}>
                    <div className={`
                        ${activeSwitchButton === "left" ? "desktop-button-animation-active" : ""}
                        desktop-button-animation desktop-left-button-animation`}></div>
                    <div className="desktop-indicator-gradient desktop-left-gradient"></div>
                    <div className="material-symbols-outlined desktop-button-icon desktop-left-button-icon">
                        arrow_back_ios
                    </div>
                </button>
                {disableTooltips ? null :
                    <Tooltip
                        message={"Already read blogs"}
                        position={"left-switch"} />}
            </div>
            <div className="desktop-button-wrapper desktop-right-button-wrapper">
                <button
                    id="right-button"
                    onClick={onSwitchDesktopButtonClick}
                    tabIndex={!isRightButtonActive ? "-1" : "0"}
                    className={`desktop-button desktop-right-button ${!isRightButtonActive ? "disabled-desktop-button" : ""}`}>
                    <div className={`
                        ${activeSwitchButton === "right" ? "desktop-button-animation-active" : ""}
                        desktop-button-animation desktop-right-button-animation`}></div>
                    <div className="desktop-indicator-gradient desktop-right-gradient"></div>
                    <div className="material-symbols-outlined desktop-button-icon desktop-right-button-icon">
                        arrow_forward_ios
                    </div>
                </button>
                {disableTooltips ? null :
                    <Tooltip
                        message={"Blogs added to readlist"}
                        position={"right-switch"} />}
            </div>
        </>
    );
};

const ButtonsForMobile = ({ onSwitchButtonClick, isLeftButtonActive, isRightButtonActive }) => {
    const onSwitchDesktopButtonClick = (e) => {
        onSwitchButtonClick(e);
    };

    return (
        <div className="mobile-buttons-wrapper">
            <button
                id="left-button"
                onClick={onSwitchDesktopButtonClick}
                tabIndex={!isLeftButtonActive ? "-1" : "0"}
                className={`mobile-button mobile-left-button ${!isLeftButtonActive ? "disabled-mobile-button" : ""}`}>
                <div className="material-symbols-outlined mobile-button-icon mobile-left-button-icon">
                    arrow_back_ios
                </div>
            </button>
            <button
                id="right-button"
                onClick={onSwitchDesktopButtonClick}
                tabIndex={!isRightButtonActive ? "-1" : "0"}
                className={`mobile-button mobile-right-button ${!isRightButtonActive ? "disabled-mobile-button" : ""}`}>
                <div className="material-symbols-outlined mobile-button-icon mobile-right-button-icon">
                    arrow_forward_ios
                </div>
            </button>
        </div>
    );
};

export default SwitchButtons;
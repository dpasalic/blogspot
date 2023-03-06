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
        }, 300)
    };

    if (viewportWidth > 960) {
        return <ButtonsForDesktop
            onSwitchButtonClick={onSwitchButtonClick}
            activeSwitchButton={activeSwitchButton}
            isLeftButtonActive={isLeftButtonActive}
            isRightButtonActive={isRightButtonActive} />;
    } else {
        return <ButtonsForMobile />;
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
                        ${activeSwitchButton === "left" ? "animation-active" : ""}
                        desktop-button-animation desktop-left-button-animation`}></div>
                    <div className="indicator-gradient left-gradient"></div>
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
                        ${activeSwitchButton === "right" ? "animation-active" : ""}
                        desktop-button-animation desktop-right-button-animation`}></div>
                    <div className="indicator-gradient right-gradient"></div>
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

const ButtonsForMobile = () => {
    return (
        <div>ButtonsForMobile</div>
    );
};

export default SwitchButtons;
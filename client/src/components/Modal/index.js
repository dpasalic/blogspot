import { useState, useEffect } from "react";
import FocusTrap from "focus-trap-react";
import "./Modal.scss";

const Modal = ({ children, modalOpen, onClose }) => {
    const [modalClassName, setModalClassName] = useState("hide-modal");
    const [trapActive, setTrapActive] = useState(false);

    useEffect(() => {
        if (modalOpen) {
            setModalClassName("show-modal");
            setTrapActive(true);
        } else if (!modalOpen && trapActive) {
            onModalClose();
        }
    }, [modalOpen]);

    const onModalClose = () => {
        setModalClassName("visually-hide-modal");
        setTrapActive(false);
        onClose();
    };

    return (
        <FocusTrap active={trapActive}>
            <div
                onClick={onModalClose}
                onAnimationEnd={e =>
                    e.animationName === "visually-hide-modal" ? setModalClassName("hide-modal") : null}
                className={`modal-wrapper ${modalClassName}`}>
                <div
                    onClick={e => e.stopPropagation()}
                    className="modal-body">
                    {children}
                </div>
            </div>
        </FocusTrap>
    );
};

export default Modal;
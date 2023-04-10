import { useState, useEffect } from "react";

// Hook that keeps track of clicks outside of element passed as ref
// Used for dropdown menu

function useOutsideClickAlert(ref) {
    const [outsideClickBool, setOutsideClickBool] = useState(false);

    useEffect(() => {
        const handleClickOutside = event => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOutsideClickBool(true);
            } else {
                setOutsideClickBool(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return outsideClickBool;
}

export default useOutsideClickAlert;
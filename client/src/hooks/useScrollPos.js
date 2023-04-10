import { useState, useEffect } from "react";

// Hook that keeps track of glass wrapper scroll position
// Used for navigation

const useScrollPos = scrollStep => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    const onGlassWrapperScroll = event => {
        const scrollPos = event.target.scrollTop;

        if (Math.abs(scrollPos - prevScrollPos) > scrollStep) {
            setPrevScrollPos(scrollPos);
        }
    };

    useEffect(() => {
        const glassWrapper = document.querySelector(".glass-wrapper");

        glassWrapper.addEventListener("scroll", onGlassWrapperScroll, { passive: true });

        return () => {
            glassWrapper.removeEventListener("scroll", onGlassWrapperScroll);
        };
    }, [prevScrollPos]);

    return prevScrollPos;
};

export default useScrollPos;
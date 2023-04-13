import { useState, useEffect } from "react";

const getViewportDims = () => {
    const { innerWidth: width, innerHeight: height } = window;

    return {
        width,
        height
    };
};

// Hook that keeps track of viewport dimensions

const useViewportDimensions = () => {
    const [viewportDims, setViewportDims] = useState(getViewportDims());

    const onWindowResize = () => setViewportDims(getViewportDims());

    useEffect(() => {
        // Bind the event listener
        window.addEventListener("resize", onWindowResize);

        return () => {
            // Unbind the event listener on clean up
            window.removeEventListener("resize", onWindowResize);
        };
    }, []);

    return viewportDims;
};

export default useViewportDimensions;
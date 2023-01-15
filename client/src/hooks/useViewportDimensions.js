import { useState, useEffect } from "react";

const getViewportDims = () => {
    const { innerWidth: width, innerHeight: height } = window;

    return {
        width,
        height
    };
};

const useViewportDimensions = () => {
    const [viewportDims, setViewportDims] = useState(getViewportDims());

    const onWindowResize = () => setViewportDims(getViewportDims());

    useEffect(() => {
        window.addEventListener("resize", onWindowResize);

        return () => {
            window.removeEventListener("resize", onWindowResize);
        };
    }, []);

    return viewportDims;
};

export default useViewportDimensions;
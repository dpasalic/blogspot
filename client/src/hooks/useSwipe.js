import { useState } from "react";

// Hook that detects swipes left and right
// Used with mobile screens for switching blogs in readlist

const useSwipe = (onSwitchLeft, onSwitchRight) => {
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // Required distance between touchStart and touchEnd to be detected as a swipe
    const SWIPE_STEP = 100;

    const onTouchStart = e => {
        setTouchEnd(null); // Otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX);
    }

    const onTouchMove = e => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isRightSwipe = distance > SWIPE_STEP;
        const isLeftSwipe = distance < -SWIPE_STEP;
        if (isLeftSwipe) {
            onSwitchLeft();
        } else if (isRightSwipe) {
            onSwitchRight();
        }
    }

    return { onTouchStart, onTouchMove, onTouchEnd };
};

export default useSwipe;
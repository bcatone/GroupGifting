import { useState } from "react";

const useVisibilityToggle = (defaultVisibility = false) => {
    const [isVisible, setIsVisible] = useState(defaultVisibility);

    const toggleVisibility = () => {
        setIsVisible(prev => !prev);
    };

    return {
        isVisible,
        toggleVisibility
    };
};

export default useVisibilityToggle;
import { useState } from "react";

const useToggle = (defaultIsSelected = false) => {
    const [isSelected, setIsSelected] = useState(defaultIsSelected);

    const toggleIsSelected = () => {
        setIsSelected(prev => !prev);
    };

    return {
        isSelected,
        setIsSelected,
        toggleIsSelected
    };
};

export default useToggle;
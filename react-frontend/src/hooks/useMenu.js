import { useState } from "react";

const useMenu = () => {
    const [menuAnchorEl, setMenuAnchorEl] = useState();

    const handleMenuOpen = (e) => {
        setMenuAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    return {
        menuAnchorEl,
        setMenuAnchorEl,
        handleMenuOpen,
        handleMenuClose
    };
};

export default useMenu;
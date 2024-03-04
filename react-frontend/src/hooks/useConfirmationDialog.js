import { useState } from "react";

const useConfirmationDialog = (onConfirm) => {
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

    const handleConfirmatonDialogClick = () => {
        setIsConfirmationDialogOpen(true);
    };

    const handleConfirmatonDialogCancel = () => {
        setIsConfirmationDialogOpen(false);
    };
    
    const handleConfirmatonDialogConfirm = () => {
        console.log("Bye-bye!")
        console.log(onConfirm)
        onConfirm();
        setIsConfirmationDialogOpen(false);
    };

    return {
        isConfirmationDialogOpen,
        handleConfirmatonDialogClick,
        handleConfirmatonDialogCancel,
        handleConfirmatonDialogConfirm
    };
};

export default useConfirmationDialog;
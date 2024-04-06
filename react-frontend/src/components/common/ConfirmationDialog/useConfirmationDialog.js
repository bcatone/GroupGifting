import { useState } from "react";


// Import in the component that is using the ConversationDialog
const useConfirmationDialog = () => {
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

    const handleConfirmatonDialogClick = () => {
        setIsConfirmationDialogOpen(true);
    };

    const handleConfirmatonDialogCancel = () => {
        setIsConfirmationDialogOpen(false);
    };

    const handleConfirmatonDialogConfirm = (onConfirm) => {
        onConfirm();
        setIsConfirmationDialogOpen(false);
    }

    return {
        isConfirmationDialogOpen,
        handleConfirmatonDialogClick,
        handleConfirmatonDialogCancel,
        handleConfirmatonDialogConfirm
    };
};

export default useConfirmationDialog;
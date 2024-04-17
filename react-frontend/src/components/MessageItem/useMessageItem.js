import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useToggle from "../../hooks/useToggle";
import useMenu from "../../hooks/useMenu";
import useConfirmationDialog from "../common/ConfirmationDialog/useConfirmationDialog";
import { clearMessageId, setMessageId, updateDirectMessageIsViewedInApi } from "../../redux/slices/directMessageSlice";

const useMessageItem = (id, isViewed, onDelete, onEdit) => {
    const dispatch = useDispatch();
    const { isSelected: isHovered, setIsSelected: setIsHovered } = useToggle();
    const [isEditMode, setIsEditMode] = useState(false);
    const targetRef = useRef(null);

    const {
    menuAnchorEl: messageMenuAnchorEl,
    setMenuAnchorEl: setMessageMenuAnchorEl,
    handleMenuOpen,
    handleMenuClose,
    } = useMenu();    
    
    const {
        isConfirmationDialogOpen: isDeleteMessageDialogOpen,
        handleConfirmatonDialogClick: handleDeleteMessageDialogClick,
        handleConfirmatonDialogCancel: handleDeleteMessageDialogCancel,
        handleConfirmatonDialogConfirm: handleDeleteMessageDialogConfirm,
    } = useConfirmationDialog(() => handleMessageDelete());

    const handleEnterMessageEditMode = () => {
    dispatch(setMessageId(id));
    setIsEditMode(true);
    };

    const handleExitMessageEditMode = () => {
    dispatch(clearMessageId());
    handleMenuClose();
    handleCancelEditMessageDialogCancel();
    setIsEditMode(false);
    };

    const handleMessageDelete = () => {
        handleExitMessageEditMode();
        onDelete();
    };

    const handleMessageUpdate = (e, updatedMessage) => {
        handleExitMessageEditMode();
        onEdit(e, updatedMessage);
    };

    const {
        isConfirmationDialogOpen: isCancelEditMessageDialogOpen,
        handleConfirmatonDialogClick: handleCancelEditMessageDialogClick,
        handleConfirmatonDialogCancel: handleCancelEditMessageDialogCancel,
        handleConfirmatonDialogConfirm: handleCancelEditMessageDialogConfirm,
    } = useConfirmationDialog(() => handleExitMessageEditMode());

    useEffect(() => {
        const options = {
          root: null,
          rootMargin: '0px',
          threshold: 0.25
        };
    
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (!isViewed && entry.isIntersecting) {
              // Asynchronously update message status
              dispatch(updateDirectMessageIsViewedInApi(id));
              observer.unobserve(targetRef.current); // Stop observing after update
            }
          });
        }, options);
    
        if (targetRef.current) {
          observer.observe(targetRef.current);
        }
    
        return () => {
          observer.disconnect();
        };
      }, []);

    return {
        targetRef,
        isEditMode,
        setIsEditMode,
        handleEnterMessageEditMode,
        handleExitMessageEditMode,
        messageMenuAnchorEl,
        setMessageMenuAnchorEl,
        isHovered,
        setIsHovered,
        handleMenuOpen,
        handleMenuClose,
        isDeleteMessageDialogOpen,
        handleDeleteMessageDialogClick,
        handleDeleteMessageDialogCancel,
        handleDeleteMessageDialogConfirm,
        isCancelEditMessageDialogOpen,
        handleCancelEditMessageDialogClick,
        handleCancelEditMessageDialogCancel,
        handleCancelEditMessageDialogConfirm,
        handleMessageDelete,
        handleMessageUpdate
    };
};

export default useMessageItem;
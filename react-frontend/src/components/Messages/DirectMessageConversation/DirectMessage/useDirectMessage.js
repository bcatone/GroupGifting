import { useEffect, useRef, useState } from "react";
import useHovering from "../../../../hooks/useHovering";


const useDirectMessage = (messageId, isViewed, onViewed, onSubmit) => {
    const targetRef = useRef(null);
    const { isHovered, handleMouseEnter, handleMouseLeave } = useHovering();
    const [isEditingMessage, setIsEditingMessage] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (!isViewed && entry.isIntersecting) {
              onViewed(messageId);
              observer.unobserve(targetRef.current); // Stop observing after update
            }
          });
        }, { threshold: 0.5 });
    
        if (targetRef.current) {
          observer.observe(targetRef.current);
        }
    
        return () => {
          observer.disconnect();
        };
      });

      const toggleIsEdititingMessage = () => {
        setIsEditingMessage(prev => !prev);
      };

      const handleMessageSubmit = (e, message) => {
        e.preventDefault();

        setIsEditingMessage(false);

        onSubmit(e, message);
      };

      return {
        targetRef,
        isHovered,
        isEditingMessage,
        handleMouseEnter,
        handleMouseLeave,
        toggleIsEdititingMessage,
        handleMessageSubmit
      };
};

export default useDirectMessage;
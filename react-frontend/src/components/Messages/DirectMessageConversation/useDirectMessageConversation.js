import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useControlledForm from "../../../hooks/useControlledForm";
import axios from "axios";
import { createConsumer } from "@rails/actioncable";


const useDirectMessageConversation = (user_id) => {
  const cable = useRef(null);
  const messagesEndRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const { formData, handleInputChange, resetForm } = useControlledForm();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  // Fetch inbox data on initial render
  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/direct_messages?user_id=${user_id}`);
        setMessages(response.data);
      } catch (error) {
        console.error(error.error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, []);

  // Set up WebSocket
  useEffect(() => {
    cable.current = createConsumer("ws://localhost:3000/cable");

    const handleMessageCreated = (data) => {
      setMessages((prevMessages) => {
        if (
          !prevMessages.some(
            (message) => message.id === data.message.id
          )
        ) {
          return [...prevMessages, data.message];
        }
        return prevMessages;
      });
    };

    const handleMessageDestroyed = (data) => {
      setMessages((prevMessages) => {
        return prevMessages.filter(
          (message) => message.id !== data.message_id
        );
      });
    };

    if (user) {
      cable.current.subscriptions.create(
        { channel: "ChatChannel", user_id: user.id },
        {
          connected: () => console.log("connected"),
          disconnected: () => console.log("disconnected"),
          received: (data) => {
            switch (data.type) {
              case "message_created": {
                handleMessageCreated(data);
                break;
              }
              case "message_deleted": {
                handleMessageDestroyed(data);
                break;
              }
              default:
                console.error("Unknown data type.");
            };
          }
        }
      );
    }

    return () => {
      cable.current.disconnect();
    };
  }, [user]);

  // Scroll to the bottom of the page on initial render and when new message is created
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    };
    scrollToBottom();
  }, []);

  const handleDirectMessageSubmit = (e) => {
    e.preventDefault();

    if (!user) return;

    const data = {
      sender_id: user.id,
      receiver_id: user_id,
      content: formData.content,
    };

    if (cable.current.subscriptions.subscriptions.length > 0) {
      cable.current.subscriptions.subscriptions.forEach((subscription) => {
        const message = {
          sender_id: data.sender_id,
          receiver_id: data.receiver_id,
          content: data.content,
        };
        subscription.perform("add_direct_message", message);
      });
    } else {
      console.error("No subscriptions found");
    }

    resetForm();
  };

  const handleDirectMessageViewed = async (viewedMessageId) => {
    try {
      const response = await axios.patch(`/update_is_message_viewed?user_id=${user.id}&message_id=${viewedMessageId}`, {is_viewed: true});
      setMessages((prevMessages) => {
        const updatedMessage = prevMessages.map(
          (message) => {
            if (message.id === viewedMessageId) {
              return {
                ...message,
                is_viewed: response.data.is_viewed || true
              };
            }
            return message;
          }
        );
        return updatedMessage;
      });
    } catch (error) {
      console.error(error)
    }
  };

  const handleDirectMessageDelete = (deletedMessageId) => {
    if (cable.current.subscriptions.subscriptions.length > 0) {
      cable.current.subscriptions.subscriptions.forEach((subscription) => {
        const message = {
            id: deletedMessageId,
        };
        subscription.perform("delete_direct_message", message);
      });
    } else {
      console.error("No subscriptions found");
    }
  };

  return {
    messagesEndRef,
    isLoading,
    messages,
    formData,
    handleInputChange,
    handleDirectMessageSubmit,
    handleDirectMessageViewed,
    handleDirectMessageDelete
  };
};

export default useDirectMessageConversation;
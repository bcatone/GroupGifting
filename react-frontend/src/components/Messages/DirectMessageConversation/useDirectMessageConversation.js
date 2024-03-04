import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useControlledForm from "../../../hooks/useControlledForm";
import axios from "axios";
import { createConsumer } from "@rails/actioncable";

const useDirectMessageConversation = (user_id) => {
  const cable = useRef(null);
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
    console.log("WebSocket connection:", cable.current);

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

    const handleMessageDeleted = (data) => {
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
                handleMessageDeleted(data);
                break;
              }
              default:
                console.error("Unknown data type.");
            }
          },
        }
      );
    }

    return () => {
      cable.current.disconnect();
    };
  }, [user]);

  const handleDirectMessageSubmit = (e) => {
    e.preventDefault();

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

  const handleDirectMessageDelete = (deletedMessageId) => {
    if (cable.current.subscriptions.subscriptions.length > 0) {
      cable.current.subscriptions.subscriptions.forEach((subscription) => {
        const message = {
            id: deletedMessageId
        }
        subscription.perform("delete_direct_message", message);
      });
    } else {
      console.error("No subscriptions found");
    }
  };

  return {
    isLoading,
    messages,
    formData,
    handleInputChange,
    handleDirectMessageSubmit,
    handleDirectMessageDelete
  };
};

export default useDirectMessageConversation;

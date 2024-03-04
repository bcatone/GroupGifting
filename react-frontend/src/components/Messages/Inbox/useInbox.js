import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { createConsumer } from "@rails/actioncable";

const useInbox = () => {
  const navigate = useNavigate();
  const cable = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const [conversations, setConversations] = useState([]);

  // Fetch inbox data on initial render
  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const response = await axios.get("/inbox/direct_messages");
        setConversations(response.data.conversation_data);
      } catch (error) {
        console.error(error.error);
      }
    };
    fetchInbox();
  }, []);

  // Set up WebSocket
  useEffect(() => {
    cable.current = createConsumer("ws://localhost:3000/cable");
    // console.log("WebSocket connection:", cable.current);

    const updateInbox = (data) => {
      if (
        !conversations.some(
          (conversation) => conversation.last_message_id === data.message.id
        )
      ) {
        setConversations((prevConversations) => {
          const updatedConversations = prevConversations.map(
            (conversation) => {
              if (conversation.user_id === data.message.sender.id) {
                return {
                  ...conversation,
                  num_unread: conversation.num_unread + 1,
                  content_preview: data.message.content,
                  last_message_id: data.message.id
                };
              }
              return conversation;
            }
          );
          console.log("Updated conversations:", updatedConversations);
          return updatedConversations;
        });
      }
    };

    if (user) {
      cable.current.subscriptions.create(
        { channel: "ChatChannel", user_id: user.id },
        {
          connected: () => console.log("connected"),
          disconnected: () => console.log("disconnected"),
          received: (data) => {
            switch (data.type) {
              case ("message_created"): {
                updateInbox(data);
                break;
              }
              case ("message_deleted"): {

              }
            }
          }
        }
      );
    }

    return () => {
      cable.current.disconnect();
    };
  }, [user]);



  const handleConversationSelect = (conversation) => {
    const state = {
      user_id: conversation.user_id,
      username: conversation.username,
      avatar: conversation.avatar,
    };

    navigate(`${conversation.user_id}`, { state: state });
  };

  return {
    conversations,
    handleConversationSelect,
  };
};

export default useInbox;

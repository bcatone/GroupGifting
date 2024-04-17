import { useEffect, useRef, useState } from "react";
import { createConsumer } from "@rails/actioncable";
import { useDispatch, useSelector } from "react-redux";
import { addDirectMessageToApi, deleteDirectMessageFromApi, editDirectMessageInApi } from "../redux/slices/directMessageSlice";

const useMessaging = () => {
    const dispatch = useDispatch();
    const cable = useRef(null);
    const user = useSelector((state) => state.auth.user);
    const otherUser = useSelector((state) => state.directMessages.selectedOtherUser);
    const selectedMessageId = useSelector((state) => state.directMessages.selectedMessageId);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    };

    useEffect(() => {
      scrollToBottom();
    }, []);

    // Set up WebSocket communication with Action Cable
    useEffect(() => {
        cable.current = createConsumer("ws://localhost:3000/cable");

        if (user) {
            cable.current.subscriptions.create(
              { channel: "ChatChannel", user_id: user.id },
              {
                // connected: () => console.log("connected"),
                // disconnected: () => console.log("disconnected"),
                received: (data) => {
                  switch (data.type) {
                    case "message_created": {
                      dispatch(addDirectMessageToApi(data));
                      break;
                    }
                    case "message_updated": {
                      dispatch(editDirectMessageInApi(data));
                      break;
                    }
                    case "message_deleted": {
                      dispatch(deleteDirectMessageFromApi(data));
                      break;
                    }
                    default:
                      console.error("Unknown data type.");
                  };
                }
              }
            );
        }      
        
    }, []);

    const handleMessageSubmit = (e, submittedMessage) => {
        e.preventDefault();
         if (cable.current.subscriptions.subscriptions.length > 0) {
            cable.current.subscriptions.subscriptions.forEach((subscription) => {
              const message = {
                sender_id: user.id,
                receiver_id: otherUser,
                content: submittedMessage,
              };
              subscription.perform("add_direct_message", message);
            });
          } else {
            console.error("No subscriptions found");
          }

          scrollToBottom();
    };

    const handleMessageDelete = (deletedMessageId) => {
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

    const handleMessageEdit = (e, updatedMessageContent) => {
      e.preventDefault();

      if (cable.current.subscriptions.subscriptions.length > 0) {
        cable.current.subscriptions.subscriptions.forEach((subscription) => {
          const updatedMessageData = {
            id: selectedMessageId,
            content: updatedMessageContent
          };
          subscription.perform("edit_direct_message", updatedMessageData);
      });
    } else {
      console.error("No subscriptions found");
    }
  };

    return {
      messagesEndRef,
      scrollToBottom,
      handleMessageSubmit,
      handleMessageDelete,
      handleMessageEdit
    };
};

export default useMessaging;
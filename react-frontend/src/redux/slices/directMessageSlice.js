import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  inbox: [],
  selectedOtherUser: {},
  selectedConversation: [],
  loading: false,
  error: null,
};

export const handleReceivedMessage = (data) => {
  return (dispatch, getState) => {
    const { directMessages } = getState();

    switch (data.type) {
      case "message_created": {
        if (directMessages.selectedOtherUser.id === data.message.id) {
          directMessages.selectedConversation.push(data);
        } else {
          directMessages.inbox = directMessages.inbox.map((conversation) => {
            if (conversation.user_id === data.message.sender.id) {
              return {
                ...conversation,
                num_unread: conversation.num_unread + 1 || 1,
                last_message_id: data.message.id,
                last_updated: data.message.created_at,
                content_preview:
                  data.message.content.length > 25
                    ? `${data.message.content.slice(25)}...`
                    : data.message.content
              };
            }
            return conversation;
          });
        }
      };
        break;
      case "message_updated":
        // Handle finding the edited message and updating that message here
        break;
      case "message_deleted":
        if (directMessages.selectedOtherUser.id === data.message.id) {
          // Handle message deletion here
        }
        
        break;
      default:
        console.error("Unknown message type");
    }
  };
};

export const fetchDirectMessageInbox = createAsyncThunk(
  "messages/fetchDirectMessageInbox",
  async () => {
    try {
      const response = await fetch("/inbox/direct_messages");
      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const fetchDirectMessageConversation = createAsyncThunk(
  "messages/fetchDirectMessageConversation",
  async (otherUserId) => {
    try {
      const response = await fetch(`/direct_messages?user_id=${otherUserId}`);
      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const addDirectMessageToApi = createAsyncThunk(
    'directMessages/addDirectMessage',
    async (payload, { getState }) => {
      const { user } = getState().auth;
      const { user_id, submittedMessage } = payload;
  
      if (!user) {
        throw new Error('User not authenticated');
      }
  
      const { subscriptions } = getState().cable.current.subscriptions;
  
      if (subscriptions.length > 0) {
        subscriptions.forEach((subscription) => {
          const message = {
            sender_id: user.id,
            receiver_id: user_id,
            content: submittedMessage,
          };
          subscription.perform("add_direct_message", message);
        });
      } else {
        throw new Error('No subscriptions found');
      }
    }
  );

  export const updateDirectMessageInApi = createAsyncThunk(
    'directMessages/updateDirectMessageInApi',
    async (payload, { getState }) => {
      const { user } = getState().auth;
      const { editedMessage } = payload;

      if (!user) {
        throw new Error('User not authenticated');
      }

      const { subscriptions } = getState().cable.current.subscriptions;

      if (subscriptions.length > 0) {
        subscriptions.forEach((subscription) => {
          const message = {
            id: editedMessage.id,
            content: editedMessage.content,
          };
          subscription.perform("edit_direct_message", message);
        });
      } else {
        throw new Error("No subscriptions found");
      }

    }
  );

export const deleteMessageInApi = createAsyncThunk(
  'messages/deleteMessageInApi',
  async (payload, { getState }) => {
    const { user } = getState().auth;
    const { deletedMessageId } = payload;

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { subscriptions } = getState().cable.current.subscriptions;

    if (subscriptions.length > 0) {
      subscriptions.forEach((subscription) => {
        const message = {
            id: deletedMessageId,
        };
        subscription.perform("delete_direct_message", message);
      });
    } else {
      throw new Error("No subscriptions found");
    }
  }
);

export const updateDirectMessageIsViewedInApi = createAsyncThunk(
  'messages/updateDirectMessageIsViewedInApi',
  async (payload, { getState }) => {
    const { user } = getState().auth;
    const { viewedMessageId } = payload;

    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await axios.patch(`/update_is_message_viewed?user_id=${user.id}&message_id=${viewedMessageId}`, {is_viewed: true});;

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const directMessageSlice = createSlice({
  name: "directMessages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDirectMessageInbox.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDirectMessageInbox.fulfilled, (state, action) => {
        state.loading = false;
        state.inbox = action.payload.conversation_data;
      })
      .addCase(fetchDirectMessageInbox.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDirectMessageConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDirectMessageConversation.fulfilled, (state, action) => {
        state.loading = false;
        const { messages } = action.payload;
        state.selectedConversation = {
          otherUserId: 0,
          messages: messages
        };
      })
      .addCase(fetchDirectMessageConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addDirectMessageToApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDirectMessageToApi.fulfilled, (state, action) => {
        state.loading = false;
        const { message } = action.payload;
        state.selectedConversation.push(message);
      })
      .addCase(addDirectMessageToApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateDirectMessageInApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDirectMessageInApi.fulfilled, )
      .addDefaultCase((state) => {
        // Handle default case if needed
      });
  },
});

export const directMessageReducer = directMessageSlice.reducer;
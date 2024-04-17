import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { MAX_INBOX_CONTENT_LENGTH } from "../../helpers/messageConstants";

const initialState = {
  inbox: [],
  totalNumUnread: 0,
  selectedOtherUser: null,
  selectedConversation: null,
  selectedMessageId: null,
  loading: false,
  error: null,
};

// Fetch inbox content on initial render
export const fetchDirectMessageInbox = createAsyncThunk(
  "messages/fetchDirectMessageInbox",
  async () => {
    try {
      const response = await fetch("/inbox/direct_messages");
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error)
      throw new Error(error);
    }
  }
);

// Fetch conversation on initial render
export const fetchDirectMessageConversation = createAsyncThunk(
    "messages/fetchDirectMessageConversation",
  async (otherUserId, { getState }) => {
    const { directMessages } = getState();
    try {
      const response = await fetch(`/direct_messages?user_id=${otherUserId}`);
      const data = await response.json();
      const formattedData = { otherUser: otherUserId, messages: data};
      return formattedData;
      // return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const updateDirectMessageIsViewedInApi = createAsyncThunk(
  'messages/updateDirectMessageIsViewedInApi',
  async (payload, { getState }) => {
    const { user } = getState().auth;

    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await axios.patch(`/update_is_message_viewed?user_id=${user.id}&message_id=${payload}`, {is_viewed: true});;

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const directMessageSlice = createSlice({
  name: "directMessages",
  initialState,
  reducers: {
    clearSelectedConversation: (state) => {
      state.selectedOtherUser = null;
      state.selectedConversation = null;
    },
    addDirectMessageToApi: (state, action) => {

      let numNewUnread = 0;

      // Add the message to the relevant conversation if selected
      if (
        state.selectedOtherUser &&
        (state.selectedOtherUser === action.payload.message.sender_id ||
          state.selectedOtherUser === action.payload.message.receiver_id) &&
        !state.selectedConversation.some(
          (message) => message.id === action.payload.message.id
        )
      ) {
        state.selectedConversation.push(action.payload.message);
      }

      // Update the inbox
      state.inbox = state.inbox.map((conversation) => {
        if (conversation.user_id === action.payload.message.sender_id) {

          // console.log("Last Redux Update: ", conversation.last_redux_update)
          // console.log("Last Updated: ", action.payload.updated_at)

          if (
            conversation.last_redux_update !== action.payload.message.updated_at
          ) {
            numNewUnread++;
          }

          // Update total unread
          state.totalNumUnread = state.totalNumUnread + numNewUnread;

          // Update the conversation notification
          return {
            ...conversation,
            num_unread: (conversation.num_unread || 0) + numNewUnread,
            last_message_id: action.payload.message.id,
            last_updated: action.payload.message.created_at,
            content_preview: action.payload.message.content.length > MAX_INBOX_CONTENT_LENGTH ? `${action.payload.message.content.slice(MAX_INBOX_CONTENT_LENGTH)}...` : action.payload.message.content,
            last_redux_update: action.payload.message.updated_at || action.payload.message.created_at
          };
        }
        return conversation;
      });

      
    },
    deleteDirectMessageFromApi: (state, action) => {

      // Delete the message from the relevant conversation if applicable
      if (state.selectedConversation) {
        state.selectedConversation = state.selectedConversation.filter((message) => message.id !== action.payload.message_id);
      }

      // Update the inbox
      if (state.inbox.some(
        (conversation) => conversation.last_message_id === action.payload.message_id
      )) {
        state.inbox = state.inbox.map((conversation) => {
          if (conversation.user_id === action.payload.conversation_info.other_user_id) {
            return {
              ...conversation,
              num_unread: action.payload.conversation_info.numUnread,
              content_preview: action.payload.conversation_info.content_preview,
              last_message_id: action.payload.conversation_info.last_message_id
            };
          }
          return conversation;
        })
      }
      state.totalNumUnread = Math.max(state.totalNumUnread - (!action.payload.was_viewed || 1), 0);
    },
    setMessageId: (state, action) => {
      state.selectedMessageId = action.payload
    },
    clearMessageId: (state) => {
      state.selectedMessageId = null;
    },
    editDirectMessageInApi: (state, action) => {

      // Update the message in the selected conversation if open
      if (state.selectedConversation && state.selectedConversation.some((message) => message.id === action.payload.message.id)) {
        state.selectedConversation = state.selectedConversation.map((message) => {
          if (message.id === action.payload.message.id) {
            return {
              ...message,
              content: action.payload.message.content
            };
          }
          return message;
        })
      }

      // Update the inbox if the updated message was last
      if (state.inbox.some((conversation) => conversation.last_message_id === action.payload.message.id)) {
        state.inbox = state.inbox.map((conversation) => {
          if (conversation.last_message_id === action.payload.message.id) {
            return {
              ...conversation,
              content_preview: action.payload.message.content
            };
          }
          return conversation;
        })
      }
    } 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDirectMessageInbox.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDirectMessageInbox.fulfilled, (state, action) => {
        state.loading = false;
        state.inbox = action.payload.conversation_data;
        state.totalNumUnread = action.payload.total_num_unread;
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
        state.selectedOtherUser = action.payload.messages[0].other_user_id;
        state.selectedConversation = action.payload.messages;
      })
      .addCase(fetchDirectMessageConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateDirectMessageIsViewedInApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDirectMessageIsViewedInApi.fulfilled, (state, action) => {
        state.loading = false;

        // Update isViewed property in the selected conversation
        if (state.selectedConversation) {
          state.selectedConversation = state.selectedConversation.map((message) => {
            if (message.id === action.payload.id) {
              return {
                ...message,
                is_viewed: true
              };
            }
            return message;
          })
        }

        // Update inbox notifications
        state.totalNumUnread = state.totalNumUnread - 1;
        state.inbox = state.inbox.map((conversation) => {
          if (conversation.user_id === action.payload.other_user_id) {
            return {
              ...conversation,
              num_unread: conversation.num_unread - 1
            }
          }
          return conversation
        });

      })
      .addCase(updateDirectMessageIsViewedInApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});

export const {
  clearSelectedConversation,
  addDirectMessageToApi,
  deleteDirectMessageFromApi,
  setMessageId,
  clearMessageId,
  editDirectMessageInApi
} = directMessageSlice.actions;

export const directMessageReducer = directMessageSlice.reducer;
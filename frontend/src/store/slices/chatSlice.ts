// frontend/src/store/slices/chatSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { chatAPI } from '../../api/chat.api';

interface ChatState {
  conversations: any[];
  currentConversationId: string | null;
  messages: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [],
  currentConversationId: null,
  messages: [],
  isLoading: false,
  error: null,
};

export const getConversations = createAsyncThunk(
  'chat/getConversations',
  async ({ page = 1, limit = 20 }: { page?: number; limit?: number }) => {
    const response = await chatAPI.getConversations(page, limit);
    return response.data;
  }
);

export const getMessages = createAsyncThunk(
  'chat/getMessages',
  async ({ conversationId, page = 1, limit = 50 }: { conversationId: string; page?: number; limit?: number }) => {
    const response = await chatAPI.getMessages(conversationId, page, limit);
    return response.data;
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ conversationId, content }: { conversationId: string; content: string }) => {
    const response = await chatAPI.sendMessage(conversationId, content);
    return response.data;
  }
);

export const createConversation = createAsyncThunk(
  'chat/createConversation',
  async (data: { type: 'AI' | 'HUMAN'; lawyerId?: string }) => {
    const response = await chatAPI.createConversation(data);
    return response.data;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentConversation: (state, action) => {
      state.currentConversationId = action.payload;
      state.messages = [];
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    resetChat: (state) => {
      state.messages = [];
      state.currentConversationId = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load conversations';
      })
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load messages';
      })
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        // پیام AI در پاسخ است
        if (action.payload?.message) {
          state.messages.push({
            id: Date.now().toString(),
            sender: 'AI',
            content: action.payload.message,
            createdAt: new Date().toISOString(),
          });
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to send message';
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.conversations.unshift(action.payload);
        state.currentConversationId = action.payload.id;
      });
  },
});

export const { setCurrentConversation, addMessage, clearMessages, resetChat } = chatSlice.actions;
export default chatSlice.reducer;
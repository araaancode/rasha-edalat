// frontend/src/api/chat.api.ts
import api from './axios';

export const chatAPI = {
  createConversation: (data: { type: 'AI' | 'HUMAN'; lawyerId?: string }) =>
    api.post('/chat/conversations', data),

  getConversations: (page = 1, limit = 20) =>
    api.get(`/chat/conversations?page=${page}&limit=${limit}`),

  getMessages: (conversationId: string, page = 1, limit = 50) =>
    api.get(`/chat/conversations/${conversationId}/messages?page=${page}&limit=${limit}`),

  sendMessage: (conversationId: string, content: string) =>
    api.post(`/chat/conversations/${conversationId}/messages`, { content }),

  closeConversation: (conversationId: string) =>
    api.put(`/chat/conversations/${conversationId}/close`),
};
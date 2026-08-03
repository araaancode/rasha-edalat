// backend/src/controllers/chat.controller.ts
import { Request, Response } from 'express';
import { conversationRepository } from '../repositories/conversation.repository';
import { aiService } from '../services/ai.service';
import { encrypt } from '../utils/encryption';
import { logger } from '../config/logger';

export class ChatController {
  async createConversation(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const { type, lawyerId } = req.body;

      if (type === 'HUMAN' && !lawyerId) {
        return res.status(400).json({ message: 'Lawyer ID required for human chat' });
      }

      const conversation = await conversationRepository.create({
        userId,
        type,
        lawyerId,
      });

      res.status(201).json(conversation);
    } catch (error) {
      logger.error('Create conversation error:', error);
      res.status(500).json({ message: 'Failed to create conversation' });
    }
  }

  async getConversations(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const conversations = await conversationRepository.findByUserId(userId, page, limit);
      res.json(conversations);
    } catch (error) {
      logger.error('Get conversations error:', error);
      res.status(500).json({ message: 'Failed to get conversations' });
    }
  }

  async getMessages(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;

      const messages = await conversationRepository.getMessages(id, page, limit);
      res.json(messages);
    } catch (error) {
      logger.error('Get messages error:', error);
      res.status(500).json({ message: 'Failed to get messages' });
    }
  }

  async sendMessage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const userId = (req as any).user.id;

      // Get conversation
      const conversation = await conversationRepository.findById(id);
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }

      if (conversation.userId !== userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      // Save user message
      await conversationRepository.addMessage({
        conversationId: id,
        sender: 'USER',
        content: encrypt(content),
      });

      // If AI chat, get AI response
      if (conversation.type === 'AI') {
        const aiResponse = await aiService.sendMessageToAI(id, content);
        return res.json({ message: aiResponse, type: 'AI' });
      }

      // For human chat, just acknowledge
      res.json({ message: 'Message sent', type: 'HUMAN' });
    } catch (error) {
      logger.error('Send message error:', error);
      res.status(500).json({ message: 'Failed to send message' });
    }
  }

  async closeConversation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;

      const conversation = await conversationRepository.findById(id);
      if (!conversation || conversation.userId !== userId) {
        return res.status(404).json({ message: 'Conversation not found' });
      }

      await conversationRepository.update(id, { status: 'CLOSED' });
      res.json({ message: 'Conversation closed' });
    } catch (error) {
      logger.error('Close conversation error:', error);
      res.status(500).json({ message: 'Failed to close conversation' });
    }
  }
}

export const chatController = new ChatController();
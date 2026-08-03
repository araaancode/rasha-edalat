// backend/src/services/ai.service.ts
import { gapgptService } from './gapgpt.service';
import { logger } from '../config/logger';

export class AIService {
  async sendMessageToAI(conversationId: string, userMessage: string): Promise<string> {
    try {
      // استفاده از GapGPT
      return await gapgptService.sendMessage(conversationId, userMessage);
    } catch (error) {
      logger.error('Error in AI service:', error);
      throw new Error('Failed to get AI response');
    }
  }
}

export const aiService = new AIService();
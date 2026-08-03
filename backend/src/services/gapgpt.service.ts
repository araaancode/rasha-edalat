// backend/src/services/gapgpt.service.ts
import OpenAI from "openai";
import { prisma } from '../config/database';
import { encrypt } from '../utils/encryption';
import { logger } from '../config/logger';

export class GapGPTService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: "sk-YNzlB80LMuW0X4dCkrvALzx6BSH4Ydl946E0r03ofA1G2aoz",
      baseURL: "https://api.gapgpt.app/v1"
    });
  }

  private async getSystemPrompt(): Promise<string> {
    try {
      const setting = await prisma.systemSetting.findUnique({
        where: { key: 'AI_SYSTEM_PROMPT' },
      });
      return setting?.value || 'شما یک مشاور حقوقی حرفه‌ای هستید. پاسخ‌های دقیق و مفید با استناد به قوانین ایران ارائه دهید.';
    } catch (error) {
      return 'شما یک مشاور حقوقی حرفه‌ای هستید. پاسخ‌های دقیق و مفید ارائه دهید.';
    }
  }

  async sendMessage(conversationId: string, userMessage: string): Promise<string> {
    try {
      const systemPrompt = await this.getSystemPrompt();

      // استفاده از Responses API
      const response = await this.client.responses.create({
        model: "gapgpt-qwen-3.5",
        input: `${systemPrompt}\n\nسوال کاربر: ${userMessage}\n\nپاسخ:`,
      });

      const aiResponse = response.output_text || 'پاسخی دریافت نشد';

      // ذخیره در دیتابیس
      await prisma.$transaction([
        prisma.message.create({
          data: {
            conversationId,
            sender: 'USER',
            content: encrypt(userMessage),
          },
        }),
        prisma.message.create({
          data: {
            conversationId,
            sender: 'AI',
            content: encrypt(aiResponse),
          },
        }),
        prisma.conversation.update({
          where: { id: conversationId },
          data: { updatedAt: new Date() },
        }),
      ]);

      return aiResponse;
    } catch (error) {
      logger.error('Error in GapGPT service:', error);
      throw new Error('Failed to get AI response from GapGPT');
    }
  }
}

export const gapgptService = new GapGPTService();
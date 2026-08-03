// frontend/src/services/gapgpt.service.ts
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "sk-YNzlB80LMuW0X4dCkrvALzx6BSH4Ydl946E0r03ofA1G2aoz",
  baseURL: "https://api.gapgpt.app/v1",
  dangerouslyAllowBrowser: true // برای استفاده در مرورگر
});

export async function sendMessageToGapGPT(message: string): Promise<string> {
  try {
    const response = await client.responses.create({
      model: "gapgpt-qwen-3.5",
      input: `شما یک مشاور حقوقی حرفه‌ای هستید. سوال: ${message}`,
    });
    return response.output_text || 'پاسخی دریافت نشد';
  } catch (error) {
    console.error('GapGPT error:', error);
    throw new Error('Failed to get AI response');
  }
}
// backend/test-gapgpt.ts
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "sk-YNzlB80LMuW0X4dCkrvALzx6BSH4Ydl946E0r03ofA1G2aoz",
  baseURL: "https://api.gapgpt.app/v1"
});

async function test() {
  try {
    const response = await client.responses.create({
      model: "gapgpt-qwen-3.5",
      input: "قوانین طلاق در ایران چیست؟",
    });
    console.log('پاسخ:', response.output_text);
  } catch (error) {
    console.error('خطا:', error);
  }
}

test();
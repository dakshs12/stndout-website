import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env.local from the project root
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("No GEMINI_API_KEY found in .env.local");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    // The SDK might not have a direct listModels method, but we can try to fetch it via fetch API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    console.log("Available models:");
    data.models.forEach((m: any) => {
      if (m.supportedGenerationMethods.includes("generateContent")) {
        console.log(`- ${m.name.replace('models/', '')} (${m.displayName})`);
      }
    });
  } catch (error) {
    console.error("Error fetching models:", error);
  }
}

listModels();

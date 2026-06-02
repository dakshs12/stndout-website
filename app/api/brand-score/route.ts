import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize Gemini (Make sure to add GEMINI_API_KEY to your .env.local file)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  let body: { url?: string; industry?: string; size?: string; channels?: string[] } = {};

  try {
    body = await req.json();
    const { url, industry, size, channels } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // We use gemini-pro for broad compatibility with the current SDK version
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are an elite, ruthless brand strategist and digital marketing expert at the agency "StndOut".
      A potential client just submitted their details into our "Brand Score Calculator".
      
      Analyze this profile:
      - Website: ${url}
      - Industry: ${industry || 'Unknown'}
      - Company Size: ${size || 'Unknown'}
      - Active Marketing Channels: ${channels && channels.length > 0 ? channels.join(', ') : 'None'}

      Calculate a "Brand Visibility Score" from 0 to 100. 
      Rules for scoring:
      - If they have 0 channels, score must be below 30.
      - If they only rely on "Referrals / WOM", score must be below 45.
      - If they have many channels but are a small team, score around 50-65 (spread too thin).
      - Rarely give a score above 85 unless they are a massive enterprise doing everything right.

      Return ONLY a strict JSON object (no markdown, no backticks, no text outside the JSON).
      Format:
      {
        "score": number,
        "verdict": "A 2-sentence punchy, slightly aggressive but professional verdict on why they got this score. Tell them they need to stand out."
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean the response to ensure it's valid JSON (sometimes AI wraps in ```json)
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanedText);

    return NextResponse.json(parsedData);

  } catch (error) {
    console.error('Brand Score API Error:', error);
    // Fallback deterministic logic so the site NEVER breaks even if the API fails
    const channelsCount = body.channels?.length || 0;
    const fallbackScore = Math.min(25 + (channelsCount * 12), 85);
    return NextResponse.json({ 
      score: fallbackScore, 
      verdict: "Your digital footprint is inconsistent. To truly dominate your market, you need a cohesive strategy that forces your audience to pay attention." 
    });
  }
}
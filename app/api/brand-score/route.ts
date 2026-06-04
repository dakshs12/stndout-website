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
      Scoring Principles:

      WEBSITE
      - If no website exists, maximum score is 35.
      - If website exists, assume baseline credibility.
      - If website appears outdated, generic, slow or poorly branded, reduce score.
      - If website appears modern, professional and strategically structured, increase score.

      MARKETING CHANNELS
      0 channels: Score range 15-30
      1 channel: Score range 25-45
      2-3 channels: Score range 40-65
      4-5 channels: Score range 55-75
      6+ channels: Do not automatically increase score. Check if company size supports the activity.

      COMPANY SIZE
      Solo / Small Team: Too many channels may indicate lack of focus. Reduce score slightly.
      Growing Business: Balanced channel mix should score higher.
      Large Business: Can support multiple channels effectively.

      REFERRALS / WOM
      If this is the only channel: Maximum score 45.
      If combined with other channels: Treat as a positive signal.

      INDUSTRY ADJUSTMENT
      Local service businesses: Can perform well with fewer channels.
      D2C and Ecommerce: Require stronger digital presence.
      B2B: LinkedIn, Website and Content matter more.

      LUXURY / PREMIUM BRANDS
      Do not penalize for fewer channels. Quality matters more than quantity.

      SCORING DISTRIBUTION
      0-40: Growth Opportunity
      41-60: Good Foundation
      61-80: Strong Presence
      81-100: Built to StndOut

      Never give a score above 90.
      Only give scores above 80 when:
      - Website is excellent
      - Multiple channels are active
      - Brand appears mature
      - Marketing ecosystem is well-rounded

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
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function checkModels() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Test the API key by trying to instantiate the model and generating a very simple text
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
    console.log("Model instantiated. Testing generateContent...");
    const result = await model.generateContent("Hello!");
    console.log("Success! Response:", result.response.text());
  } catch (err) {
    console.error("Error testing Gemini API:");
    console.error(err);
  }
}

checkModels();

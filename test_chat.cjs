const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function test() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [{role: 'user', parts: [{text: 'hi'}]}],
      config: {
        tools: [{ googleSearch: {} }, { googleMaps: {} }]
      }
    });
    console.log(response.text);
  } catch(e) {
    console.error(e);
  }
}
test();

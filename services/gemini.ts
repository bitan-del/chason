import { GoogleGenAI, Type } from "@google/genai";

// Robustly get API Key without throwing ReferenceError in browsers
const getApiKey = () => {
  try {
    // Check if 'process' is defined safely before accessing properties
    if (typeof process !== 'undefined' && process && process.env) {
      return process.env.API_KEY || '';
    }
  } catch (e) {
    console.warn("Unable to access process.env:", e);
  }
  return '';
};

const apiKey = getApiKey();
// Initialize AI only if we have a key, or allow it to fail gracefully later
const ai = new GoogleGenAI({ apiKey: apiKey || 'DUMMY_KEY_TO_PREVENT_INIT_CRASH' });

export const generateCreativeConcept = async (query: string): Promise<any> => {
  if (!apiKey || apiKey === 'DUMMY_KEY_TO_PREVENT_INIT_CRASH') {
    console.warn("No API Key provided for Gemini.");
    return {
      concept: "API Key missing. Please configure the environment variable process.env.API_KEY.",
      tagline: "Configuration Required",
      keywords: ["Setup", "Env", "Missing"]
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a high-end, abstract design concept brief for a client asking for: "${query}". 
      Keep the tone sophisticated, architectural, and minimalist. 
      Return JSON with 'concept' (2 sentences), 'tagline' (short, punchy), and 'keywords' (array of 3 strings).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            concept: { type: Type.STRING },
            tagline: { type: Type.STRING },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    throw new Error("No text returned");
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      concept: "Our digital twin is currently contemplating the void. Please try again.",
      tagline: "System Offline",
      keywords: ["Void", "Null", "Silence"]
    };
  }
};
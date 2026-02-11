
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateSmartCopy = async (topic: string, colors: { primary: string; secondary: string }) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest a creative and professional welcome message for a Sávika IA login page focusing on the topic: ${topic}. Also, mention how the primary color ${colors.primary} and secondary ${colors.secondary} can influence user psychology in this context. Keep it short and professional in Spanish.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "No se pudo generar la sugerencia inteligente en este momento.";
  }
};

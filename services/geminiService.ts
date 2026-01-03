
import { GoogleGenAI } from "@google/genai";
import { MenuItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMenuRecommendation = async (userInput: string, menu: MenuItem[]) => {
  const model = 'gemini-3-flash-preview';
  
  // Format menu for the AI, including special markers
  const menuSummary = menu
    .filter(item => item.isAvailable)
    .map(item => {
      const markers = [];
      if (item.isRecommended) markers.push('[推薦]');
      if (item.spicinessLevel === 1) markers.push('[小辣]');
      if (item.spicinessLevel === 2) markers.push('[大辣]');
      if (item.isMarketPrice) markers.push('[時價]');
      
      return `- ${item.name} ($${item.isMarketPrice ? '時價' : item.price}): ${item.description} ${markers.join('')}`;
    })
    .join('\n');

  const prompt = `
    您是「癮食堂」雲南特色私廚的專業點餐助手。
    這是一家提供地道雲南與泰緬風味料理的餐廳。

    顧客詢問： "${userInput}"
    
    當前菜單：
    ${menuSummary}
    
    請根據顧客的需求，從菜單中挑選 1-3 樣最合適的餐點進行推薦。
    回覆規則：
    1. 語氣要專業且親切。
    2. 如果顧客有提到口味偏好（如：不辣、海鮮、小孩適合），請精確篩選。
    3. 推薦時請簡短說明推薦理由。
    4. 請使用繁體中文回覆，長度約 50-100 字。
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "抱歉，我暫時無法思考，但我們的經典椒麻雞與緬式涼拌茶葉是許多客人的最愛，推薦您試試！";
  }
};

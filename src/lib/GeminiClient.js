import axios from 'axios';

const GEMINI_API_URL = process.env.NEXT_PUBLIC_GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export const getQuestions = async (prompt) => {
    if (!GEMINI_API_KEY) {
        throw new Error('Gemini API key is not configured.');
    }

    try {
        console.log(prompt);
        const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        });
        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};

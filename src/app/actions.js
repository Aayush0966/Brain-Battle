'use server'
import {cookies} from 'next/headers';
import {v4 as uuidv4} from 'uuid';
import {getQuestions} from "@/lib/GeminiClient";

export const setUserCookie = async () => {
    const serverCookies = await cookies();

    const existingUserId =  serverCookies.get('userId')?.value;

    if (!existingUserId) {
        const newUserId = uuidv4();

        serverCookies.set('userId', newUserId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });

        return newUserId;
    } else {
        return existingUserId;
    }
};

export const getQuestionPack = async (userPrefs) => {
   const userId = await setUserCookie();
    const prompt = `Generate a quiz based on the following descriptions: "${userPrefs}". The response must strictly follow this JSON format:
{
  "title": "",
  "questions": [
    {
      "question": "",
      "options": ["", "", "", ""],
      "answer": "",
      "explanation": ""
    }
  ]
}
Provide exactly 10 questions. The answer field should contain the correct option text. Do not include any special characters like \\n or \\t. Ensure the response is a valid JSON object.`;
    const questionPack = await getQuestions(prompt);
    return {userId, questionPack};
}

export const getUserId = async () => {
    const userId = await setUserCookie();
    return userId;
}

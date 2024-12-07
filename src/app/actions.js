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

        console.log(`New userId generated and set in cookies: ${newUserId}`);
        return newUserId;
    } else {
        console.log(`Existing userId found in cookies: ${existingUserId}`);
        return existingUserId;
    }
};

export const getQuestionPack = async (userPrefs) => {
   const userId = await setUserCookie();
    const prompt = `Generate a quiz in JSON object format consisting of 10 multiple-choice questions based on the following descriptions: "${userPrefs}". The format should strictly be: {title: "", questions: []}. Each question in the questions array should have 4 options, and the correct answer should be clearly marked. Do not include any special characters like \\n, \\t, or others, and ensure the response is a valid JSON object.`;
    const questionPack = await getQuestions(prompt);
    return {userId, questionPack};
}

export const getUserId = async () => {
    const userId = await setUserCookie();
    return userId;
}
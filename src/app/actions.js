'use server'
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import {generateQuestion} from '../lib/QuestionGen';
export const setUserCookie = async () => {
    const serverCookies = cookies();

    const existingUserId = serverCookies.get('userId')?.value;

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

// export const saveUserPrefs = async (userPrefs) => {
//    // const userId = setUserCookie();
//    const prompt =  `Generate a quiz consisting of 10 multiple-choice questions based on the following descriptions:
//             "${userPrefs}".
//             Each question should have 4 options and the correct answer should be clearly marked or mentioned.`
//    const questionPack = await generateQuestion(prompt);
//    console.log(questionPack);
//
// }
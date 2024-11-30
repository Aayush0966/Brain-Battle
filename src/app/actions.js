
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

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
    } else {
        console.log(`Existing userId found in cookies: ${existingUserId}`);
    }
};
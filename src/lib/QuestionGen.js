import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Use your OpenAI API key
});

export const generateQuestion = async (prompt) => {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: 'You are a helpful assistant who generates quiz questions with answers.'
            },
            {
                role: 'user',
                content: prompt
            }
        ]
    });
    return response.data.choices[0].message.content;
}
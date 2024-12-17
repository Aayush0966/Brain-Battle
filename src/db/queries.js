import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const saveQuiz = async (userId, title, questions) => {
    try {
        if (!Array.isArray(questions) || questions.some(q => q == null || typeof q !== 'object')) {
            throw new TypeError('Each question must be a non-null object');
        }

        const mappedQuestions = questions.map((q) => {
            const optionsString = JSON.stringify({
                options: q.options
            });

            return {
                questionText: q.question,
                options: optionsString,
                correctAnswer: q.answer,
                explanation: q.explanation,
            };
        });

        const quiz = await prisma.customQuiz.create({
            data: {
                title,
                userId: userId,
                questions: {
                    create: mappedQuestions,
                },
            },
        });

        return quiz;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw error;
        }
        throw error;
    }
};


export const getGuidedQuestions = async (userId, preferences) => {
    try {

        const questions = await prisma.guidedQuestion.findMany({
            where: {
                difficulty: preferences.difficulty.toUpperCase(),  
                category: preferences.category.toUpperCase(),     
            },
            include: {
                quiz: true,  
            },
        });

        return questions;
    } catch (error) {
        console.error('An error occurred during quiz data fetch process:', error);
        throw error; 
    }
};

export const getCustomQuestions = async (quizId ) => {
    
    try {
        const questions = await prisma.customQuestion.findMany({
            where : {quizId}
        });
        return questions;
    } catch (error) {
        console.error('An error occurred during quiz data fetch process:', error);
        throw error; 
    }
}

import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const saveQuiz = async (userId, quizName, questions) => {
    try {
        if (!Array.isArray(questions) || questions.some(q => q == null || typeof q !== 'object')) {
            throw new TypeError('Each question must be a non-null object');
        }

        // Create the quiz
        const quiz = await prisma.quiz.create({
            data: {
                title: quizName,
                userId: userId,
                questions: {
                    create: questions.map((q, index) => {
                        return {
                            questionText: q.question,
                            options: q.options,
                            correctAnswer: q.answer,
                            explanation: "hint",
                        };
                    }),
                },
            },
        });

        return quiz;
    } catch (error) {
        console.error('An error occurred during quiz save process:');

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(`Prisma error Code: ${error.code}`);
            console.error(`Prisma error message: ${error.message}`);
            console.error('Full error details:', error);
        } else {
            console.error('Error saving quiz:', error);
        }

        throw error;
    }
};

export const getGuidedQuestions = async (userId, preferences) => {
    try {

        const questions = await prisma.guidedQuestion.findMany({
            where: {
                difficulty: preferences.difficulty.toUpperCase(),  // Filter by difficulty
                category: preferences.category.toUpperCase(),      // Filter by category
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

import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const saveQuiz = async (userId, quizName, questions) => {
    try {
        console.log(`Attempting to save quiz: ${quizName} for userId: ${userId}`);
        // Validate questions array
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
                        console.log(`Processing question ${index + 1}:`, q);
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

        // Log the result after the quiz is created
        console.log('Quiz saved successfully:', quiz);
        return quiz;
    } catch (error) {
        console.error('An error occurred during quiz save process:');

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(`Prisma error Code: ${error.code}`);
            console.error(`Prisma error message: ${error.message}`);
            // Log the full error for debugging
            console.error('Full error details:', error);
        } else {
            // This handles other types of errors
            console.error('Error saving quiz:', error);
        }

        throw error; // Rethrow the error to propagate it
    }
};

export const getGuidedQuestions = async (userId, preferences) => {
    try {
        console.log(prisma);

        console.log(`Fetching quiz data for userId: ${userId}, preferences:`, preferences);

        const questions = await prisma.guidedQuestion.findMany({
            where: {
                difficulty: preferences.difficulty.toUpperCase(),  // Filter by difficulty
                category: preferences.category.toUpperCase(),      // Filter by category
            },
            include: {
                quiz: true,  // Include related quiz if needed
            },
        });

        console.log('Quiz data fetched successfully:', questions);
        return questions;
    } catch (error) {
        console.error('An error occurred during quiz data fetch process:', error);
        throw error; // Rethrow the error to propagate it
    }
};

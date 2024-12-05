import { Prisma, PrismaClient  } from '@prisma/client';
const prisma = new PrismaClient();

export const saveQuiz = async (userId, quizName, questions) => {
    try {
        // Create the quiz
        const quiz = await prisma.quiz.create({
            data: {
                title: quizName,
                userId: userId,
                questions: {
                    create: questions.map((q) => ({
                        questionText: q.question,
                        options: q.options,
                        correctAnswer: q.correctAnswer,
                        explanation: q.explanation,
                    })),
                },
            },
        });

        console.log('Quiz saved successfully:', quiz);
        return quiz;
    } catch (error) {
        console.error('Error saving quiz:', error);
        throw error;
    }
};
